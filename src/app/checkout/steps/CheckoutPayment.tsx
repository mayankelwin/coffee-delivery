"use client"

import { CreditCard, Landmark, Wallet } from "lucide-react"
import { useCartStore } from "@/src/store/useCartStore"

export function CheckoutPayment() {
  const paymentMethod = useCartStore((state) => state.paymentMethod)
  const setPaymentMethod = useCartStore((state) => state.setPaymentMethod)

  const payments = [
    { id: "credit", label: "Cartão de Crédito", icon: <CreditCard size={18} /> },
    { id: "debit", label: "Cartão de Débito", icon: <Landmark size={18} /> },
    { id: "money", label: "Dinheiro", icon: <Wallet size={18} /> },
    { id: "pix", label: "PIX", icon: <Wallet size={18} /> },
  ]

  return (
    <div className="bg-[#F3F2F2] p-6 rounded-lg border border-gray-200 mt-6">
      <h2 className="text-lg font-bold text-gray-800 mb-1">Pagamento</h2>
      <p className="text-sm text-gray-600 mb-5">
        O pagamento é feito na entrega. Escolha a forma de pagar.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {payments.map((p) => (
          <button
            key={p.id}
            onClick={() => setPaymentMethod(p.id as any)}
            className={`
              flex items-center justify-center gap-2 py-3 px-4 rounded-lg 
              font-medium text-sm uppercase transition-all cursor-pointer
              border-2 
              ${paymentMethod === p.id 
                ? "bg-purple-100 border-purple-600 text-purple-700 shadow-md"
                : "bg-gray-200 border-gray-300 text-gray-700 hover:bg-gray-300"}
            `}
          >
            {p.icon}
            {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}
