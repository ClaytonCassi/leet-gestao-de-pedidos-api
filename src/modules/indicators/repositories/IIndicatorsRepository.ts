interface IIndicatorsRepository {
  countTotalOrders(startDate: Date, endDate: Date): Promise<number>;
  calculateTotalRevenue(startDate: Date, endDate: Date): Promise<number>;
  calculateAvgOrderValue(startDate: Date, endDate: Date): Promise<number>;
  countOrdersByPaymentStatus(
    startDate: Date,
    endDate: Date,
  ): Promise<{ status: string; count: number }[]>;
  getTopSellers(startDate: Date, endDate: Date): Promise<{ seller: string; totalSales: number }[]>;
  calculateSalesBySeller(startDate: Date, endDate: Date): Promise<{ seller: string; salesCount: number }[]>;
  getOrderDistributionByField(
    field: 'cep' | 'prazo',
    startDate: Date,
    endDate: Date,
  ): Promise<{ field: string; count: number }[]>;
  calculateRevenueBySeller(startDate: Date, endDate: Date): Promise<{ seller: string; revenue: number }[]>;
  calculateMonthlySalesForLastYear(): Promise<{ month: string; salesCount: number }[]>;
  calculateRevenueByMonth(startDate: Date, endDate: Date): Promise<{ month: string; revenue: number }[]>
  countOrdersBySeller(startDate: Date, endDate: Date): Promise<{ seller: string; orderCount: number }[]>
  countOrdersByDesigner(startDate: Date, endDate: Date): Promise<{ designer: string; orderCount: number }[]>;

}

export default IIndicatorsRepository;
