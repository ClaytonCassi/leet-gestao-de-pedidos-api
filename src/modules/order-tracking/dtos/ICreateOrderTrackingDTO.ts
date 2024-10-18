export default interface ICreateOrderTrackingDTO {
  nomeVendedor: string;
  nomeFuncionarioArte: string;
  dataEnvio: Date;
  statusPagamento: string;
  nomeCliente: string;
  celularCliente?: string;
}
