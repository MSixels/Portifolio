import { Background3D } from "@/components/Background3D";
import { Overlay } from "@/components/Overlay";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Experience } from "@/components/sections/Experience";
import { Stack } from "@/components/sections/Stack";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { StartProject } from "@/components/sections/StartProject";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {/* z-0: fixed 3D canvas — z-1: scrim/vignette overlay */}
      <Background3D />
      <Overlay />

      {/* z-2: page content */}
      <div className="relative z-[2]">
        <Nav />
        <main>
          <Hero />
          <About />
          <Projects />
          <Process />
          <Experience />
          <Stack />
          <Testimonials />
          <FAQ />
          <StartProject />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
