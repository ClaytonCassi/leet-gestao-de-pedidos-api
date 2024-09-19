import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class PartageCalculatorService {
  private readonly urlBase = 'https://portal.kangu.com.br/tms/transporte/simular';

  public async calcularFrete(
    cepOrigem: string, 
    cepDestino: string, 
    vlrMerc: number, 
    pesoMerc: number, 
    volumes: Array<{peso: number, altura: number, largura: number, comprimento: number, tipo: string, valor: number, quantidade: number}>
  ): Promise<any> {
    const payload = {
      cepOrigem,
      cepDestino,
      vlrMerc,
      pesoMerc,
      volumes
    };

    try {
      console.log('Enviando payload para Kangu:', payload);
      const response = await axios.post(this.urlBase, payload, {
        headers: {
          'Content-Type': 'application/json',
          'token': process.env.API_KEY_KANGU
        }
      });
      console.log('Resposta da Kangu:', response.data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        // A resposta foi recebida, mas o status não está no intervalo 2xx
        console.error('Erro na resposta da Kangu:', axiosError.response.data);
      } else if (axiosError.request) {
        // A solicitação foi feita, mas nenhuma resposta foi recebida
        console.error('Erro na solicitação para a Kangu:', axiosError.request);
      } else {
        // Algo aconteceu ao configurar a solicitação que acionou um erro
        console.error('Erro ao configurar solicitação para a Kangu:', axiosError.message);
      }
      throw new Error('Erro ao conectar ao serviço da Kangu');
    }
  }
}

export default PartageCalculatorService;
