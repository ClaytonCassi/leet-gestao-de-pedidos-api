// GraduationCommissionController.ts

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateGraduationCommissionService from '../../../services/CreateGraduationCommissionService';
import UpdateGraduationCommissionService from '../../../services/UpdateGraduationCommissionService';
import DeleteGraduationCommissionService from '../../../services/DeleteGraduationCommissionService';
import ListGraduationCommissionsService from '../../../services/ListGraduationCommissionsService';
import ICreateGraduationCommissionDTO from '../../../dtos/ICreateGraduationCommissionDTO';
import FindGraduationCommissionService from '../../../services/FindGraduationCommissionService';

class GraduationCommissionController {

  public async create(request: Request, response: Response): Promise<Response> {
    const createCommission = container.resolve(CreateGraduationCommissionService);

    const userName = (request.headers['x-user-name'] as string) || '';

    if (!userName) {
      return response.status(400).json({ error: 'User name header is required' });
    }

    const {
      cupom,
      nomeCurso,
      dataEvento,
      quantidadeIntegrantes,
      quantidadeFormandos,
      quantidadePedido,
      vendedor,
      estado,
      cep,
      nomeResponsavel,
      contatoResponsavel,
      integrantes,
      quantidadeCuponsAtivados,
      quantidadePedidosRealizados,
      quantidadeEmAtendimento,
      quantidadeEmFaseDaArte,
      observacao,
    } = request.body;

    const documentoAssinaturaFile = request.file;


    const commission = await createCommission.execute(
      userName,
      {
        cupom,
        nomeCurso,
        dataEvento,
        quantidadeIntegrantes,
        quantidadeFormandos,
        quantidadePedido,
        vendedor,
        estado,
        cep,
        nomeResponsavel,
        contatoResponsavel,
        documentoAssinaturaUrl: undefined, 
        integrantes,
        quantidadeCuponsAtivados,
        quantidadePedidosRealizados,
        quantidadeEmAtendimento,
        quantidadeEmFaseDaArte,
        observacao,
      },
      documentoAssinaturaFile
    );

    return response.status(200).json(commission);
   
  }

    // Método para buscar uma comissão pelo ID
    public async findById(request: Request, response: Response): Promise<Response> {
      const { id } = request.params; // Captura o ID da URL
      const findCommission = container.resolve(FindGraduationCommissionService); // Resolve o serviço
      const commission = await findCommission.execute(id); // Busca a comissão
  
      if (!commission) {
        return response.status(404).json({ error: 'Comissão de formatura não encontrada.' });
      }
  
      return response.json(commission); // Retorna os dados da comissão
    }

  // Método para listar todas as comissões
  public async list(request: Request, response: Response): Promise<Response> {
    const listCommissions = container.resolve(ListGraduationCommissionsService);
    const commissions = await listCommissions.execute();
    return response.json(commissions);
  }

  // Método para atualizar uma comissão de formatura
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const updateCommission = container.resolve(UpdateGraduationCommissionService);

    const data: Partial<ICreateGraduationCommissionDTO> = request.body;
    const updatedCommission = await updateCommission.execute(id, data);

    return response.json(updatedCommission);
  }

  // Método para excluir uma comissão de formatura
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCommission = container.resolve(DeleteGraduationCommissionService);

    const userName = request.user.name;
    await deleteCommission.execute(id, userName);

    return response.status(204).send();
  }
}

export default GraduationCommissionController;
