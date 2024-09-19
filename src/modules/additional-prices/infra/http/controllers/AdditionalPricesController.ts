import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAdditionalPriceService from '@modules/additional-prices/services/CreateAdditionalPriceService';
import ListAdditionalPricesService from '@modules/additional-prices/services/ListAdditionalPricesService';
import UpdateAdditionalPriceService from '@modules/additional-prices/services/UpdateAdditionalPriceService';
import DeleteAdditionalPriceService from '@modules/additional-prices/services/DeleteAdditionalPriceService';
import ShowAdditionalPriceService from '@modules/additional-prices/services/ShowAdditionalPriceService';
import ListByAdditionalService from '@modules/additional-prices/services/ListByAdditionalService';

class AdditionalPricesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { additional_id, faixa, quantidade_min, quantidade_max, preco } = request.body;

    const createAdditionalPrice = container.resolve(CreateAdditionalPriceService);

    const additionalPrice = await createAdditionalPrice.execute({
      additional_id,
      faixa,
      quantidade_min,
      quantidade_max,
      preco,
    });

    return response.status(201).json(additionalPrice);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listAdditionalPrices = container.resolve(ListAdditionalPricesService);

    const additionalPrices = await listAdditionalPrices.execute();

    return response.json(additionalPrices);
  }

  public async listByAdditional(request: Request, response: Response): Promise<Response> {
    const { additionalId } = request.params;

    const listByAdditional = container.resolve(ListByAdditionalService);

    const additionalPrices = await listByAdditional.execute({ additionalId });

    return response.json(additionalPrices);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { faixa, quantidade_min, quantidade_max, preco } = request.body;

    const updateAdditionalPrice = container.resolve(UpdateAdditionalPriceService);

    const additionalPrice = await updateAdditionalPrice.execute({
      id,
      faixa,
      quantidade_min,
      quantidade_max,
      preco,
    });

    return response.json(additionalPrice);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAdditionalPrice = container.resolve(ShowAdditionalPriceService);

    try {
      const additionalPrice = await showAdditionalPrice.execute(id);

      if (!additionalPrice) {
        return response.status(404).json({ message: 'Faixa de preço do adicional não encontrada.' });
      }

      return response.json(additionalPrice);
    } catch (error) {
      return response.status(500).json({ 
        message: 'Erro ao buscar a faixa de preço do adicional', 
        error: (error as Error).message 
      });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAdditionalPrice = container.resolve(DeleteAdditionalPriceService);

    await deleteAdditionalPrice.execute(id);

    return response.status(204).send();
  }
}

export { AdditionalPricesController };
