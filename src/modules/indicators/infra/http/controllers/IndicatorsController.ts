import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IndicatorsService from '../../../services/IndicatorsService';

class IndicatorsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { startDate, endDate } = request.query;

    if (!startDate || !endDate) {
      return response.status(400).json({ message: 'Start date and end date are required.' });
    }

    const parsedStartDate = new Date(startDate as string);
    const parsedEndDate = new Date(endDate as string);

    const indicatorsService = container.resolve(IndicatorsService);
    const indicators = await indicatorsService.getIndicators(parsedStartDate, parsedEndDate);

    return response.json(indicators);
  }
}

export default IndicatorsController;
