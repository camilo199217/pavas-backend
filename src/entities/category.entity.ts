import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Product } from './product.entity';
import { Expose, Type } from 'class-transformer';

@Entity()
@Unique('UQ_category_name_unique', ['name'])
export class Category {
  @PrimaryGeneratedColumn()
  @Expose()
  id!: number;

  @Column({ unique: true })
  @Expose()
  name!: string;

  @OneToMany(() => Product, (product) => product.category)
  @Expose()
  @Type(() => Product)
  products?: Product[];
}
