"use client";

import Image from "next/image";
import { HeaderGlobal } from "../components/layout/HeaderGlobal";
import { HeroSection } from "../components/HeroSection";
import { CoffeeSection } from "../components/CoffeeSection";
import { WelcomeModal } from "../components/modal/WelcomeModal";

export default function Home() {
 
  return (
    <div className="bg-white">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-10 lg:px-20">
        <HeaderGlobal />
        <main className="">
          <HeroSection />
          <CoffeeSection />
        </main>
        
        <WelcomeModal />

        <footer className="mt-20 border-t border-gray-200 py-10">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Desenvolvido por</h3>
              <p className="text-gray-600 mt-1">Mayan Kelwin</p>
              <p className="text-sm text-gray-500 mt-2 max-w-xs">
                Este site é um projeto de portfólio criado apenas para fins demonstrativos.  
                Nenhum produto é vendido de verdade.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Site Seguro</h3>
              <div className="flex items-center gap-3">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
                  alt="SSL Seguro"
                  width={50}
                  height={50}
                />

                <Image
                  src="https://cdn-icons-png.flaticon.com/512/891/891399.png"
                  alt="Protegido"
                  width={50}
                  height={50}
                />

                <Image
                  src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png"
                  alt="Site Verificado"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm mt-10">
            © {new Date().getFullYear()} • Criado por Mayan Kelwin — Todos os direitos reservados.
          </div>
        </footer>
      </div>
    </div>
  );
}