import {Expose} from 'class-transformer';
import {IsNumber, IsString} from 'class-validator';
import SparkMD5 from 'spark-md5';

export default class Costume {
  @Expose()
  @IsString()
  name: string;

  data: Uint8Array;


  @Expose()
  get assetId(): string {
    return SparkMD5.ArrayBuffer.hash(this.data.buffer as ArrayBuffer);
  }

  @Expose()
  get md5ext(): string {
    return `${this.assetId}.${this.dataFormat}`
  }

  @Expose()
  get dataFormat(): string {
    return Costume.detectFormat(this.data);
  }

  @Expose()
  get bitmapResolution(): number {
    return this.dataFormat === 'svg' ? 1 : 2;
  }

  constructor(name: string, data: Uint8Array | string) {
    this.name = name;
    this.data = (typeof data === "string" ? new TextEncoder().encode(data) : data)
  }

  static blank(name: string, width = 480, height = 360): Costume {
    return new Costume(name, `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
        <rect width="${width}" height="${height}" fill="white"/>
      </svg>
    `);
  }

  static colored(name: string, color: string, width = 480, height = 360): Costume {
    return new Costume(name, `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
        <rect width="${width}" height="${height}" fill="${color}"/>
      </svg>
    `);
  }

  static circle(name: string, color: string, radius = 40): Costume {
    const diameter = radius * 2;

    return new Costume(name, `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${diameter} ${diameter}">
        <circle cx="${radius}" cy="${radius}" r="${radius - 2}" fill="${color}"/>
       </svg>
    `);
  }

  static rect(name: string, color: string, width = 80, height = 80, rx = 0): Costume {
    return new Costume(name, `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
        <rect width="${width}" height="${height}"${rx ? ` rx="${rx}"` : ''} fill="${color}"/>
       </svg>
    `);
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