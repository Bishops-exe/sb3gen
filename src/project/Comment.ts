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

  @Expose({name: "minimized"})
  @IsBoolean()
  private isMinimized: boolean = false;

  @Expose()
  @IsString()
  text: string = '';

  constructor(text: string = '') {
    this.text = text;
  }

  setBlock(id: string): this {
    this.blockId = id;
    return this;
  }

  setXY(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  setSize(width: number, height: number): this {
    this.width = width;
    this.height = height;
    return this;
  }

  setMinimized(minimized: boolean): this {
    this.isMinimized = minimized;
    return this;
  }
}
