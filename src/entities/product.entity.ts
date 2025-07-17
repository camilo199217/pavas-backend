import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Category } from './category.entity';
import { Type } from 'class-transformer';

@Entity({ name: 'products' })
@Unique('UQ_product_name_category', ['name', 'category'])
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('text', { nullable: true })
  description?: string;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
    eager: true,
  })
  @Type(() => Category)
  category!: Category;
}
