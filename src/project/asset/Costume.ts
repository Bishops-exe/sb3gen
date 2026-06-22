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

  static blank(name: string, width = 480, height = 360): Costume {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="white"/></svg>`;
    return new Costume(name, new TextEncoder().encode(svg));
  }

  static colored(name: string, color: string, width = 480, height = 360): Costume {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="${color}"/></svg>`;
    return new Costume(name, new TextEncoder().encode(svg));
  }

  static circle(name: string, color: string, size = 80): Costume {
    const r = size / 2;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><circle cx="${r}" cy="${r}" r="${r - 2}" fill="${color}"/></svg>`;
    return new Costume(name, new TextEncoder().encode(svg));
  }

  static rect(name: string, color: string, width = 80, height = 80, rx = 0): Costume {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}"${rx ? ` rx="${rx}"` : ''} fill="${color}"/></svg>`;
    return new Costume(name, new TextEncoder().encode(svg));
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
