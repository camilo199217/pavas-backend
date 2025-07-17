import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  BadRequestError,
  NotFoundError,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { AppDataSource } from '../config/data-source';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { QueryFailedError } from 'typeorm';

@JsonController('/products')
export class ProductController {
  private productRepo = AppDataSource.getRepository(Product);
  private categoryRepo = AppDataSource.getRepository(Category);

  @Get()
  @OpenAPI({ summary: 'Listar todos los productos' })
  @ResponseSchema(Product, { isArray: true })
  async getAll() {
    return this.productRepo.find(); // category es eager
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Obtener un producto por ID' })
  @ResponseSchema(Product)
  async getOne(@Param('id') id: number) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundError('Producto no encontrado');
    return product;
  }

  @Post()
  @HttpCode(201)
  @OpenAPI({ summary: 'Crear un nuevo producto' })
  @ResponseSchema(Product)
  async create(@Body() body: CreateProductDto) {
    // Creamos solo la referencia a la categoría con el ID proporcionado
    const category = new Category();
    category.id = body.categoryId;

    const product = this.productRepo.create({
      name: body.name,
      description: body.description,
      category, // no se busca la categoría, solo se referencia
    });

    try {
      return await this.productRepo.save(product);
    } catch (error) {
      const err: any = error;

      if (error instanceof QueryFailedError) {
        const code = err.code || err.driverError?.code;

        if (code === 'ER_NO_REFERENCED_ROW_2') {
          throw new BadRequestError('La categoría especificada no existe.');
        }

        if (code === 'ER_DUP_ENTRY' || code === '23505') {
          throw new BadRequestError('Ya existe un producto con ese nombre en esta categoría.');
        }
      }

      throw new Error('Error interno al crear el producto.');
    }
  }

  @Put('/:id')
  @HttpCode(200)
  @OpenAPI({ summary: 'Actualizar un producto por ID' })
  @ResponseSchema(Product)
  async update(@Param('id') id: number, @Body() body: CreateProductDto) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundError('Producto no encontrado');

    const category = await this.categoryRepo.findOneBy({ id: body.categoryId });
    if (!category) throw new BadRequestError('Categoría no encontrada');

    product.name = body.name;
    product.description = body.description;
    product.category = category;

    try {
      return await this.productRepo.save(product);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const err: any = error;

        if (err.code === 'ER_DUP_ENTRY') {
          throw new BadRequestError('Ya existe un producto con ese nombre en esta categoría.');
        }
      }

      throw error;
    }
  }

  @Delete('/:id')
  @HttpCode(204)
  @OpenAPI({ summary: 'Eliminar un producto por ID' })
  async delete(@Param('id') id: number) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundError('Producto no encontrado');

    await this.productRepo.remove(product);
    return;
  }
}
