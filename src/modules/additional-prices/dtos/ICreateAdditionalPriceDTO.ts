interface ICreateAdditionalPriceDTO {
  additional_id: string;
  faixa: string;
  quantidade_min: number;
  quantidade_max: number | null;
  preco: number;
}

export default ICreateAdditionalPriceDTO;
