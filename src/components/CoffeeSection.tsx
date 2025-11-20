"use client";

import { coffees } from "../data/coffees";
import { AnimatedCoffeeCard } from "./card/AnimatedCoffeeCard";

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
        {coffees.map((coffee) => (
          <AnimatedCoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </div>
    </section>
  );
}
