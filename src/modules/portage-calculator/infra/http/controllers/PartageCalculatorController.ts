import { Request, Response } from 'express';
import { container } from 'tsyringe';
import PartageCalculatorService from '../../../services/PartageCalculatorService';

class PartageCalculatorController {
  public async calcularFrete(request: Request, response: Response): Promise<Response> {
    const { cepOrigem, cepDestino, vlrMerc, pesoMerc, volumes } = request.body;

    const kanguFreteService = container.resolve(PartageCalculatorService);

    try {
      const resultado = await kanguFreteService.calcularFrete(cepOrigem, cepDestino, vlrMerc, pesoMerc, volumes);
      return response.json(resultado);
    } catch (error) {
      console.error('Erro no cálculo do frete:',  (error as Error).message);
      return response.status(500).json({ message: 'Erro ao calcular frete',  error: (error as Error).message  });
    }
  }
}

export default PartageCalculatorController;
