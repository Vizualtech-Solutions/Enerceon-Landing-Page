import Billing from "./Billing";
import Contact from "./Contact";
import Dashboards from "./Dashboards";
import Diagrams from "./Diagrams";
import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import LivePreview from "./LivePreview";
import { LightboxProvider } from "./Lightbox";
import Management from "./Management";
import Reveal from "./Reveal";
import Why from "./Why";

/** The single-page Enerceon website. Sections alternate dark and light. */
export default function Landing() {
  return (
    <LightboxProvider>
      <div className="en-root">
        <a href="#features" className="en-skip">
          Skip to content
        </a>
        <Header />
        <main>
          <Hero />
          <Features />
          <Dashboards />
          <Diagrams />
          <Management />
          <Billing />
          <Why />
          <LivePreview />
          <Contact />
        </main>
        <Footer />
        <Reveal />
      </div>
    </LightboxProvider>
  );
}
