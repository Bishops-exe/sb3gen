import {Expose, Transform} from 'class-transformer';
import {IsBoolean, IsEnum, IsNumber, IsObject, IsOptional, IsString} from 'class-validator';
import {Sprite} from "../Target";

export type VariableValue = string | number | boolean;

export enum ScalarMonitorMode {
  default = 'default',
  large = 'large',
  slider = 'slider',
}

export enum ScalarMonitorOpcode {
  dataVariable = 'data_variable',
  motionXposition = 'motion_xposition',
  motionYposition = 'motion_yposition',
  motionDirection = 'motion_direction',
  looksCostumenumbername = 'looks_costumenumbername',
  looksBackdropnumbername = 'looks_backdropnumbername',
  looksSize = 'looks_size',
  soundVolume = 'sound_volume',
  sensingAnswer = 'sensing_answer',
  sensingLoudness = 'sensing_loudness',
  sensingTimer = 'sensing_timer',
  sensingOnline = 'sensing_online',
  sensingUsername = 'sensing_username',
  sensingCurrent = 'sensing_current',
}

export type ListMonitorMode = 'list';
export type ListMonitorOpcode = 'data_listcontents';

export class ScalarMonitorClass {
  @Expose()
  @IsString()
  id: string = '';

  @Expose()
  @IsEnum(ScalarMonitorMode)
  mode: ScalarMonitorMode = ScalarMonitorMode.default;

  @Expose()
  @IsEnum(ScalarMonitorOpcode)
  opcode: ScalarMonitorOpcode = ScalarMonitorOpcode.dataVariable;

  @Expose()
  @IsObject()
  params: Record<string, string> = {};

  @Expose({name: "spriteName"})
  @IsOptional()
  @IsString()
  @Transform(({value}) => value == null ? null : typeof value === 'string' ? value : (value as Sprite).name, {toPlainOnly: true})
  sprite: Sprite | string | null = null;

  @Expose()
  value: VariableValue = 0;

  @Expose()
  @IsNumber()
  width: number = 0;

  @Expose()
  @IsNumber()
  height: number = 0;

  @Expose()
  @IsNumber()
  x: number = 0;

  @Expose()
  @IsNumber()
  y: number = 0;

  @Expose()
  @IsBoolean()
  visible: boolean = true;

  @Expose()
  @IsNumber()
  sliderMin: number = 0;

  @Expose()
  @IsNumber()
  sliderMax: number = 100;

  @Expose()
  @IsBoolean()
  isDiscrete: boolean = true;

}

export class ListMonitorClass {
  @Expose()
  @IsString()
  id: string = '';

  @Expose()
  get mode(): ListMonitorMode {
    return 'list'
  };

  @Expose()
  get opcode(): ListMonitorOpcode {
    return 'data_listcontents'
  };

  @Expose()
  @IsObject()
  params: Record<string, string> = {};

  @Expose()
  @IsOptional()
  @IsString() spriteName: string | null = null;

  @Expose()
  @IsNumber()
  width: number = 0;

  @Expose()
  @IsNumber()
  height: number = 0;

  @Expose()
  @IsNumber()
  x: number = 0;

  @Expose()
  @IsNumber()
  y: number = 0;

  @Expose()
  @IsBoolean()
  visible: boolean = true;

  @Expose()
  value: VariableValue[] = [];
}

export type Monitor = ScalarMonitorClass | ListMonitorClass;
