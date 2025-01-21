export interface IProductIndicators {
    totalProductsSold: number;
    topProductsByQuantity: Array<{
      productId: string;
      productName: string;
      totalQuantity: number;
    }>;
    topProductsByRevenue: Array<{
      productId: string;
      productName: string;
      totalRevenue: number;
    }>;
    totalRevenueFromProducts: number;
    averageProductsPerOrder: number;
  }