import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Address {
  cep: string
  street: string
  number: string
  complement: string
  district: string
  city: string
  uf: string
}

interface LocationState {
  selectedCity: string
  address: Address | null

  setSelectedCity: (city: string) => void
  setAddress: (address: Address) => void

  resetLocation: () => void
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      selectedCity: "Porto Alegre, RS",
      address: null,

      setSelectedCity: (city) => set({ selectedCity: city }),

      setAddress: (address) =>
        set({
          address,
          selectedCity: `${address.city}, ${address.uf}`,
        }),

      resetLocation: () => set({ address: null, selectedCity: "Porto Alegre, RS" }),
    }),
    { name: "user-location" }
  )
)
