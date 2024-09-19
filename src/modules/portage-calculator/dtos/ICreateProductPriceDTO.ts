interface ICreateProductPriceDTO {
  product_id: string;
  faixa: string;
  quantidade_min: number;
  quantidade_max: number | null;
  preco: number;
  height: number;
  width: number;
  depth: number;
  weight: number;
  volume: number;
  stackable: boolean;
  stackingFactor?: number;
  pairingFactor?: { height: number; width: number; depth: number };
}

export default ICreateProductPriceDTO;

