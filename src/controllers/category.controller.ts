import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  NotFoundError,
  BadRequestError,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { AppDataSource } from '../config/data-source';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { QueryFailedError } from 'typeorm';

@JsonController('/categories')
export class CategoryController {
  private categoryRepo = AppDataSource.getRepository(Category);

  @Get()
  @OpenAPI({ summary: 'Listar todas las categorías' })
  async getAll() {
    return await this.categoryRepo.find();
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Obtener categoría por ID' })
  @ResponseSchema(Category)
  async getOne(@Param('id') id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
    });

    if (!category) throw new NotFoundError('Categoría no encontrada');
    return category;
  }

  @Post()
  @HttpCode(201)
  @OpenAPI({ summary: 'Crear nueva categoría (nombre único)' })
  @ResponseSchema(Category)
  async create(@Body() body: CreateCategoryDto) {
    const category = this.categoryRepo.create(body);

    try {
      return await this.categoryRepo.save(category);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const err: any = error;
        const code = err.code || err.driverError?.code;

        if (
          code === 'ER_DUP_ENTRY' || // MySQL
          code === '23505' || // PostgreSQL
          code === 'SQLITE_CONSTRAINT' // SQLite
        ) {
          throw new BadRequestError(`Ya existe una categoría con ese nombre.`);
        }
      }

      // ⛔️ Si el error no se reconoce, lánzalo como error interno
      console.error('Error inesperado al guardar categoría:', error);
      throw new Error('Error interno al guardar la categoría.');
    }
  }

  @Put('/:id')
  @HttpCode(200)
  @OpenAPI({ summary: 'Actualizar una categoría' })
  @ResponseSchema(Category)
  async update(@Param('id') id: number, @Body() body: CreateCategoryDto) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundError('Categoría no encontrada');

    category.name = body.name;

    try {
      return await this.categoryRepo.save(category);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const err: any = error;
        if (
          err.code === 'ER_DUP_ENTRY' ||
          err.code === '23505' ||
          err.code === 'SQLITE_CONSTRAINT'
        ) {
          throw new BadRequestError(`Ya existe una categoría con ese nombre.`);
        }
      }

      throw error;
    }
  }

  @Delete('/:id')
  @HttpCode(204)
  @OpenAPI({ summary: 'Eliminar una categoría por ID' })
  async delete(@Param('id') id: number) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundError('Categoría no encontrada');

    await this.categoryRepo.remove(category);
    return;
  }
}
