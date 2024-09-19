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
  pairing_height?: number; 
  pairing_width?: number;  
  pairing_depth?: number;
}

export default ICreateProductPriceDTO;
