import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CURSORS } from "./cursors";

gsap.registerPlugin(ScrollToPlugin);

/**
 * The build-up engine.
 *
 * Content is already in the DOM (server-rendered, so it is indexable and works
 * without JS). While html has the `build` class every [data-b] element is
 * hidden by CSS. This module:
 *   1. reads every [data-b] piece and where it sits on the page,
 *   2. runs ONE continuous camera scroll from the top of the page to the
 *      bottom (no stops),
 *   3. schedules the pieces onto the ten cursors with a greedy list scheduler.
 *      A piece is released when the camera is approaching it, must start
 *      before the camera passes it, and waits for its parent ("a card exists
 *      before its tags") and for its section's outline,
 *   4. plays it all as one GSAP master timeline.
 *
 * Everything is in document coordinates: cursors live in a layer spanning the
 * whole page, and only the camera (window scroll) moves.
 */

type Fx =
  | "rise"
  | "pop"
  | "words"
  | "draw"
  | "frame"
  | "drop"
  | "items"
  | "line"
  | "vline";

type Pt = { x: number; y: number };
type Rect = { left: number; top: number; width: number; height: number };

type Piece = {
  el: Element;
  idx: number;
  cursor: string;
  fx: Fx;
  rect: Rect;
  targets: Element[];
  parent: Piece | null;
  section: Element | null;
  isFrame: boolean;
  skip: boolean;
};

type Job = {
  p: Piece;
  /** The cursor that builds it: the tagged one when free, else whoever is */
  cursor: string;
  start: number;
  move: number;
  reveal: number;
  from: Pt;
  a: Pt;
};

export type BuildHandle = {
  play: () => void;
  skip: () => void;
  kill: () => void;
  /** Dev aid: pause and jump to a time, in seconds */
  seek: (t: number) => void;
  duration: () => number;
};

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function docRect(el: Element): Rect {
  const r = el.getBoundingClientRect();
  return {
    left: r.left + window.scrollX,
    top: r.top + window.scrollY,
    width: r.width,
    height: r.height,
  };
}

/** Wrap every word of every text node in a span, so words can be revealed one by one */
function splitWords(el: Element): Element[] {
  const existing = el.querySelectorAll("[data-w]");
  if (existing.length) return Array.from(existing);

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);

  const out: Element[] = [];
  for (const node of nodes) {
    const text = node.nodeValue ?? "";
    if (!text.trim()) continue;
    const frag = document.createDocumentFragment();
    for (const part of text.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
      } else {
        const s = document.createElement("span");
        s.setAttribute("data-w", "");
        s.textContent = part;
        frag.appendChild(s);
        out.push(s);
      }
    }
    node.parentNode?.replaceChild(frag, node);
  }
  return out;
}

function targetsFor(el: Element, fx: Fx): Element[] {
  switch (fx) {
    case "words":
      return splitWords(el);
    case "items": {
      const marked = el.querySelectorAll("[data-item]");
      return marked.length ? Array.from(marked) : Array.from(el.children);
    }
    case "draw":
      return el.tagName.toLowerCase() === "path"
        ? [el]
        : Array.from(el.querySelectorAll("path"));
    default:
      return [el];
  }
}

export function createBuild(layer: HTMLElement): BuildHandle {
  const root = document.documentElement;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const docH = Math.max(root.scrollHeight, document.body.scrollHeight);
  layer.style.height = `${docH}px`;
  const maxScroll = Math.max(0, docH - vh);

  const cursorEl = new Map<string, HTMLElement>();
  const selEl = new Map<string, HTMLElement>();
  for (const c of CURSORS) {
    const cur = layer.querySelector<HTMLElement>(`[data-cursor="${c.id}"]`);
    const sel = layer.querySelector<HTMLElement>(`[data-sel="${c.id}"]`);
    if (cur) cursorEl.set(c.id, cur);
    if (sel) selEl.set(c.id, sel);
  }

  /* ---------------------------------------------------------------- 1. read */
  const els = Array.from(document.querySelectorAll("[data-b]"));
  const pieces: Piece[] = [];
  const byEl = new Map<Element, Piece>();
  const frameOf = new Map<Element, Piece>();

  els.forEach((el, idx) => {
    const cursor = el.getAttribute("data-b") ?? "";
    if (!cursorEl.has(cursor)) return;
    const fx = (el.getAttribute("data-fx") ?? "rise") as Fx;
    const targets = targetsFor(el, fx);
    const rect = docRect(el);
    const piece: Piece = {
      el,
      idx,
      cursor,
      fx,
      rect,
      targets,
      parent: null,
      section: el.closest("[data-section]"),
      isFrame: el.classList.contains("frame-outline"),
      skip: rect.width === 0 || rect.height === 0 || targets.length === 0,
    };
    pieces.push(piece);
    byEl.set(el, piece);
    if (piece.isFrame && piece.section) frameOf.set(piece.section, piece);
  });
  for (const p of pieces) {
    const up = p.el.parentElement?.closest("[data-b]");
    p.parent = (up && byEl.get(up)) || null;
  }
  const live = pieces.filter((p) => !p.skip);

  /* ------------------------------------------------------------- 2. camera */
  // One scroll, top to bottom, gently eased (sine) at both ends. camEase maps time
  // progress to scroll progress; `inv` maps back, so a piece's position on the
  // page can be turned into the moment the camera reaches it.
  const camEase = gsap.parseEase("sine.inOut");
  const inv = (p: number) => {
    let lo = 0;
    let hi = 1;
    for (let k = 0; k < 28; k++) {
      const mid = (lo + hi) / 2;
      if (camEase(mid) < p) lo = mid;
      else hi = mid;
    }
    return hi;
  };
  const camAt = (t: number, D: number) => maxScroll * camEase(clamp(t / D, 0, 1));

  /* ---------------------------------------------------------------- helpers */
  const center = (el: Element): Pt => {
    const r = docRect(el);
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  const anchor = (p: Piece): Pt => {
    const r = p.rect;
    switch (p.fx) {
      case "words": {
        const w = docRect(p.targets[0]);
        return { x: w.left, y: w.top + w.height / 2 };
      }
      case "items":
        return center(p.targets[0]);
      case "frame":
        return { x: r.left + 2, y: r.top + 2 };
      case "line":
        return { x: r.left, y: r.top + r.height / 2 };
      case "vline":
        return { x: r.left, y: r.top };
      default:
        return {
          x: r.left + Math.min(r.width * 0.5, 70),
          y: r.top + Math.min(r.height * 0.5, 40),
        };
    }
  };

  const endPoint = (p: Piece, a: Pt, camY: number): Pt => {
    const r = p.rect;
    const maxY = camY + vh - 36;
    switch (p.fx) {
      case "words": {
        const w = docRect(p.targets[p.targets.length - 1]);
        return { x: w.left + w.width + 4, y: w.top + w.height / 2 };
      }
      case "items":
        return center(p.targets[p.targets.length - 1]);
      case "frame":
        return { x: r.left + r.width - 8, y: Math.min(r.top + r.height - 8, maxY) };
      case "draw":
        return { x: r.left + r.width, y: r.top + r.height };
      case "line":
        return { x: r.left + r.width, y: a.y };
      case "vline":
        return { x: r.left, y: Math.min(r.top + r.height, maxY) };
      default:
        return a;
    }
  };

  const revealDur = (p: Piece) => {
    switch (p.fx) {
      case "words":
        return clamp(p.targets.length * 0.026, 0.25, 0.85);
      case "items":
        return clamp(p.targets.length * 0.06, 0.22, 0.55);
      case "draw":
        return 0.5;
      case "frame":
        return 0.5;
      case "vline":
        return 0.6;
      default:
        return 0.3;
    }
  };

  /* ------------------------------------------------------------ 3. schedule */
  const spawn: Record<string, Pt> = {};
  CURSORS.forEach((c, k) => {
    spawn[c.id] = { x: vw * (0.1 + 0.8 * ((k * 0.37) % 1)), y: -30 };
  });

  /**
   * Lay every piece onto the cursors for a camera that takes D seconds.
   * Returns the jobs and how late the latest piece starts versus the moment
   * the camera would scroll past it.
   */
  const schedule = (D: number) => {
    const cpos: Record<string, Pt> = {};
    const free: Record<string, number> = {};
    CURSORS.forEach((c, k) => {
      cpos[c.id] = { ...spawn[c.id] };
      free[c.id] = 0.2 + k * 0.05;
    });

    const release = (p: Piece) =>
      maxScroll === 0 ? 0 : inv(clamp((p.rect.top - vh * 0.85) / maxScroll, 0, 1)) * D;
    const deadline = (p: Piece) =>
      Math.max(
        5,
        maxScroll === 0 ? 0 : inv(clamp((p.rect.top + Math.min(p.rect.height, vh * 0.5) - 140) / maxScroll, 0, 1)) * D,
      );

    const endOf = new Map<Piece, number>();
    const pending = [...live];
    const jobs: Job[] = [];
    let late = 0;

    while (pending.length) {
      // Best (piece, cursor) pair: earliest start, preferring the tagged
      // cursor and a short trip. Any idle cursor can take any piece, so the
      // load spreads across all ten.
      let best = -1;
      let bestCursor = "";
      let bestStart = Infinity;
      let bestScore = Infinity;
      for (let k = 0; k < pending.length; k++) {
        const p = pending[k];
        const frame = !p.isFrame && p.section ? frameOf.get(p.section) : undefined;
        if (p.parent && !p.parent.skip && !endOf.has(p.parent)) continue;
        if (frame && !endOf.has(frame)) continue;
        const dep = Math.max(
          p.parent ? (endOf.get(p.parent) ?? 0) : 0,
          frame ? (endOf.get(frame) ?? 0) : 0,
        );
        const rel = release(p);
        const a = anchor(p);
        for (const c of CURSORS) {
          const start = Math.max(free[c.id], dep, rel);
          const trip = Math.hypot(a.x - cpos[c.id].x, a.y - cpos[c.id].y);
          const score = start + (c.id === p.cursor ? 0 : 0.18) + trip / 6000;
          if (score < bestScore - 1e-6) {
            best = k;
            bestCursor = c.id;
            bestStart = start;
            bestScore = score;
          }
        }
      }
      if (best < 0) break;
      const [p] = pending.splice(best, 1);

      const from = cpos[bestCursor];
      const a = anchor(p);
      const move = clamp(0.18 + Math.hypot(a.x - from.x, a.y - from.y) / 3000, 0.18, 0.45);
      const reveal = revealDur(p);
      const dur = move + 0.08 + reveal + 0.06;
      jobs.push({ p, cursor: bestCursor, start: bestStart, move, reveal, from, a });
      free[bestCursor] = bestStart + dur;
      endOf.set(p, bestStart + dur);
      cpos[bestCursor] = endPoint(p, a, camAt(bestStart + move, D));
      late = Math.max(late, bestStart - deadline(p));
    }
    return { jobs, late };
  };

  // Pick the shortest camera run in which every piece still gets built before
  // the camera passes it: dense pages scroll slower, light ones faster.
  let D = 18;
  for (let d = 12.5; d <= 18; d += 0.5) {
    if (schedule(d).late <= 0.5) {
      D = d;
      break;
    }
  }
  const { jobs } = schedule(D);

  /* --------------------------------------------------------------- 4. build */
  const master = gsap.timeline({ paused: true });
  const cursorList = CURSORS.map((c) => cursorEl.get(c.id)!).filter(Boolean);
  CURSORS.forEach((c) => {
    gsap.set(cursorEl.get(c.id)!, { x: spawn[c.id].x, y: spawn[c.id].y, autoAlpha: 0 });
    gsap.set(selEl.get(c.id)!, { autoAlpha: 0, width: 0, height: 0 });
  });
  master.to(cursorList, { autoAlpha: 1, duration: 0.3, stagger: 0.04 }, 0);

  // The camera: a single, continuous scroll
  const T0 = 0.3;
  master.to(
    window,
    {
      scrollTo: { y: maxScroll, autoKill: false },
      duration: D,
      ease: "sine.inOut",
    },
    T0,
  );

  const addJob = (job: Job, prevEnd: number) => {
    const { p, start, move, reveal, a } = job;
    const cur = cursorEl.get(job.cursor)!;
    const sel = selEl.get(job.cursor)!;
    const el = p.el;
    const r = p.rect;
    const tClick = T0 + start + move;
    const tR = tClick + 0.08;
    const tEnd = tR + reveal;
    const camY = camAt(start + move, D);

    // Travel. The cursor leaves its last job early and glides over, so it
    // never jumps. x and y use different eases, so the path curves.
    const moveStart = Math.max(T0 + prevEnd, tClick - 1.4);
    const travel = tClick - moveStart;
    master.to(cur, { x: a.x, duration: travel, ease: "power2.inOut" }, moveStart);
    master.to(cur, { y: a.y, duration: travel, ease: "power3.out" }, moveStart);

    // Click, and the selection box around what is about to be built
    master.to(cur, { scale: 0.82, duration: 0.05 }, tClick);
    master.to(cur, { scale: 1, duration: 0.09 }, tClick + 0.05);
    const ring = cur.querySelector(".bc-ring");
    if (ring) {
      master.fromTo(
        ring,
        { scale: 0.3, autoAlpha: 0.9 },
        { scale: 1.5, autoAlpha: 0, duration: 0.4, ease: "power2.out" },
        tClick,
      );
    }
    const pad = 4;
    master.set(
      sel,
      {
        x: r.left - pad,
        y: r.top - pad,
        width: r.width + pad * 2,
        height: r.height + pad * 2,
      },
      tClick,
    );
    master.to(sel, { autoAlpha: 1, duration: 0.08 }, tClick);

    // The reveal itself, with the cursor working alongside it
    switch (p.fx) {
      case "rise":
        master.fromTo(
          el,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: reveal, ease: "power3.out" },
          tR,
        );
        break;
      case "drop":
        master.fromTo(
          el,
          { autoAlpha: 0, y: -26 },
          { autoAlpha: 1, y: 0, duration: reveal, ease: "power3.out" },
          tR,
        );
        break;
      case "pop":
        master.fromTo(
          el,
          { autoAlpha: 0, scale: 0.95, y: 12, transformOrigin: "50% 50%" },
          { autoAlpha: 1, scale: 1, y: 0, duration: reveal, ease: "power3.out" },
          tR,
        );
        break;
      case "words": {
        const words = p.targets;
        const each = reveal / words.length;
        master.set(el, { autoAlpha: 1 }, tR);
        master.fromTo(
          words,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.04, stagger: each, ease: "none" },
          tR,
        );
        // The cursor follows the text, line by line
        const lines: { first: Rect; last: Rect; count: number; from: number }[] = [];
        words.forEach((w, k) => {
          const wr = docRect(w);
          const line = lines[lines.length - 1];
          if (line && Math.abs(line.last.top - wr.top) < wr.height * 0.5) {
            line.last = wr;
            line.count++;
          } else {
            lines.push({ first: wr, last: wr, count: 1, from: k });
          }
        });
        lines.forEach((ln, k) => {
          const y = ln.first.top + ln.first.height / 2;
          const t = tR + ln.from * each;
          if (k > 0) master.set(cur, { x: ln.first.left, y }, t);
          master.to(
            cur,
            { x: ln.last.left + ln.last.width + 4, y, duration: ln.count * each, ease: "none" },
            t,
          );
        });
        break;
      }
      case "items": {
        const items = p.targets;
        const each = reveal / items.length;
        master.set(el, { autoAlpha: 1 }, tR);
        master.fromTo(
          items,
          { autoAlpha: 0, y: 10, scale: 0.92, transformOrigin: "50% 50%" },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, stagger: each, ease: "back.out(1.6)" },
          tR,
        );
        items.forEach((it, k) => {
          const c = center(it);
          master.to(cur, { x: c.x, y: c.y, duration: each, ease: "power1.inOut" }, tR + k * each);
        });
        break;
      }
      case "draw": {
        const paths = p.targets;
        const each = (reveal * 0.5) / paths.length;
        master.set(el, { autoAlpha: 1 }, tR);
        master.fromTo(
          paths,
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: reveal * 0.5, stagger: each, ease: "power1.inOut" },
          tR,
        );
        master.to(
          cur,
          { x: r.left + r.width, y: r.top + r.height, duration: reveal, ease: "none" },
          tR,
        );
        break;
      }
      case "frame": {
        const end = endPoint(p, a, camY);
        master.fromTo(
          el,
          { autoAlpha: 1, clipPath: "inset(0% 100% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: reveal,
            ease: "power2.inOut",
            clearProps: "clipPath",
          },
          tR,
        );
        master.to(cur, { x: end.x, y: end.y, duration: reveal, ease: "power2.inOut" }, tR);
        break;
      }
      case "line":
        master.fromTo(
          el,
          { autoAlpha: 1, scaleX: 0, transformOrigin: "0% 50%" },
          { scaleX: 1, duration: reveal, ease: "power2.out" },
          tR,
        );
        master.to(cur, { x: r.left + r.width, duration: reveal, ease: "power2.out" }, tR);
        break;
      case "vline": {
        const end = endPoint(p, a, camY);
        master.fromTo(
          el,
          { autoAlpha: 1, scaleY: 0, transformOrigin: "50% 0%" },
          { scaleY: 1, duration: reveal, ease: "power1.inOut" },
          tR,
        );
        master.to(cur, { y: end.y, duration: reveal, ease: "power1.inOut" }, tR);
        break;
      }
    }

    master.to(sel, { autoAlpha: 0, duration: 0.15 }, tEnd);
    return start + move + 0.08 + reveal + 0.06;
  };

  // Walk each cursor's jobs in time order so it can start gliding to the next
  // one as soon as it has finished the last
  const prevEnd: Record<string, number> = {};
  CURSORS.forEach((c) => (prevEnd[c.id] = 0));
  [...jobs]
    .sort((x, y) => x.start - y.start)
    .forEach((job) => {
      prevEnd[job.cursor] = addJob(job, prevEnd[job.cursor]);
    });

  /* --------------------------------------------------------------- 5. outro */
  const allTargets: Element[] = [];
  for (const p of pieces) {
    allTargets.push(p.el);
    allTargets.push(...p.targets);
  }
  const frames = pieces.filter((p) => p.isFrame).map((p) => p.el);

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    master.kill();
    window.scrollTo(0, 0);
    root.classList.remove("build");
    gsap.set(allTargets, {
      clearProps:
        "opacity,visibility,transform,transformOrigin,clipPath,strokeDasharray,strokeDashoffset",
    });
    gsap.set([...cursorList, ...Array.from(selEl.values())], { autoAlpha: 0 });
    try {
      sessionStorage.setItem("pf-built", "1");
    } catch {
      /* private mode: replaying on every visit is fine */
    }
  };

  const lastEnd = Math.max(T0 + D, ...Object.values(prevEnd).map((v) => T0 + v));
  const T = lastEnd + 0.3;
  master.to(cursorList, { autoAlpha: 0, scale: 0.6, duration: 0.35, stagger: 0.03 }, T);
  master.to(frames, { autoAlpha: 0, duration: 0.5 }, T);
  master.to(
    window,
    { scrollTo: { y: 0, autoKill: false }, duration: 0.9, ease: "power2.inOut" },
    T + 0.4,
  );
  master.call(finish, undefined, T + 1.4);

  return {
    play: () => {
      master.play(0);
    },
    skip: finish,
    seek: (t: number) => {
      master.pause();
      master.seek(t);
    },
    duration: () => master.duration(),
    kill: () => {
      finished = true;
      master.kill();
    },
  };
}
