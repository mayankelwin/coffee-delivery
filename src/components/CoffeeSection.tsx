import { coffees } from "../data/coffees";
import { CoffeeCard } from "./card/CoffeeCard";


export function CoffeeSection() {
  return (
    <section className="text-black mt-20">
      <h1 className="text-3xl font-bold mb-10 leading-tight">Nossos cafés</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {coffees.map((coffee) => (
          <CoffeeCard
            key={coffee.id}
            name={coffee.name}
            description={coffee.description}
            tags={coffee.tags}
            price={coffee.price}
            image={coffee.image}
          />
        ))}
      </div>
    </section>
  );
}
