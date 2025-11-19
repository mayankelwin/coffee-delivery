"use client";

import Image from "next/image";
import Motoboy from "../../../../public/svg/motoboy.svg";
import { useLocationStore } from "@/src/store/useLocationStore";
import { useCartStore } from "@/src/store/useCartStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { LoadingDots } from "@/src/components/ui/LoadingDots";


export default function CheckoutSuccess() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { address, resetLocation } = useLocationStore();
  const { cart, paymentMethod, clearCart } = useCartStore();

  const isValid =
    cart.length > 0 &&
    address &&
    address.street &&
    address.number &&
    address.district &&
    address.city &&
    address.uf &&
    paymentMethod;

  useEffect(() => {
    if (!isValid && !isLoading) {
      router.replace("/");
    }
  }, [isValid, isLoading, router]);

  function handleBackHome() {
    setIsLoading(true);

    setTimeout(() => {
      clearCart();
      resetLocation();
      router.push("/");
    }, 300);
  }

  if (isLoading) {
  return <LoadingDots fullScreen />;
  }

  if (!isValid) return null;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 py-4 md:px-10 lg:px-20">
        
        <button
          onClick={handleBackHome}
          className="
            flex items-center gap-2
            text-yellow-700 border border-yellow-600 
            px-4 py-2 rounded-lg 
            hover:bg-yellow-600 hover:text-white
            transition duration-300
          "
        >
          <ArrowLeft size={20} />
          Voltar para Home
        </button>

        <main
          className="
            mt-6 md:mt-16
            grid grid-cols-1 lg:grid-cols-2 
            gap-10 items-center
          "
        >
          <div className="max-w-xl mx-auto lg:mx-0 space-y-6 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-600">
              Uhu! Pedido confirmado
            </h1>

            <p className="text-gray-600 text-lg md:text-xl">
              Agora é só aguardar que o café logo chegará até você
            </p>

            <div
              className="
                border border-yellow-500 
                rounded-tr-[44px] 
                rounded-bl-[44px] 
                p-6 md:p-8 space-y-6
                shadow-sm bg-white
              "
            >
              <p className="text-gray-700 text-base md:text-lg">
                Entrega em{" "}
                <strong className="text-gray-900">
                  {`${address.street}, ${address.number}`}
                </strong>
                <br />
                <span className="text-gray-600">
                  {`${address.district} – ${address.city}, ${address.uf}`}
                </span>
              </p>

              <p className="text-gray-700 text-base md:text-lg">
                Previsão de entrega <br />
                <strong className="text-gray-900">20 min – 30 min</strong>
              </p>

              <p className="text-gray-700 text-base md:text-lg">
                Pagamento na entrega <br />
                <strong className="text-gray-900">
                  {{
                    credit: "Cartão de Crédito",
                    debit: "Cartão de Débito",
                    money: "Dinheiro",
                    pix: "PIX",
                  }[paymentMethod]}
                </strong>
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Image
              src={Motoboy}
              alt="Entregador"
              className="w-64 md:w-80 lg:w-[380px] h-auto object-contain"
              priority
            />
          </div>
        </main>
      </div>
    </div>
  );
}
