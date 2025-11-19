"use client";

import { coffees } from "../data/coffees";
import { CoffeeCard } from "./card/CoffeeCard";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function CoffeeSection() {
  return (
    <section className="text-black mt-20 px-2 sm:px-4">
      <h1 className="text-3xl font-bold mb-10 leading-tight text-center sm:text-left">
        Nossos cafés
      </h1>

      <div
        className="
          grid
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4 
          gap-10 
          justify-center
        "
      >
        {coffees.map((coffee) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, margin: "-50px" });

          return (
            <motion.div
              key={coffee.id}
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
        })}
      </div>
    </section>
  );
}
