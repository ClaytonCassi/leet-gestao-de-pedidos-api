import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CalculatePriceService from '@modules/price-calculator/services/CalculatePriceService';

class CalculatePriceController {
  public async calculate(request: Request, response: Response): Promise<Response> {
    const { budgets } = request.body;

    if (!Array.isArray(budgets)) {
      return response.status(400).json({ error: 'budgets must be an array' });
    }

    const calculatePrice = container.resolve(CalculatePriceService);

    const { results, bestBoxMessage } = await calculatePrice.execute({ budgets });

    return response.json({ results, bestBoxMessage });
  }
}

export { CalculatePriceController };
