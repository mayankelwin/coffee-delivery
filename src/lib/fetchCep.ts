export interface CepResponse {
  cep?: string
  logradouro?: string
  complemento?: string
  bairro?: string
  localidade?: string
  uf?: string
  erro?: boolean
}

export async function fetchCep(cep: string): Promise<CepResponse> {
  const clean = cep.replace(/\D/g, "")

  if (clean.length !== 8) {
    throw new Error("CEP inválido")
  }

  const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`)
  const data = await res.json()

  return data
}
