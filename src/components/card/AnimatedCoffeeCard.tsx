"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CoffeeCard } from "./CoffeeCard";

interface AnimatedCoffeeCardProps {
  coffee: {
    id: number; 
    name: string;
    description: string;
    tags: string[];
    price: number;
    image: string;
  };
}

export function AnimatedCoffeeCard({ coffee }: AnimatedCoffeeCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-center"
    >
      <CoffeeCard
        id={coffee.id}
        name={coffee.name}
        description={coffee.description}
        tags={coffee.tags}
        price={coffee.price}
        image={coffee.image}
      />
    </motion.div>
  );
}
