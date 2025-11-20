
export interface Uf {
  id: number;
  nome: string;
  sigla: string;
}

export async function getBrazilUf(): Promise<Uf[]> {
  const response = await fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
  );

  const data = await response.json();

  return data.sort((a: Uf, b: Uf) => a.nome.localeCompare(b.nome));
}
