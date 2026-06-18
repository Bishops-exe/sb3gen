import 'reflect-metadata';
import { Expose, Transform, Type, instanceToPlain, plainToInstance } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Block, serializeBlocksRecord, deserializeBlocksRecord } from './block/Block';
import Costume from './asset/Costume';
import Sound from './asset/Sound';
import Comment from './Comment';
import { VariableInfo, VariableValue } from './data/VariableValue';
import {PartialFieldsOf} from "../Types";

export enum RotationStyle {
  AllRound = 'all around',
  LeftRight = 'left-right',
  DontRotate = "don't rotate",
}

export enum VideoState {
  Off = 'off',
  On = 'on',
  OnFlipped = 'on-flipped',
}

class BaseTarget {
  @Expose()
  @IsString()
  name: string = '';

  @Expose()
  variables: Record<string, VariableInfo> = {};

  @Expose()
  lists: Record<string, [string, VariableValue[]]> = {};

  @Expose()
  broadcasts: Record<string, string> = {};

  @Expose()
  @Transform(({ value }) => serializeBlocksRecord(value ?? {}), { toPlainOnly: true })
  @Transform(({ value }) => deserializeBlocksRecord(value ?? {}), { toClassOnly: true })
  blocks: Record<string, Block> = {};

  @Expose()
  @Transform(({ value }) => {
    if (!value) return {};
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, Comment>)) {
      out[k] = instanceToPlain(v, { excludeExtraneousValues: true });
    }
    return out;
  }, { toPlainOnly: true })
  @Transform(({ value }) => {
    if (!value) return {};
    const out: Record<string, Comment> = {};
    for (const [k, v] of Object.entries(value as Record<string, object>)) {
      out[k] = plainToInstance(Comment, v, { excludeExtraneousValues: true });
    }
    return out;
  }, { toClassOnly: true })
  comments: Record<string, Comment> = {};

  @Expose()
  @IsNumber()
  currentCostume: number = 0;

  @Expose()
  @Type(() => Costume)
  @ValidateNested({ each: true })
  costumes: Costume[] = [];

  @Expose()
  @Type(() => Sound)
  @ValidateNested({ each: true })
  sounds: Sound[] = [];

  @Expose()
  @IsNumber()
  volume: number = 100;
}

export class Stage extends BaseTarget {
  @Expose()
  readonly isStage = true as const;

  @Expose()
  @IsNumber()
  layerOrder: number = 0;

  @Expose()
  @IsNumber()
  tempo: number = 60;

  @Expose()
  @IsEnum(VideoState)
  videoState: VideoState = VideoState.Off;

  @Expose()
  @IsNumber()
  videoTransparency: number = 0;

  @Expose()
  @IsOptional()
  @IsString()
  textToSpeechLanguage: string | null = null;

  constructor() {
    super();
    this.name = 'Stage';
  }
}

export class Sprite extends BaseTarget {
  @Expose()
  readonly isStage = false as const;

  @Expose()
  @IsNumber()
  layerOrder: number = 1;

  @Expose()
  @IsBoolean()
  visible: boolean = true;

  @Expose()
  @IsNumber()
  x: number = 0;

  @Expose()
  @IsNumber()
  y: number = 0;

  @Expose()
  @IsNumber()
  size: number = 100;

  @Expose()
  @IsNumber()
  direction: number = 90;

  @Expose()
  @IsBoolean()
  draggable: boolean = false;

  @Expose()
  @IsEnum(RotationStyle)
  rotationStyle: RotationStyle = RotationStyle.AllRound;

  constructor(name: string) {
    super();

    this.name = name;
  }
}

export type Target = Stage | Sprite;
