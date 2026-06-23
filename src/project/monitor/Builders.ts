import { ListMonitorClass, ScalarMonitorClass, ScalarMonitorMode, ScalarMonitorOpcode, VariableValue } from './Monitor';
import { Sprite } from '../Target';
import type { VarInputVal, ListInputVal } from '../block/InputVal';

export enum NumberName {
  Number = 'number',
  Name = 'name',
}

export enum CurrentMenu {
  Year = 'YEAR',
  Month = 'MONTH',
  Date = 'DATE',
  DayOfWeek = 'DAYOFWEEK',
  Hour = 'HOUR',
  Minute = 'MINUTE',
  Second = 'SECOND',
}

export interface ScalarMonitorOpts {
  spriteName?: Sprite | string | null;
  mode?: ScalarMonitorMode;
  value?: VariableValue;
  x?: number;
  y?: number;
  visible?: boolean;
  width?: number;
  height?: number;
  sliderMin?: number;
  sliderMax?: number;
  isDiscrete?: boolean;
}

export interface ListMonitorOpts {
  spriteName?: Sprite | string | null;
  value?: VariableValue[];
  x?: number;
  y?: number;
  visible?: boolean;
  width?: number;
  height?: number;
}

function resolveSpriteName(s: Sprite | string | null | undefined): string | null {
  if (s == null) return null;
  return typeof s === 'string' ? s : s.name;
}

function buildScalar(id: string, opcode: ScalarMonitorOpcode, params: Record<string, string> = {}, opts: ScalarMonitorOpts = {}): ScalarMonitorClass {
  const m = new ScalarMonitorClass();
  m.id = id;
  m.mode = opts.mode ?? ScalarMonitorMode.default;
  m.opcode = opcode;
  m.params = params;
  m.sprite = opts.spriteName ?? null;
  m.value = opts.value ?? 0;
  m.width = opts.width ?? 0;
  m.height = opts.height ?? 0;
  m.x = opts.x ?? 0;
  m.y = opts.y ?? 0;
  m.visible = opts.visible ?? true;
  m.sliderMin = opts.sliderMin ?? 0;
  m.sliderMax = opts.sliderMax ?? 100;
  m.isDiscrete = opts.isDiscrete ?? true;
  return m;
}

// ── Motion ────────────────────────────────────────────────────────────────────

export function XPosition(id: string, opts?: ScalarMonitorOpts): ScalarMonitorClass {
  return buildScalar(id, ScalarMonitorOpcode.motionXposition, {}, opts);
}

export function YPosition(id: string, opts?: ScalarMonitorOpts): ScalarMonitorClass {
  return buildScalar(id, ScalarMonitorOpcode.motionYposition, {}, opts);
}

export function Direction(id: string, opts?: ScalarMonitorOpts): ScalarMonitorClass {
  return buildScalar(id, ScalarMonitorOpcode.motionDirection, {}, opts);
}

// ── Looks ─────────────────────────────────────────────────────────────────────

export function CostumeNumberName(id: string, numberName: NumberName, opts?: ScalarMonitorOpts): ScalarMonitorClass {
  return buildScalar(id, ScalarMonitorOpcode.looksCostumenumbername, { NUMBER_NAME: numberName }, opts);
}

export function BackdropNumberName(id: string, numberName: NumberName, opts?: ScalarMonitorOpts): ScalarMonitorClass {
  return buildScalar(id, ScalarMonitorOpcode.looksBackdropnumbername, { NUMBER_NAME: numberName }, opts);
}

export function Size(id: string, opts?: ScalarMonitorOpts): ScalarMonitorClass {
  return buildScalar(id, ScalarMonitorOpcode.looksSize, {}, opts);
}

// ── Sound ─────────────────────────────────────────────────────────────────────

export function Volume(id: string, opts?: ScalarMonitorOpts): ScalarMonitorClass {
  return buildScalar(id, ScalarMonitorOpcode.soundVolume, {}, opts);
}

// ── Sensing ───────────────────────────────────────────────────────────────────

export function Answer(id: string, opts?: ScalarMonitorOpts): ScalarMonitorClass {
  return buildScalar(id, ScalarMonitorOpcode.sensingAnswer, {}, opts);
}

export function Loudness(id: string, opts?: ScalarMonitorOpts): ScalarMonitorClass {
  return buildScalar(id, ScalarMonitorOpcode.sensingLoudness, {}, opts);
}

export function Timer(id: string, opts?: ScalarMonitorOpts): ScalarMonitorClass {
  return buildScalar(id, ScalarMonitorOpcode.sensingTimer, {}, opts);
}

export function Online(id: string, opts?: ScalarMonitorOpts): ScalarMonitorClass {
  return buildScalar(id, ScalarMonitorOpcode.sensingOnline, {}, opts);
}

export function Username(id: string, opts?: ScalarMonitorOpts): ScalarMonitorClass {
  return buildScalar(id, ScalarMonitorOpcode.sensingUsername, {}, opts);
}

export function Current(id: string, currentMenu: CurrentMenu, opts?: ScalarMonitorOpts): ScalarMonitorClass {
  return buildScalar(id, ScalarMonitorOpcode.sensingCurrent, { CURRENTMENU: currentMenu }, opts);
}

// ── Data ──────────────────────────────────────────────────────────────────────

export function Variable(variable: VarInputVal, opts?: ScalarMonitorOpts): ScalarMonitorClass {
  return buildScalar(variable.id, ScalarMonitorOpcode.dataVariable, { VARIABLE: variable.name }, opts);
}

export function ListContents(list: ListInputVal, opts?: ListMonitorOpts): ListMonitorClass {
  const m = new ListMonitorClass();
  m.id = list.id;
  m.params = { LIST: list.name };
  m.spriteName = resolveSpriteName(opts?.spriteName);
  m.value = opts?.value ?? [];
  m.width = opts?.width ?? 0;
  m.height = opts?.height ?? 0;
  m.x = opts?.x ?? 0;
  m.y = opts?.y ?? 0;
  m.visible = opts?.visible ?? true;
  return m;
}