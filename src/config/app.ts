export const routingControllersOptions = {
  routePrefix: '/api',
  controllers: [__dirname + '/../controllers/*.controller.{ts,js}'],
  middlewares: [__dirname + '/../middlewares/*.middleware.{ts,js}'],
  validation: true,
};
