import 'reflect-metadata';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import SparkMD5 from 'spark-md5';

export default class Costume {
  @Expose()
  @IsString()
  assetId: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  md5ext: string;

  @Expose()
  @IsString()
  dataFormat: string;

  @Expose()
  @IsNumber()
  bitmapResolution: number;

  @Expose()
  @IsNumber()
  rotationCenterX: number;

  @Expose()
  @IsNumber()
  rotationCenterY: number;

  data?: Uint8Array;

  constructor(name: string, data?: Uint8Array) {
    this.name = name;
    if (!data) return;
    this.data = data;
    this.assetId = SparkMD5.ArrayBuffer.hash(data.buffer as ArrayBuffer);
    this.dataFormat = Costume.detectFormat(data);
    this.bitmapResolution = this.dataFormat === 'svg' ? 1 : 2;
    this.md5ext = `${this.assetId}.${this.dataFormat}`;
  }

  private static detectFormat(data: Uint8Array): string {
    // PNG: 89 50 4E 47
    if (data.length >= 4 && data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4E && data[3] === 0x47)
      return 'png';
    // JPG: FF D8 FF
    if (data.length >= 3 && data[0] === 0xFF && data[1] === 0xD8 && data[2] === 0xFF)
      return 'jpg';
    // SVG: text-based, look for <svg or <?xml
    const head = new TextDecoder().decode(data.slice(0, 128));
    if (head.includes('<svg') || head.includes('<?xml'))
      return 'svg';
    throw new Error('Unrecognized image format');
  }
}
