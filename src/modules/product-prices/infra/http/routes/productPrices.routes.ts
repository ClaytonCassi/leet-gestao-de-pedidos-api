import { Router } from 'express';
import { ProductPricesController } from '../controllers/ProductPricesController';

const productPricesRouter = Router();
const productPricesController = new ProductPricesController();

productPricesRouter.post('/', productPricesController.create);
productPricesRouter.get('/', productPricesController.list);
productPricesRouter.put('/:id', productPricesController.update);
productPricesRouter.get('/:id', productPricesController.show);
productPricesRouter.delete('/:id', productPricesController.delete);
productPricesRouter.get('/product/:productId', productPricesController.listByProduct);

export default productPricesRouter;
