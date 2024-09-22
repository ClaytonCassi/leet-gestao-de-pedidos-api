import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAdditionalService from '../../../../../modules/additional/services/CreateAdditionalService';
import ListAdditionalsService from '../../../../../modules/additional/services/ListAdditionalService';
import UpdateAdditionalService from '../../../../../modules/additional/services/UpdateAdditionalService';
import DeleteAdditionalService from '../../../../../modules/additional/services/DeleteAdditionalService';

class AdditionalController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nomeAdicional, codigoAdicional, custoAdicional } = request.body;

    const createAdditional = container.resolve(CreateAdditionalService);

    const additional = await createAdditional.execute({
      nome: nomeAdicional,
      codigo: codigoAdicional,
      custo: custoAdicional,
    });

    return response.status(201).json(additional);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listAdditionals = container.resolve(ListAdditionalsService);

    const additionals = await listAdditionals.execute();

    return response.json(additionals);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { nomeAdicional, codigoAdicional, custoAdicional } = request.body;

    const updateAdditional = container.resolve(UpdateAdditionalService);

    const additional = await updateAdditional.execute({
      id,
      nome: nomeAdicional,
      codigo: codigoAdicional,
      custo: custoAdicional,
    });

    return response.json(additional);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAdditional = container.resolve(DeleteAdditionalService);

    await deleteAdditional.execute(id);

    return response.status(204).send();
  }
}

export { AdditionalController };
