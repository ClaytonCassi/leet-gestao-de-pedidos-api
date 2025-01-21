import { Between, Repository } from 'typeorm';
import Order from '../../../../../modules/order/infra/typeorm/entities/Order';
import dataSource from '../../../../../shared/infra/typeorm/data-source';
import IIndicatorsRepository from '../../../../../modules/indicators/repositories/IIndicatorsRepository';
import { IAdditionalIndicators } from '../../../../../modules/indicators/repositories/IAdditionalIndicators';
import { IProductIndicators } from '../../../../../modules/indicators/repositories/IProductIndicators';


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

  public async getProductIndicators(
    startDate: Date,
    endDate: Date,
    productId?: string,
  ): Promise<IProductIndicators> {
    const query = this.ormRepository
      .createQueryBuilder('order')
      .leftJoin('order.produtos', 'produtos') // 'produtos' é o alias correto para a relação com `order_products`
      .where('order.dataPedido BETWEEN :startDate AND :endDate', { startDate, endDate });
  
    if (productId) {
      query.andWhere('produtos.productId = :productId', { productId }); // 'produtos' deve ser usado
    }
  
    const totalProductsSoldRaw = await query
      .select('SUM(produtos.quantidade)', 'total') // Substitua 'orderProduct' por 'produtos'
      .getRawOne();
  
    const totalProductsSold = Number(totalProductsSoldRaw?.total) || 0;
  
    const topProductsByQuantityRaw = await query
    .select([
      'produtos.productId AS "productId"', // Alias entre aspas para garantir consistência
      'produtos.nome AS "productName"',
      'SUM(produtos.quantidade) AS "totalQuantity"',
    ])
    .groupBy('produtos.productId')
    .addGroupBy('produtos.nome')
    .orderBy('SUM(produtos.quantidade)', 'DESC')
    .limit(10)
    .getRawMany();
  
    const topProductsByQuantity = topProductsByQuantityRaw.map(item => ({
      productId: item.productId,
      productName: item.productName,
      totalQuantity: Number(item.totalQuantity),
    }));
  
    const topProductsByRevenueRaw = await query
      .select([
        'produtos.productId AS "productId"', // Substitua 'orderProduct' por 'produtos'
        'produtos.nome AS "productName"',
        'SUM(produtos.quantidade * produtos.valorUnitario) AS "totalRevenue"',
      ])
      .groupBy('produtos.productId')
      .addGroupBy('produtos.nome')
      .orderBy('SUM(produtos.quantidade * produtos.valorUnitario)', 'DESC')
      .limit(10)
      .getRawMany();
  
    const topProductsByRevenue = topProductsByRevenueRaw.map(item => ({
      productId: item.productId,
      productName: item.productName,
      totalRevenue: Number(item.totalRevenue),
    }));
  
    const totalRevenueFromProductsRaw = await query
      .select('SUM(produtos.quantidade * produtos.valorUnitario)', 'totalRevenue') // Substitua 'orderProduct' por 'produtos'
      .getRawOne();
  
    const totalRevenueFromProducts = Number(totalRevenueFromProductsRaw?.totalRevenue) || 0;
  
    const totalOrders = await this.countTotalOrders(startDate, endDate);
    const averageProductsPerOrder =
      totalOrders > 0 ? totalProductsSold / totalOrders : 0;
  
    return {
      totalProductsSold,
      topProductsByQuantity,
      topProductsByRevenue,
      totalRevenueFromProducts,
      averageProductsPerOrder,
    };
  }
  

  // ----------------------------------------------------------------
  // 2. Indicadores de ADICIONAIS
  // ----------------------------------------------------------------
  public async getAdditionalIndicators(
    startDate: Date,
    endDate: Date,
    additionalId?: string,
  ): Promise<IAdditionalIndicators> {
    const query = this.ormRepository
      .createQueryBuilder('order')
      .leftJoin('order.produtos', 'produtos') // Alias correto
      .leftJoin('produtos.adicionais', 'adicionais') // Alias correto para 'additionals'
      .where('order.dataPedido BETWEEN :startDate AND :endDate', { startDate, endDate });
  
    if (additionalId) {
      query.andWhere('adicionais.adicionalId = :additionalId', { additionalId }); // 'adicionais' é o alias correto
    }
  
    const totalAdditionalsSoldRaw = await query
      .select('COUNT(adicionais.id)', 'total') // Substitua 'additionals' por 'adicionais'
      .getRawOne();
  
    const totalAdditionalsSold = Number(totalAdditionalsSoldRaw?.total) || 0;
  
    const topAdditionalsByUsageRaw = await query
      .select([
        'adicionais.adicionalId AS additionalId',
        'adicionais.nome AS additionalName',
        'COUNT(adicionais.id) AS usageCount',
      ])
      .groupBy('adicionais.adicionalId')
      .addGroupBy('adicionais.nome')
      .orderBy('COUNT(adicionais.id)', 'DESC')
      .limit(5)
      .getRawMany();
  
    const topAdditionalsByUsage = topAdditionalsByUsageRaw.map(item => ({
      additionalId: item.additionalId,
      additionalName: item.additionalName,
      usageCount: Number(item.usageCount),
    }));
  
    const topAdditionalsByRevenueRaw = await query
      .leftJoin('additional_prices', 'ap', 'ap.additional_id = adicionais.adicionalId') // Substitua 'additionals' por 'adicionais'
      .andWhere('ap.quantidade_min <= produtos.quantidade')
      .andWhere('ap.quantidade_max IS NULL OR ap.quantidade_max >= produtos.quantidade')
      .select([
        'adicionais.adicionalId AS additionalId',
        'adicionais.nome AS additionalName',
        'SUM(ap.preco * produtos.quantidade) AS totalRevenue',
      ])
      .groupBy('adicionais.adicionalId')
      .addGroupBy('adicionais.nome')
      .orderBy('SUM(ap.preco * produtos.quantidade)', 'DESC')
      .limit(5)
      .getRawMany();
  
    const topAdditionalsByRevenue = topAdditionalsByRevenueRaw.map(item => ({
      additionalId: item.additionalId,
      additionalName: item.additionalName,
      totalRevenue: Number(item.totalRevenue),
    }));
  
    const totalOrders = await this.countTotalOrders(startDate, endDate);
    const averageAdditionalsPerOrder =
      totalOrders > 0 ? totalAdditionalsSold / totalOrders : 0;
  
    return {
      totalAdditionalsSold,
      topAdditionalsByUsage,
      topAdditionalsByRevenue,
      averageAdditionalsPerOrder,
    };
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
