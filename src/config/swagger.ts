import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { CategoryController } from 'src/controllers/category.controller';
import { ProductController } from 'src/controllers/product.controller';

export const swaggerSpec = routingControllersToSpec(
  getMetadataArgsStorage(),
  {
    controllers: [CategoryController, ProductController],
    routePrefix: '/api',
  },
  {
    info: {
      title: 'Pavas API',
      version: '1.0.0',
    },
  },
);
