"use client";

import Image from "next/image";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useState } from "react";

interface CoffeeCardProps {
  name: string;
  description: string;
  tags: string[];
  price: number;
  image: string;
}

export function CoffeeCard({ name, description, tags, price, image }: CoffeeCardProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div
      className="
        bg-[#F3F2F2]
        rounded-tl-xl rounded-tr-[36px] rounded-bl-[36px] rounded-br-xl
        p-5 pt-14
        w-[260px]
        flex flex-col items-center text-center shadow
        relative
        mb-3
      "
    >

      {/* XÍCARA SOBREPOSTA */}
      <div className="absolute -top-10">
        <Image src={image} alt={name} width={130} height={130} />
      </div>

      {/* TAGS */}
      <div className="flex gap-2 mb-4 mt-6">
        {tags.map((tag) => (
          <span
            key={tag}
            className="
              bg-[#F1E9C9]
              text-[#C47F17]
              text-[10px] font-bold
              px-2 py-1 rounded-full
            "
          >
            {tag.toUpperCase()}
          </span>
        ))}
      </div>

      {/* TÍTULO */}
      <h3 className="text-xl font-bold text-gray-800">{name}</h3>

      {/* DESCRIÇÃO */}
      <p className="text-sm text-gray-600 mt-2 mb-6 px-3">
        {description}
      </p>

      {/* FOOTER */}
      <div className="w-full flex items-center justify-between mt-auto">
        {/* PREÇO */}
        <p className="text-gray-700 font-bold text-lg">
          R$ <span className="text-2xl">{price.toFixed(2)}</span>
        </p>

        <div className="flex items-center gap-2">

          {/* CONTADOR */}
          <div className="bg-[#E6E5E5] px-3 py-2 rounded-lg flex items-center gap-2">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
              <Minus size={16} className="text-purple-700 cursor-pointer" />
            </button>

            <span className="font-semibold">{quantity}</span>

            <button onClick={() => setQuantity(q => q + 1)}>
              <Plus size={16} className="text-purple-700 cursor-pointer" />
            </button>
          </div>

          {/* BOTÃO DO CARRINHO */}
          <button
            className="
              bg-[#4B2995]
              hover:bg-[#3d217c]
              text-white p-2 rounded-lg transition
            "
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
