import { Hero } from "@/components/site/hero";
import { Work } from "@/components/site/work";
import { Experience } from "@/components/site/experience";
import { Toolkit } from "@/components/site/toolkit";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <Experience />
      <Toolkit />
      <Contact />
      <Footer />
    </>
  );
}
