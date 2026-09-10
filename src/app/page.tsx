import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Rooms from "@/components/Rooms";
import Special from "@/components/Special";
import Tour from "@/components/Tour";
import Location from "@/components/Location";
import Guide from "@/components/Guide";
import Reservation from "@/components/Reservation";
import Notice from "@/components/Notice";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import EventPopup from "@/components/EventPopup";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Rooms />
        <Special />
        <Tour />
        <Location />
        <Guide />
        <Reservation />
        <Notice />
      </main>
      <Footer />
      <FloatingCTA />
      <EventPopup />
      <PWAInstallPrompt />
    </>
  );
}
