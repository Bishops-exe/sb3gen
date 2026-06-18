import 'reflect-metadata';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export default class Comment {
  @Expose()
  @IsOptional()
  @IsString()
  blockId: string | null = null;

  @Expose()
  @IsOptional()
  @IsNumber()
  x: number | null = null;

  @Expose()
  @IsOptional()
  @IsNumber()
  y: number | null = null;

  @Expose()
  @IsNumber()
  width: number = 200;

  @Expose()
  @IsNumber()
  height: number = 200;

  @Expose()
  @IsBoolean()
  minimized: boolean = false;

  @Expose()
  @IsString()
  text: string = '';

  constructor(text: string = '') {
    this.text = text;
  }

  withBlock(id: string): this {
    this.blockId = id;
    return this;
  }

  withXY(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  withSize(width: number, height: number): this {
    this.width = width;
    this.height = height;
    return this;
  }

  withMinimized(minimized: boolean): this {
    this.minimized = minimized;
    return this;
  }
}
