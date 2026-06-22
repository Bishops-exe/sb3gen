import 'reflect-metadata';
export { default as Zipper } from './builder/Zipper';

export { default as Project } from './project/Project';
export { default as Meta } from './project/Meta';
export { default as Extension } from './project/Extensions';
export { Stage, Sprite, RotationStyle, VideoState } from './project/Target';
export type { Target } from './project/Target';
export { default as Comment } from './project/Comment';
export { default as Costume } from './project/asset/Costume';
export { default as Sound } from './project/asset/Sound';
export { Block, Script, BlocksMap, Input, Field } from './project/block/Block';
export type { CompoundBlock } from './project/block/Block';
export type { VariableValue, VariableInfo } from './project/data/VariableValue';
export { InputVal, serializeInputVal, deserializeInputVal } from './project/block/InputVal';
export type { Val, NumVal, VarParam, ListParam, BroadcastParam, VarInputVal, ListInputVal, BroadcastInputVal } from './project/block/InputVal';
export * from './project/blocks/Blocks';
export {
  ScalarMonitorClass,
  ListMonitorClass,
  ScalarMonitorMode,
  ScalarMonitorOpcode,
} from './project/monitor/Monitor';
export type { Monitor } from './project/monitor/Monitor';
export { default as ScalarBuilder } from './project/monitor/ScalarBuilder';
export * as monitors from './project/monitor/Builders';
export { NumberName, CurrentMenu, ListContents, Variable } from './project/monitor/Builders';

export * as pen from './project/extensions/pen';
export * as music from './project/extensions/music';
export * as wedo2 from './project/extensions/wedo2';
export * as boost from './project/extensions/boost';
export * as ev3 from './project/extensions/ev3';
export * as gdxfor from './project/extensions/gdxfor';
export * as makeymakey from './project/extensions/makeymakey';
export * as microbit from './project/extensions/microbit';
export * as translate from './project/extensions/translate';
export * as text2speech from './project/extensions/text2speech';
export * as videoSensing from './project/extensions/video_sensing';
export * as faceSensing from './project/extensions/face_sensing';
