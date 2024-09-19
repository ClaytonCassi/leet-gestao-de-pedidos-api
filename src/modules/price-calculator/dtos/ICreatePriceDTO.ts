interface ICreatePriceDTO {
  faixa: string;
  quantidade_min: number;
  quantidade_max: number | null;
  preco: string;
}

export default ICreatePriceDTO;
