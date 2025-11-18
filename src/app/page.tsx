import Image from "next/image";
import { HeaderGlobal } from "../components/layout/HeaderGlobal";
import { HeroSection } from "../components/HeroSection";
import { CoffeeSection } from "../components/CoffeeSection";


export default function Home() {
  return (
    <div className="bg-white px-20 ">
      <HeaderGlobal />

      <main className="">
        <HeroSection />
        <CoffeeSection />
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer> */}

    </div>
  );
}
