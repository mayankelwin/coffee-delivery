
import Image from "next/image";
import Imagem from "@/public/svg/Imagem.svg";
import { ShoppingCart, Package, Timer, Coffee } from "lucide-react";

export function HeroSection() {
  return (
    <div className="text-black flex items-center justify-between mt-20 gap-10 mb-24">
      <div className="max-w-xl">
        <h2 className="text-5xl font-bold mb-4 leading-tight">
          Encontre o café perfeito <br /> para qualquer hora do dia
        </h2>

        <p className="text-xl text-gray-700 mb-10">
          Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
          hora.
        </p>

        <div className="grid grid-cols-2 gap-5 text-sm">
          {/* 1 */}
          <div className="flex items-center gap-3">
            <div className="bg-[#C47F17] text-white p-2 rounded-full">
              <ShoppingCart size={18} />
            </div>
            <span>Compra simples e segura</span>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-3">
            <div className="bg-[#574F4D] text-white p-2 rounded-full">
              <Package size={18} />
            </div>
            <span>Embalagem mantém o café intacto</span>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-3">
            <div className="bg-[#DBAC2C] text-white p-2 rounded-full">
              <Timer size={18} />
            </div>
            <span>Entrega rápida e rastreada</span>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-3">
            <div className="bg-[#4B2995] text-white p-2 rounded-full">
              <Coffee size={18} />
            </div>
            <span>O café chega fresquinho até você</span>
          </div>

        </div>
      </div>

      <Image
        priority
        src={Imagem}
        height={360}
        width={476}
        alt="Copo de café"
      />
    </div>
  );
}
