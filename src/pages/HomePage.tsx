import { Header } from "../components/Header";
import { HeroIntro } from "../components/HeroIntro";
import { Menu2 } from "../components/Menu2";
import { Footer } from "../components/Footer";

export function HomePage() {
  return (
    <>
      <Header />
      <main className="relative bg-[#050505]">
        <HeroIntro />
        <Menu2 />
      </main>
      <Footer />
    </>
  );
}
