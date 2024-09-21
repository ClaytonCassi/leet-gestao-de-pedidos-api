import { inject, injectable } from 'tsyringe';
import IProductPricesRepository from '@modules/price-calculator/repositories/IProductPricesRepository';
import IAdditionalPricesRepository from '@modules/price-calculator/repositories/IAdditionalPricesRepository';
import ProductPrice from '@modules/product-prices/infra/typeorm/entities/ProductPrice';

interface IRequestItem {
  quantidade: number;
  produtoId: string;
  adicionais?: string[];
  discount?: number; 
}

interface IRequest {
  budgets: IRequestItem[];
}

interface IResponse {
  results: string[];
  bestBoxMessage: string;
}

@injectable()
class CalculatePriceService {
  constructor(
    @inject('ProductPricesRepository')
    private productPricesRepository: IProductPricesRepository,

    @inject('AdditionalPricesRepository')
    private additionalPricesRepository: IAdditionalPricesRepository,
  ) {}

  public async execute({ budgets }: IRequest): Promise<IResponse> {
    if (!Array.isArray(budgets)) {
      throw new Error('budgets must be an array');
    }

    const results: string[] = [];
    const allProducts: { product: ProductPrice; quantity: number }[] = [];
    let totalWeight = 0;

    // Regras para itens adicionais
    const additionalRules: { [key: string]: string } = {
      'Sobreposição': '* Esse valor está incluso arte em 2 cores (Branco, Prata, Dourado, Rosé)',
      'Silk': '* Esse valor está incluso arte em única cor (Branco, Prata, Dourado, Rosé)',
      'Personalização Colorida': '* Esse valor está incluso arte em mais 2 cores (Exceto Branco, Prata, Dourado, Rosé)',
      'Personalização Verso': '* Esse valor está incluso arte no frente e verso',
      'Silk (Verso)': '* Esse valor está incluso arte no frente e verso',
    };

    for (const budget of budgets) {
      const { quantidade, produtoId, adicionais = [], discount = 0 } = budget;
      const productPrice = await this.productPricesRepository.findPriceByQuantity(produtoId, quantidade);

      if (!productPrice) {
        throw new Error('Product price not found for the given quantity');
      }

      let totalPrice = productPrice.preco * quantidade;
      const productName = productPrice.product.nome;

      let additionalNames = '';
      let additionalTotalPrice = 0;
      const additionalObservations: string[] = [];

      for (const additionalId of adicionais) {
        const additionalPrice = await this.additionalPricesRepository.findPriceByQuantity(additionalId, quantidade);
        if (additionalPrice) {
          const additionalItemPrice = additionalPrice.preco * quantidade;
          additionalTotalPrice += additionalItemPrice;
          additionalNames += additionalNames ? ` + ${additionalPrice.additional.nome}` : additionalPrice.additional.nome;

          // Verificação de regras e adicionar observações
          const rule = additionalRules[additionalPrice.additional.nome];
          if (rule) {
            additionalObservations.push(rule);
          }
        }
      }

      totalPrice += additionalTotalPrice;

      // Aplicar o desconto
      const discountAmount = (totalPrice * discount) / 100;
      totalPrice -= discountAmount;

      let result = `${quantidade} unidades ${productName} + ${additionalNames} : R$ ${(totalPrice / quantidade).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} cada unidade - Total: R$ ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

     
      
      if (discount > 0) {
        result += ` (com desconto de ${discount}% aplicado)`;
      }

      if (additionalObservations.length > 0) {
        result += `\n\n*OBS:*\n- ${additionalObservations.join('\n- ')}`;
      }

      results.push(result);
      allProducts.push({ product: productPrice, quantity: quantidade });
      totalWeight += (productPrice.weight / 1000) * quantidade;
    }

    const bestBox = selectBestBoxForAll(allProducts);
    const bestBoxMessage = bestBox ? `A melhor caixa para este pedido é: ${bestBox.height}x${bestBox.width}x${bestBox.depth} com peso total de ${totalWeight.toFixed(2)} kg` : 'Nenhuma caixa disponível';

    return { results, bestBoxMessage };
  }
}

function calculateBoxCapacity(
  box: { height: number; width: number; depth: number },
  product: ProductPrice,
  quantity: number
): number {
  const boxVolume = box.height * box.width * box.depth;
  const productVolume = product.height * product.width * product.depth;

  let maxProductsByVolume = Math.floor(boxVolume / productVolume);

  if (product.stackable) {
    const effectiveHeight =
      product.height + (product.height * (product.stackingFactor - 1) * (quantity - 1)) / quantity;
    const stackedProducts = Math.floor(box.height / effectiveHeight);
    maxProductsByVolume = Math.min(
      maxProductsByVolume,
      stackedProducts * Math.floor(box.width / product.width) * Math.floor(box.depth / product.depth)
    );
  }

  if (product.pairing_height > 0 && product.pairing_width > 0 && product.pairing_depth > 0) {
    const pairedWidth = product.width * product.pairing_width;
    const pairedDepth = product.depth * product.pairing_depth;
    const pairedHeight = product.height + product.pairing_height;

    const pairedVolume = pairedWidth * pairedDepth * pairedHeight;
    maxProductsByVolume = Math.min(maxProductsByVolume, Math.floor(boxVolume / pairedVolume));
  }

  return maxProductsByVolume;
}


function selectBestBoxForAll(products: { product: ProductPrice; quantity: number }[]) {
  const boxes = [
    { height: 30, width: 30, depth: 30 },
    { height: 42, width: 42, depth: 33 },
    { height: 42, width: 42, depth: 62 },
    { height: 48, width: 40, depth: 40 }
  ];

  let bestBox = null;
  let bestBoxCapacity = 0;

  for (const box of boxes) {
    let boxCapacity = 0;
    for (const { product, quantity } of products) {
      boxCapacity += calculateBoxCapacity(box, product, quantity);
    }
    if (boxCapacity >= products.reduce((sum, item) => sum + item.quantity, 0) && (bestBox === null || boxCapacity < bestBoxCapacity)) {
      bestBox = box;
      bestBoxCapacity = boxCapacity;
    }
  }

  return bestBox;
}

export default CalculatePriceService;
