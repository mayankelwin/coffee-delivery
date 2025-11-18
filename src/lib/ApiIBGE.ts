export async function getBrazilUf() {
  const response = await fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
  );
  
  const data = await response.json();

  return data.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
}
