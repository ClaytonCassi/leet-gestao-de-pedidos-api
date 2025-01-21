
  export interface IAdditionalIndicators {
    totalAdditionalsSold: number;
    topAdditionalsByUsage: {
      additionalId: string;
      additionalName: string;
      usageCount: number;
    }[];
    topAdditionalsByRevenue: {
      additionalId: string;
      additionalName: string;
      totalRevenue: number;
    }[];
    averageAdditionalsPerOrder: number;
  }