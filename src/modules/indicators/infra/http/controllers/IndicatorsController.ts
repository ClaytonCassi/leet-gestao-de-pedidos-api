// IndicatorsController.ts
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IndicatorsService from '../../../services/IndicatorsService';

class IndicatorsController {
  public async getBaseIndicators(request: Request, response: Response): Promise<Response> {
    const { startDate, endDate } = request.query;

    if (!startDate || !endDate) {
      return response.status(400).json({ message: 'Start date and end date are required.' });
    }

    const parsedStartDate = new Date(startDate as string);
    const parsedEndDate = new Date(endDate as string);

    const indicatorsService = container.resolve(IndicatorsService);
    const indicators = await indicatorsService.getBaseIndicators(parsedStartDate, parsedEndDate);

    return response.json(indicators);
  }

  public async getProductIndicators(request: Request, response: Response): Promise<Response> {
    const { startDate, endDate, productId } = request.query;

    if (!startDate || !endDate) {
      return response.status(400).json({ message: 'Start date and end date are required.' });
    }

    const parsedStartDate = new Date(startDate as string);
    const parsedEndDate = new Date(endDate as string);

    const indicatorsService = container.resolve(IndicatorsService);
    const indicators = await indicatorsService.getProductIndicators(
      parsedStartDate,
      parsedEndDate,
      productId as string | undefined,
    );

    return response.json(indicators);
  }

  public async getAdditionalIndicators(request: Request, response: Response): Promise<Response> {
    const { startDate, endDate, additionalId } = request.query;

    if (!startDate || !endDate) {
      return response.status(400).json({ message: 'Start date and end date are required.' });
    }

    const parsedStartDate = new Date(startDate as string);
    const parsedEndDate = new Date(endDate as string);

    const indicatorsService = container.resolve(IndicatorsService);
    const indicators = await indicatorsService.getAdditionalIndicators(
      parsedStartDate,
      parsedEndDate,
      additionalId as string | undefined,
    );

    return response.json(indicators);
  }
}

export default IndicatorsController;