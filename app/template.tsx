/**
 * A template remounts on every navigation, so the page fades in on each route
 * change. Opacity only: a transform here would break position: sticky inside.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
