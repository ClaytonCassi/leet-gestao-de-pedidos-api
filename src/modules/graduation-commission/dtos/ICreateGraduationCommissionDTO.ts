// src/modules/graduationCommission/dtos/ICreateGraduationCommissionDTO.ts

interface ICreateGraduationCommissionDTO {
  cupom: string;
  nomeCurso: string;
  dataEvento: Date;
  quantidadeIntegrantes: number;
  quantidadeFormandos: number;
  quantidadePedido: number;
  vendedor: string;
  estado: string;
  cep: string;
  nomeResponsavel: string;
  contatoResponsavel: string;
  documentoAssinaturaUrl?: string;
  integrantes: Array<{
    nome: string;
    telefone: string;
    cpf: string;
    instagram?: string;
  }>;
  quantidadeCuponsAtivados?: number;
  quantidadePedidosRealizados?: number;
  quantidadeEmAtendimento?: number;
  quantidadeEmFaseDaArte?: number;
  observacao?: string;
}

export default ICreateGraduationCommissionDTO;
