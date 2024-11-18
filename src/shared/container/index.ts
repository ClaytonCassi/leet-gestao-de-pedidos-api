import { container } from 'tsyringe';

import '../../modules/users/providers';
import './providers';


import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '../../modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '../../modules/users/infra/typeorm/repositories/UserTokensRepository';

import IOrderRepository from '../../modules/order/repositories/IOrderRepository';
import OrderRepository from '../../modules/order/infra/typeorm/repositories/OrderRepository';

import IProductRepository from '../../modules/product/repositories/IProductRepository';
import ProductRepository from '../../modules/product/infra/typeorm/repositories/ProductRepository';


import IAdditionalRepository from '../../modules/additional/repositories/IAdditionalRepository';
import AdditionalRepository from '../../modules/additional/infra/typeorm/repositories/AdditionalRepository';


import IFeedbackRepository from '../../modules/feedback/repositories/IFeedbackRepository';
import FeedbackRepository from '../../modules/feedback/infra/typeorm/repositories/FeedbackRepository';

import IProductPricesRepository from '../../modules/product-prices/repositories/IProductPricesRepository';
import ProductPricesRepository from '../../modules/product-prices/infra/typeorm/repositories/ProductPricesRepository';

import IAdditionalPricesRepository from '../../modules/additional-prices/repositories/IAdditionalPricesRepository';
import AdditionalPricesRepository from '../../modules/additional-prices/infra/typeorm/repositories/AdditionalPricesRepository';


import { ILogRepository } from '../../modules/log/repositories/ILogRepository';
import LogRepository from '../../modules/log/infra/typeorm/repositories/LogRepository';

import CreateLogService from '../../modules/log/services/CreateLogService';

import IOrderTrackingRepository from '../../modules/order-tracking/repositories/IOrderTrackingRepository';
import OrderTrackingRepository from '../../modules/order-tracking/infra/typeorm/repositories/OrderTrackingRepository';


import GraduationCommissionRepository from '../../modules/graduation-commission/infra/typeorm/repositories/GraduationCommissionRepository';
import IGraduationCommissionRepository from '../../modules/graduation-commission/repositories/IGraduationCommissionRepository';




container.registerSingleton<IGraduationCommissionRepository>(
  'GraduationCommissionRepository',
  GraduationCommissionRepository,
);

container.registerSingleton<IOrderTrackingRepository>(
  'OrderTrackingRepository',
  OrderTrackingRepository,
);

container.registerSingleton<CreateLogService>(
  'CreateLogService',
  CreateLogService,
);


container.registerSingleton<ILogRepository>(
  'LogRepository',
  LogRepository,
);

container.registerSingleton<IAdditionalPricesRepository>(
  'AdditionalPricesRepository',
  AdditionalPricesRepository,
);

container.registerSingleton<IProductPricesRepository>(
  'ProductPricesRepository',
  ProductPricesRepository,
);


container.registerSingleton<IFeedbackRepository>(
  'FeedbackRepository',
  FeedbackRepository,
);


container.registerSingleton<IAdditionalRepository>(
  'AdditionalRepository',
  AdditionalRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);


container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
);


container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);




