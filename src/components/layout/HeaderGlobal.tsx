"use client";

import Image from "next/image";
import Logo from "@/public/svg/Logo.svg";
import { useState, useEffect } from "react";
import { MapPin, ShoppingCart } from "lucide-react";
import { getBrazilUf } from "@/src/lib/ApiIBGE";

export function HeaderGlobal() {
  const [isOpen, setIsOpen] = useState(false);
  const [states, setStates] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Porto Alegre, RS");

  useEffect(() => {
    async function loadUF() {
      const uf = await getBrazilUf();
      setStates(uf);
    }
    loadUF();
  }, []);

  return (
    <>
      <div className="w-full py-8 flex items-center justify-between">
        <Image
          priority
          src={Logo}
          height={40}
          width={85}
          alt="Logo Coffe"
        />
        <div className="flex gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#EBDDFF] hover:bg-[#e1ceff] text-[#6A1BFF] px-4 py-2 rounded-md transition cursor-pointer"
        >
          <MapPin size={18} className="text-[#6A1BFF]" />
          <span className="text-sm font-medium">{selectedCity}</span>
        </button>

        <button
          className="flex items-center gap-2 bg-[#F1E9C9] hover:bg-[#eedd9c] text-[#C47F17] px-4 py-2 rounded-md transition cursor-pointer"
        >
          <ShoppingCart size={18} className="text-[#6A1BFF]" />
        </button>
          
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-80 p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Em qual estado você mora?
            </h2>

            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
              {states.map((item: any) => (
                <button
                  key={item.sigla}
                  onClick={() => {
                    setSelectedCity(`${item.nome}, ${item.sigla}`);
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-md text-black hover:bg-gray-100 text-left cursor-pointer"
                >
                  {item.nome} ({item.sigla})
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 py-2 rounded-lg text-black bg-gray-200 hover:bg-gray-300 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
