import { Router } from 'express';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '../../../../modules/users/infra/http/routes/password.routes';
import profileRouter from '../../../../modules/users/infra/http/routes/profile.routes';
import orderRouter from '../../../../modules/order/infra/http/routes/order.routes';
import productRouter from '../../../../modules/product/infra/http/routes/product.routes'; 
import additionalRouter from '../../../../modules/additional/infra/http/routes/additional.routes'; 
import feedbackRouter from '../../../../modules/feedback/infra/http/routes/feedback.routes'; 
import productPricesRouter from '../../../../modules/product-prices/infra/http/routes/productPrices.routes';
import additionalPricesRouter from '../../../../modules/additional-prices/infra/http/routes/additionalPrices.routes';
import priceCalculatorRouter from '../../../../modules/price-calculator/infra/http/routes/price-calculator.routes';
import partageCalculatorRouter from '../../../../modules/portage-calculator/infra/http/routes/partageCalculator.routes';
import orderTrackingRouter from '../../../../modules/order-tracking/infra/http/routes/order-tracking.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/order', orderRouter);
routes.use('/product', productRouter); 
routes.use('/additional', additionalRouter); 
routes.use('/feedback', feedbackRouter);
routes.use('/product-prices', productPricesRouter);
routes.use('/additional-prices', additionalPricesRouter);
routes.use('/calculate-price', priceCalculatorRouter);
routes.use('/partage-calculator', partageCalculatorRouter); 
routes.use('/order-tracking', orderTrackingRouter);

export default routes;
