"use client";

import Image from "next/image";
import Imagem from "@/public/svg/Imagem.svg";
import { ShoppingCart, Package, Timer, Coffee } from "lucide-react";
import { useProfileStore } from "@/src/store/useProfileStore";

export function HeroSection() {
  const { username } = useProfileStore();

  const firstName = username ? username.split(" ")[0] : "";
  return (
    <div className="text-black flex flex-col-reverse lg:flex-row items-center justify-between mt-20 gap-10 mb-24 ">
      
      <div className="max-w-xl text-center md:text-left">
        {username && (
          <h2 className="text-violet-500 text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-snug sm:leading-tight">
            Olá, {firstName}!
          </h2>
        )}

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-snug sm:leading-tight">
          Encontre o café perfeito <br /> para qualquer hora do dia
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10">
          Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
          hora.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-sm">
          <div className="flex items-center gap-3">
            <div className="bg-[#C47F17] text-white p-2 rounded-full">
              <ShoppingCart size={18} />
            </div>
            <span>Compra simples e segura</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#574F4D] text-white p-2 rounded-full">
              <Package size={18} />
            </div>
            <span>Embalagem mantém o café intacto</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#DBAC2C] text-white p-2 rounded-full">
              <Timer size={18} />
            </div>
            <span>Entrega rápida e rastreada</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#4B2995] text-white p-2 rounded-full">
              <Coffee size={18} />
            </div>
            <span>O café chega fresquinho até você</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md md:max-w-none flex justify-center lg:justify-end mb-8 md:mb-0">
        <Image
          priority
          src={Imagem}
          height={360}
          width={476}
          alt="Copo de café"
          className="w-64 sm:w-80 md:w-auto h-auto"
        />
      </div>
    </div>
  );
}
