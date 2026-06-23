import { Expose, Transform, Type, instanceToPlain, plainToInstance } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Block, BlocksMap, Script, serializeBlocksRecord, deserializeBlocksRecord } from './block/Block';
import { VarInputVal, ListInputVal, BroadcastInputVal } from './block/InputVal';
import Costume from './asset/Costume';
import Sound from './asset/Sound';
import Comment from './Comment';
import { VariableInfo, VariableValue } from './data/VariableValue';
import {PartialFieldsOf} from "../Types";
import {getUniqueId} from "../Utils";

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
  @Transform(({ value }) => serializeBlocksRecord((value as BlocksMap).toRecord()), { toPlainOnly: true })
  @Transform(({ value }) => {
    const bm = new BlocksMap();
    for (const [id, block] of Object.entries(deserializeBlocksRecord(value ?? {}))) {
      bm.addBlock(id, block);
    }
    return bm;
  }, { toClassOnly: true })
  blocks: BlocksMap = new BlocksMap();

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

  addScript(builder: (s: Script) => void): this {
    const script = new Script();
    builder(script);
    this.blocks.addScript(script);
    return this;
  }

  addVariable(name: string, initialValue: VariableValue = 0): VarInputVal {
    const id = getUniqueId();
    this.variables[id] = [name, initialValue];
    return { kind: 'var', name, id };
  }

  addList(name: string, initialValues: VariableValue[] = []): ListInputVal {
    const id = getUniqueId();
    this.lists[id] = [name, initialValues];
    return { kind: 'list', name, id };
  }

  addBroadcast(name: string): BroadcastInputVal {
    const id = getUniqueId();
    this.broadcasts[id] = name;
    return { kind: 'broadcast', name, id };
  }
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
