"use client"

import { useState } from "react"
import { MapPin, Home, Navigation, Search } from "lucide-react"
import { Input } from "@/src/components/ui/Input"
import { toast } from "react-toastify"
import { useLocationStore } from "@/src/store/useLocationStore"

export function CheckoutAddressForm() {
  const [cep, setCep] = useState("")
  const [street, setStreet] = useState("")
  const [number, setNumber] = useState("")
  const [complement, setComplement] = useState("")
  const [district, setDistrict] = useState("")
  const [city, setCity] = useState("")
  const [uf, setUf] = useState("")
  const [loading, setLoading] = useState(false)

  const setAddress = useLocationStore((state) => state.setAddress)

  function updateStoreAddress(custom = {}) {
    setAddress({
      cep,
      street,
      number,
      complement,
      district,
      city,
      uf,
      ...custom,
    })
  }

  async function handleSearchCep() {
    const clean = cep.replace(/\D/g, "")

    if (clean.length !== 8) {
      toast.error("Digite um CEP válido!")
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`)
      const data = await res.json()

      if (data.erro) {
        toast.warn("CEP não encontrado!")
        return
      }

      setStreet(data.logradouro || "")
      setDistrict(data.bairro || "")
      setCity(data.localidade || "")
      setUf(data.uf || "")

      updateStoreAddress({
        cep: clean,
        street: data.logradouro || "",
        district: data.bairro || "",
        city: data.localidade || "",
        uf: data.uf || "",
      })

      toast.success("Endereço encontrado!")
    } catch (err) {
      console.log("Erro ao buscar CEP:", err)
      toast.error("Erro ao buscar CEP!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#F3F2F2] p-6 rounded-lg border border-gray-200">

      <div className="flex flex-row gap-2"> 
        <MapPin size={24} color="#C47F17" />

        <div>
          <h2 className="text-lg font-bold text-black mb-1">Endereço de Entrega</h2>
          <p className="text-sm text-gray-600 mb-5">
            Informe o endereço onde deseja receber seu pedido
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">

        <div className="flex gap-3 items-center">
          <Input
            value={cep}
            onChange={(v) => {
              setCep(v)
              updateStoreAddress({ cep: v })
            }}
            placeholder="00000-000"
            icon={<MapPin size={18} />}
            variant="light"
          />

          <button
            onClick={handleSearchCep}
            className="px-4 h-11 bg-black text-white rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition cursor-pointer"
          >
            {loading ? "..." : <Search size={18} />}
          </button>
        </div>

        <Input
          value={street}
          onChange={(v) => {
            setStreet(v)
            updateStoreAddress({ street: v })
          }}
          placeholder="Rua"
          icon={<Home size={18} />}
          variant="light"
        />

        <div className="flex gap-3">

          <Input
            value={number}
            onChange={(v) => {
              setNumber(v)
              updateStoreAddress({ number: v })
            }}
            placeholder="123"
            icon={<Navigation size={18} />}
            variant="light"
          />

          <Input
            value={complement}
            onChange={(v) => {
              setComplement(v)
              updateStoreAddress({ complement: v })
            }}
            placeholder="Opcional"
            variant="light"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">

          <Input
            value={district}
            onChange={(v) => {
              setDistrict(v)
              updateStoreAddress({ district: v })
            }}
            placeholder="Centro"
            variant="light"
          />

          <Input
            value={city}
            onChange={(v) => {
              setCity(v)
              updateStoreAddress({ city: v })
            }}
            placeholder="Cidade"
            variant="light"
          />

          <Input
            value={uf}
            onChange={(v) => {
              const formatted = v.toUpperCase().slice(0, 2)
              setUf(formatted)
              updateStoreAddress({ uf: formatted })
            }}
            maxLength={2}
            placeholder="UF"
            variant="light"
          />
        </div>
      </div>
    </div>
  )
}
