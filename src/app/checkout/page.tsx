"use client";

import { HeaderGlobal } from "@/src/components/layout/HeaderGlobal";
import { CheckoutAddressForm } from "./steps/CheckoutAddressForm";
import { CheckoutPayment } from "./steps/CheckoutPayment";
import { CheckoutSelectedCoffees } from "./steps/CheckoutSelectedCoffees";
import { ArrowLeft } from "lucide-react";
import { LoadingDots } from "@/src/components/ui/LoadingDots";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  function handleBackHome() {
    setIsLoading(true);

    setTimeout(() => {
      router.push("/");
    }, 300);
  }

    if (isLoading) {
    return <LoadingDots fullScreen />;
    }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-10 lg:px-20">
        <HeaderGlobal />

           <button
          onClick={handleBackHome}
          className="
            flex items-center gap-2
            text-yellow-700 border border-yellow-600 
            px-4 py-2 rounded-lg 
            hover:bg-yellow-600 hover:text-white
            transition duration-300 cursor-pointer
          "
        >
          <ArrowLeft size={20} />
          Voltar para Home
        </button>
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">

          <div>
            <CheckoutAddressForm />
            <CheckoutPayment />
          </div>

          <CheckoutSelectedCoffees />
        </main>
      </div>
    </div>
  );
}
