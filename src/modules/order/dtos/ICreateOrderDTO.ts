export interface IOrderProductDTO {
  id: string;
  productId: string;
  quantidade: number;
  nome: string;
  orderId?: string;
  adicionais?: IAdicionalDTO[];
  valorUnitario: number;
}

export interface IAdicionalDTO {
  id?: string;
  adicionalId: string;
  orderProductId?: string;
}

export default interface ICreateOrderDTO {
  id?: string;
  cliente: string;
  dataPedido: Date;
  celular: string;
  produtos: IOrderProductDTO[];
  numeroArte: string;
  dataEvento: Date;
  valorFrete: number;
  cep: string;
  prazo: string;
  rua: string;
  valorTotal: number;
  imagem?: string | null;
  valorSinal: number;
  faltaPagar: number;
  dataEntrega: Date;
  observacao?: string;
  formaPagamento?: string; 
  nomeVendedor?: string | undefined;
}
