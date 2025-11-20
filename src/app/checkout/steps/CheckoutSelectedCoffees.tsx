"use client";

import Image from "next/image";
import { useCartStore } from "@/src/store/useCartStore";
import { Minus, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import EmptyCart from "../../../../public/svg/coffees/empty-cart.svg";
import { useEffect, useState } from "react";
import { useLocationStore } from "@/src/store/useLocationStore";
import { toast } from "react-toastify";
import { useOrdersStore } from "@/src/store/useOrdersStore";

export function CheckoutSelectedCoffees() {
  const router = useRouter();

  const { cart, updateQuantity, removeFromCart, paymentMethod } = useCartStore();
  const address = useLocationStore((state) => state.address);
  const addOrder = useOrdersStore((state) => state.addOrder);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 120);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const isEmpty = cart.length === 0;

  const hasAddress =
    !!address &&
    !!address.street &&
    !!address.number &&
    !!address.district &&
    !!address.city &&
    !!address.uf;

  const hasPayment = !!paymentMethod;

  const canConfirm = !isEmpty && hasAddress && hasPayment;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const delivery = 3.5;
  const total = subtotal + delivery;

  function handleButtonClick() {
    if (!canConfirm) return;
    addOrder(cart, total);
    toast.success("Compra realizada com sucesso!", { className: "toast-coffee" });
    setTimeout(() => router.push("/checkout/success"), 800);
  }

  return (
    <div className="bg-[#F3F2F2] p-6 border border-gray-200 rounded-tr-[44px] rounded-bl-[44px]">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Cafés Selecionados
      </h2>

      <div className="max-h-[300px] overflow-y-auto pr-2 scroll-transparent space-y-6">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-10 opacity-70">
            <Image
              src={EmptyCart}
              width={150}
              height={150}
              alt="Carrinho vazio"
              className="mb-4"
            />
            <p className="text-gray-700 text-center font-medium">
              Nenhum café selecionado no momento.
            </p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 pb-6 border-b border-gray-200"
            >
              <Image src={item.image} width={55} height={55} alt={item.name} />

              <div className="flex-1">
                <div className="flex w-full  justify-between">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <span className="font-bold text-gray-800">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </span>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center bg-gray-200 rounded px-2 py-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <Minus
                        size={16}
                        className="text-purple-700 cursor-pointer"
                      />
                    </button>

                    <span className="px-6 font-semibold text-gray-800">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus
                        size={16}
                        className="text-purple-700 cursor-pointer"
                      />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-2 text-sm bg-[#E6E5E5] px-3 py-1 rounded cursor-pointer text-violet-500 font-medium hover:bg-[#cccccc] transition"
                  >
                    <Trash size={20} />
                    Remover
                  </button>
                </div>
              </div>

             
            </div>
          ))
        )}
      </div>

      {!isEmpty && (
        <div className="space-y-4 mt-6">
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Total de itens</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Entrega</span>
              <span>R$ {delivery.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-lg font-bold text-gray-900 mt-2">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleButtonClick}
        disabled={!isEmpty && !canConfirm}
        className={`
          w-full mt-6 text-white font-bold py-3 rounded-md transition rounded-tr-[44px] rounded-bl-[44px]
          ${
            isEmpty
              ? "bg-purple-600 hover:bg-purple-700 cursor-pointer"
              : canConfirm
              ? "bg-[#DBAC2C] hover:bg-yellow-600 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }
        `}
      >
        {isEmpty ? "FAZER COMPRAS" : "CONFIRMAR PEDIDO"}
      </button>
    </div>
  );
}
