"use client";

import Image from "next/image";
import Logo from "@/public/svg/Logo.svg";
import { useState, useEffect } from "react";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import { getBrazilUf } from "@/src/lib/ApiIBGE";
import { useLocationStore } from "@/src/store/useLocationStore";
import { useCartStore } from "@/src/store/useCartStore";
import { useProfileStore } from "@/src/store/useProfileStore";
import { useRouter } from "next/navigation";

export function HeaderGlobal() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [states, setStates] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const setSelectedCity = useLocationStore((state) => state.setSelectedCity);
  const cartTotal = useCartStore((state) => state.getCartTotal());

  const { username, avatar } = useProfileStore();

  const firstName = username ? username.split(" ")[0] : "";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function loadUF() {
      const uf = await getBrazilUf();
      setStates(uf);
    }
    loadUF();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCheckout = () => {
    setTimeout(() => {
      router.push("/checkout");
    }, 300);
  };

  const handlePerfil = () => {
    setTimeout(() => {
      router.push("/profile");
    }, 300);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md bg-white/60 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="w-full flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 py-3 sm:py-4 md:py-6">
          <Image
            priority
            src={Logo}
            alt="Logo Coffee"
            width={85}
            height={40}
            className="h-auto"
          />

          <div className="flex gap-2 sm:gap-3 items-center">
            <button
              onClick={handleCheckout}
              className="
                relative flex items-center gap-1 sm:gap-2
                bg-[#F1E9C9] hover:bg-[#eedd9c]
                text-[#C47F17]
                px-3 py-2 sm:px-4 sm:py-2
                rounded-md transition
                text-xs sm:text-sm cursor-pointer
              "
            >
              <ShoppingCart size={16} className="sm:hidden" />
              <ShoppingCart size={18} className="hidden sm:block" />

              {mounted && cartTotal > 0 && (
                <span
                  className="
                    absolute -top-2 -right-2
                    bg-[#C47F17] text-white text-xs
                    w-5 h-5 flex items-center justify-center 
                    rounded-full font-bold
                  "
                >
                  {cartTotal}
                </span>
              )}
            </button>

            <button
              onClick={handlePerfil}
              className="
                relative flex items-center gap-2 border
                text-black hover:text-white
                border-[#8f009c] hover:bg-[#b503c5]
                p-2
                rounded-full transition
                cursor-pointer
              "
            >
              {firstName && (
                <span className="hidden sm:inline  font-semibold text-sm">
                  {firstName}
                </span>
              )}

              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <CircleUserRound size={24} className="text-[#C47F17]" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="h-20 sm:h-24 md:h-28" />

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-xs sm:max-w-sm p-5 sm:p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center sm:text-left">
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
                  className="p-2 rounded-md text-black hover:bg-gray-100 text-left"
                >
                  {item.nome} ({item.sigla})
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-black"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
