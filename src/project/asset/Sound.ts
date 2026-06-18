import 'reflect-metadata';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import SparkMD5 from "spark-md5";

export default class Sound {
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
  rate: number;

  @Expose()
  @IsNumber()
  sampleCount: number;

  data?: Uint8Array;

  constructor(
    name: string,
    data?: Uint8Array
  ) {
    this.name = name;
    if (!data) return;
    this.data = data;
    this.assetId = SparkMD5.ArrayBuffer.hash(data.buffer as ArrayBuffer);
    this.dataFormat = Sound.detectFormat(data);
    this.md5ext = `${this.assetId}.${this.dataFormat}`;
  }

  private static detectFormat(data: Uint8Array): string {

    if (data.length >= 12 &&
        data[0] === 0x52 && data[1] === 0x49 && data[2] === 0x46 && data[3] === 0x46 &&
        data[8] === 0x57 && data[9] === 0x41 && data[10] === 0x56 && data[11] === 0x45) {
      return 'audio/wav';
    }
    if (data.length >= 3 && data[0] === 0x49 && data[1] === 0x44 && data[2] === 0x33) {
      return 'audio/mpeg';
    }
    if (data.length >= 2 && data[0] === 0xFF && (data[1] === 0xFB || data[1] === 0xF3 || data[1] === 0xFA)) {
      return 'audio/mpeg';
    }
    throw new Error('Unrecognized sound format');
  }
}
