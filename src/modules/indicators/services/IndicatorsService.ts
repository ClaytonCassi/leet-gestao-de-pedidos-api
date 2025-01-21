// IndicatorsService.ts
import { injectable, inject } from 'tsyringe';
import IIndicatorsRepository from '../repositories/IIndicatorsRepository';
import { IProductIndicators } from '../repositories/IProductIndicators';
import { IAdditionalIndicators } from '../repositories/IAdditionalIndicators';

interface IIndicatorsBase {
  totalOrders: number;
  revenueByMonth: { month: string; revenue: number }[];
  avgOrderValue: number;
  ordersByPaymentStatus: { status: string; count: number }[];
  topSellers: { seller: string; totalSales: number }[];
  orderDistribution: { field: string; count: number }[];
  revenueBySeller: { seller: string; revenue: number }[];
  ordersBySeller: { seller: string; orderCount: number }[];
  totalRevenue: number;
  ordersByDesigner: { designer: string; orderCount: number }[];
}

@injectable()
class IndicatorsService {
  constructor(
    @inject('IndicatorsRepository')
    private indicatorsRepository: IIndicatorsRepository,
  ) {}

  public async getBaseIndicators(startDate: Date, endDate: Date): Promise<IIndicatorsBase> {
    const totalOrders = await this.indicatorsRepository.countTotalOrders(startDate, endDate);
    const totalRevenue = await this.indicatorsRepository.calculateTotalRevenue(startDate, endDate);
    const revenueByMonth = await this.indicatorsRepository.calculateRevenueByMonth(startDate, endDate);
    const avgOrderValue = await this.indicatorsRepository.calculateAvgOrderValue(startDate, endDate);
    const ordersByPaymentStatus = await this.indicatorsRepository.countOrdersByPaymentStatus(startDate, endDate);
    const topSellers = await this.indicatorsRepository.getTopSellers(startDate, endDate);
    const orderDistribution = await this.indicatorsRepository.getOrderDistributionByField('cep', startDate, endDate);
    const revenueBySeller = await this.indicatorsRepository.calculateRevenueBySeller(startDate, endDate);
    const ordersBySeller = await this.indicatorsRepository.countOrdersBySeller(startDate, endDate);
    const ordersByDesigner = await this.indicatorsRepository.countOrdersByDesigner(startDate, endDate);

    return {
      totalOrders,
      totalRevenue,
      revenueByMonth,
      avgOrderValue,
      ordersByPaymentStatus,
      topSellers,
      orderDistribution,
      revenueBySeller,
      ordersBySeller,
      ordersByDesigner,
    };
  }

  public async getProductIndicators(
    startDate: Date,
    endDate: Date,
    productId?: string,
  ): Promise<IProductIndicators> {
    return this.indicatorsRepository.getProductIndicators(startDate, endDate, productId);
  }

  public async getAdditionalIndicators(
    startDate: Date,
    endDate: Date,
    additionalId?: string,
  ): Promise<IAdditionalIndicators> {
    return this.indicatorsRepository.getAdditionalIndicators(startDate, endDate, additionalId);
  }
}

export default IndicatorsService;