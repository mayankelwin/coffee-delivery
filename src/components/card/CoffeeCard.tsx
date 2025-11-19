"use client";

import Image from "next/image";
import { ShoppingCart, Minus, Plus, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/src/store/useCartStore";

interface CoffeeCardProps {
  id: number;
  name: string;
  description: string[];
  tags: string[];
  price: number;
  image: string;
}

export function CoffeeCard({
  id,
  name,
  description,
  tags,
  price,
  image,
}: CoffeeCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const cartItem = useCartStore((state) =>
    state.cart.find((item) => item.id === id)
  );

  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);

  useEffect(() => {
    if (cartItem) setQuantity(cartItem.quantity);
  }, [cartItem]);

  function handleAdd() {
    const cartItem = useCartStore.getState().cart.find((item) => item.id === id);

    if (cartItem) {
      useCartStore.getState().updateQuantity(id, quantity);
    } else {
      addToCart({
        id,
        name,
        image,
        price,
        quantity,
      });
    }
  }

  function handleRemove() {
    removeFromCart(id);
    setQuantity(1);
  }

  return (
    <div className="
        bg-[#F3F2F2]
        rounded-tl-xl rounded-tr-[36px] rounded-bl-[36px] rounded-br-xl
        p-5 pt-14
        w-[260px]
        flex flex-col items-center text-center shadow justify-between
        relative
        mb-3
      "
    >
      {cartItem && (
        <button
          onClick={handleRemove}
          className="
            absolute -top-3 -right-3
            bg-red-500 hover:bg-red-600
            text-white p-2 rounded-full shadow-lg
            transition cursor-pointer
          "
        >
          <Trash size={18} />
        </button>
      )}

      <div className="absolute -top-10">
        <Image src={image} alt={name} width={130} height={130} />
      </div>

      <div className="flex gap-2 mb-4 mt-10">
        {tags.map((tag) => (
          <span key={tag} className="bg-[#F1E9C9] text-[#C47F17] text-[10px] font-bold px-2 py-1 rounded-full">
            {tag.toUpperCase()}
          </span>
        ))}
      </div>

      <h3 className="text-xl font-bold text-gray-800">{name}</h3>

      <p className="text-sm text-gray-600 mt-2 mb-6 px-3">
        {description}
      </p>

      <div className="w-full flex items-center justify-between mt-auto">
        <p className="text-gray-700 font-bold text-lg">
          R$ <span className="text-2xl">{price.toFixed(2)}</span>
        </p>

        <div className="flex items-center gap-2">
          <div className="bg-[#E6E5E5] px-3 py-2 rounded-lg flex items-center gap-2">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              <Minus size={16} className="text-purple-700 cursor-pointer" />
            </button>
            <span className="font-semibold">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>
              <Plus size={16} className="text-purple-700 cursor-pointer" />
            </button>
          </div>

          {/* ADICIONAR AO CARRINHO */}
          <button
            onClick={handleAdd}
            className="
              bg-[#4B2995]
              hover:bg-[#3d217c]
              text-white p-2 rounded-lg transition cursor-pointer
            "
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
