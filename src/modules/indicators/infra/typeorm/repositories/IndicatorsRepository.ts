import { Between, Repository } from 'typeorm';
import Order from '../../../../../modules/order/infra/typeorm/entities/Order';
import dataSource from '../../../../../shared/infra/typeorm/data-source';
import IIndicatorsRepository from '../../../../../modules/indicators/repositories/IIndicatorsRepository';


class IndicatorsRepository implements IIndicatorsRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Order);
  }

  public async countTotalOrders(startDate: Date, endDate: Date): Promise<number> {
    return this.ormRepository.count({
      where: {
        dataPedido: Between(startDate, endDate),
      },
    });
  }

  public async countOrdersByDesigner(startDate: Date, endDate: Date): Promise<{ designer: string; orderCount: number }[]> {
    return this.ormRepository
      .createQueryBuilder('order')
      .select('order.nomeDesigner', 'designer')
      .addSelect('COUNT(order.id)', 'orderCount')
      .where('order.dataPedido BETWEEN :startDate AND :endDate', { startDate, endDate })
      .groupBy('order.nomeDesigner')
      .orderBy('"orderCount"', 'DESC')
      .getRawMany();
  }

  public async calculateTotalRevenue(startDate: Date, endDate: Date): Promise<number> {
    const result = await this.ormRepository
      .createQueryBuilder('order')
      .select('SUM(order.valorTotal)', 'totalRevenue')
      .where('order.dataPedido BETWEEN :startDate AND :endDate', { startDate, endDate })
      .getRawOne();
    return parseFloat(result.totalRevenue) || 0;
  }

  public async calculateRevenueByMonth(startDate: Date, endDate: Date): Promise<{ month: string; revenue: number }[]> {
    return this.ormRepository
      .createQueryBuilder('order')
      .select("TO_CHAR(order.dataPedido, 'YYYY-MM')", 'month')
      .addSelect('SUM(order.valorTotal)', 'revenue')
      .where('order.dataPedido BETWEEN :startDate AND :endDate', { startDate, endDate })
      .groupBy("TO_CHAR(order.dataPedido, 'YYYY-MM')")
      .orderBy("TO_CHAR(order.dataPedido, 'YYYY-MM')", 'ASC')
      .getRawMany();
  }

  public async calculateAvgOrderValue(startDate: Date, endDate: Date): Promise<number> {
    const result = await this.ormRepository
      .createQueryBuilder('order')
      .select('AVG(order.valorTotal)', 'avgValue')
      .where('order.dataPedido BETWEEN :startDate AND :endDate', { startDate, endDate })
      .getRawOne();
    return parseFloat(result.avgValue) || 0;
  }

  public async countOrdersByPaymentStatus(
    startDate: Date,
    endDate: Date,
  ): Promise<{ status: string; count: number }[]> {
    return this.ormRepository
      .createQueryBuilder('order')
      .select('order.pagamentoVerificado', 'status')
      .addSelect('COUNT(order.id)', 'count')
      .where('order.dataPedido BETWEEN :startDate AND :endDate', { startDate, endDate })
      .groupBy('order.pagamentoVerificado')
      .getRawMany();
  }

  public async getTopSellers(startDate: Date, endDate: Date): Promise<{ seller: string; totalSales: number }[]> {
    return this.ormRepository
      .createQueryBuilder('order')
      .select('order.nomeVendedor', 'seller')
      .addSelect('SUM(order.valorTotal)', 'totalSales')
      .where('order.dataPedido BETWEEN :startDate AND :endDate', { startDate, endDate })
      .groupBy('order.nomeVendedor')
      .orderBy('SUM(order.valorTotal)', 'DESC')
      .limit(5)
      .getRawMany();
  }

  public async calculateSalesBySeller(startDate: Date, endDate: Date): Promise<{ seller: string; salesCount: number }[]> {
    return this.ormRepository
      .createQueryBuilder('order')
      .select('order.nomeVendedor', 'seller')
      .addSelect('COUNT(order.id)', 'salesCount')
      .where('order.dataPedido BETWEEN :startDate AND :endDate', { startDate, endDate })
      .groupBy('order.nomeVendedor')
      .getRawMany();
  }

  public async getOrderDistributionByField(
    field: 'cep' | 'prazo',
    startDate: Date,
    endDate: Date,
  ): Promise<{ field: string; count: number }[]> {
    return this.ormRepository
      .createQueryBuilder('order')
      .select(`order.${field}`, 'field')
      .addSelect('COUNT(order.id)', 'count')
      .where('order.dataPedido BETWEEN :startDate AND :endDate', { startDate, endDate })
      .groupBy(`order.${field}`)
      .getRawMany();
  }

  

  public async countOrdersBySeller(startDate: Date, endDate: Date): Promise<{ seller: string; orderCount: number }[]> {
    return this.ormRepository
      .createQueryBuilder('order')
      .select('order.nomeVendedor', 'seller')
      .addSelect('COUNT(order.id)', 'orderCount') // Alias com aspas duplas
      .where('order.dataPedido BETWEEN :startDate AND :endDate', { startDate, endDate })
      .groupBy('order.nomeVendedor')
      .orderBy('"orderCount"', 'DESC') // Alias com aspas duplas no ORDER BY
      .getRawMany();
  }

  
  

  public async calculateRevenueBySeller(startDate: Date, endDate: Date): Promise<{ seller: string; revenue: number }[]> {
    return this.ormRepository
      .createQueryBuilder('order')
      .select('order.nomeVendedor', 'seller')
      .addSelect('COALESCE(SUM(order.valorTotal), 0)', 'revenue') // Considera receita 0 para vendedores sem registros
      .where('order.dataPedido BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orWhere('order.dataPedido IS NULL') // Considera vendedores sem pedidos no período
      .groupBy('order.nomeVendedor')
      .getRawMany();
  }

  public async calculateMonthlySalesForLastYear(): Promise<{ month: string; salesCount: number }[]> {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return this.ormRepository
      .createQueryBuilder('order')
      .select("TO_CHAR(order.dataPedido, 'YYYY-MM')", 'month')
      .addSelect('COUNT(order.id)', 'salesCount')
      .where('order.dataPedido >= :oneYearAgo', { oneYearAgo })
      .groupBy("TO_CHAR(order.dataPedido, 'YYYY-MM')")
      .orderBy("TO_CHAR(order.dataPedido, 'YYYY-MM')", 'ASC')
      .getRawMany();
  }
}

export default IndicatorsRepository;
