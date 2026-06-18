import 'reflect-metadata';
import {Expose, Transform, instanceToPlain, plainToInstance} from 'class-transformer';
import {IsBoolean, IsNumber, IsOptional, IsString} from 'class-validator';
import {InputVal, serializeInputVal, deserializeInputVal} from './InputVal';
import Comment from '../Comment';
import {getUniqueId} from '../../Utils';

export interface Input {
  mode: number;
  primary: InputVal;
  obscured?: string;
}

export interface Field {
  value: string;
  id: string | null;
}

export namespace Input {
  export function value(v: InputVal, mode = 1): Input {
    return {mode, primary: v};
  }

  export function shadow(blockId: string, shadowId: string): Input {
    return {mode: 3, primary: InputVal.block(blockId), obscured: shadowId};
  }
}

export namespace Field {
  export function of(value: string, id: string | null = null): Field {
    return {value, id};
  }
}

function serializeInputs(inputs: Record<string, Input>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, inp] of Object.entries(inputs)) {
    const arr: unknown[] = [inp.mode, serializeInputVal(inp.primary)];
    if (inp.obscured !== undefined) arr.push(inp.obscured);
    out[k] = arr;
  }
  return out;
}

function deserializeInputs(raw: Record<string, unknown>): Record<string, Input> {
  const out: Record<string, Input> = {};
  for (const [k, v] of Object.entries(raw)) {
    const arr = v as [number, unknown, string?];
    out[k] = {mode: arr[0], primary: deserializeInputVal(arr[1]), obscured: arr[2]};
  }
  return out;
}

function serializeFields(fields: Record<string, Field>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, f] of Object.entries(fields)) {
    out[k] = [f.value, f.id];
  }
  return out;
}

function deserializeFields(raw: Record<string, unknown>): Record<string, Field> {
  const out: Record<string, Field> = {};
  for (const [k, v] of Object.entries(raw)) {
    const arr = v as [string, string | null];
    out[k] = {value: arr[0], id: arr[1]};
  }
  return out;
}

export class Block {
  @Expose()
  @IsString()
  opcode: string = '';

  @Expose()
  @IsOptional()
  @IsString()
  next: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  parent: string | null = null;

  @Expose()
  @Transform(({value}) => serializeInputs(value ?? {}), {toPlainOnly: true})
  @Transform(({value}) => deserializeInputs(value ?? {}), {toClassOnly: true})
  inputs: Record<string, Input> = {};

  @Expose()
  @Transform(({value}) => serializeFields(value ?? {}), {toPlainOnly: true})
  @Transform(({value}) => deserializeFields(value ?? {}), {toClassOnly: true})
  fields: Record<string, Field> = {};

  @Expose()
  @IsBoolean()
  shadow: boolean = false;

  @Expose()
  @IsBoolean()
  topLevel: boolean = false;

  @Expose()
  @IsOptional()
  @IsNumber()
  x?: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  y?: number;

  @Expose()
  @IsOptional()
  mutation?: unknown;

  @Expose()
  @IsOptional()
  @IsString()
  comment?: string;

  constructor(opcode: string = '') {
    this.opcode = opcode;
  }

  withInput(name: string, val: InputVal, mode = 1): this {
    this.inputs[name] = Input.value(val, mode);
    return this;
  }

  withInputSlot(name: string, input: Input): this {
    this.inputs[name] = input;
    return this;
  }

  withField(name: string, value: string, id: string | null = null): this {
    this.fields[name] = Field.of(value, id);
    return this;
  }

  withMutation(mutation: unknown): this {
    this.mutation = mutation;
    return this;
  }

  withComment(commentId: string): this {
    this.comment = commentId;
    return this;
  }

  static create(opcode: string): Block {
    return new Block(opcode);
  }

  static shadow(opcode: string): Block {
    const b = new Block(opcode);
    b.shadow = true;
    return b;
  }
}

export class Script {
  private _blocks: Map<string, Block> = new Map();
  readonly comments: Map<string, Comment> = new Map();
  private tip: string | null = null;
  x = 0;
  y = 0;

  get blocks(): ReadonlyMap<string, Block> {
    return this._blocks;
  }


  xy(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  genId(): string {
    return getUniqueId();
  }

  push(block: Block): string {
    const id = this.genId();
    this.insertChained(id, block);
    return id;
  }

  pushCommented(block: Block, text: string): string {
    const blockId = this.genId();
    const commentId = this.genId();
    block.comment = commentId;
    this.insertChained(blockId, block);
    const c = new Comment(text);
    c.blockId = blockId;
    this.comments.set(commentId, c);
    return blockId;
  }

  insert(id: string, block: Block): string {
    block.topLevel = false;
    this._blocks.set(id, block);
    return id;
  }

  pushShadow(parentId: string, block: Block): string {
    const id = this.genId();
    block.parent = parentId;
    block.shadow = true;
    block.topLevel = false;
    this._blocks.set(id, block);
    return id;
  }

  private insertChained(id: string, block: Block): void {
    if (this.tip === null) {
      block.topLevel = true;
      block.y = this.y;
      block.x = this.x;
    } else {
      this._blocks.get(this.tip)!.next = id;
      block.parent = this.tip;
      block.topLevel = false;
    }
    this.tip = id;
    this._blocks.set(id, block);
  }

  toRecord(): Record<string, Block> {
    const out: Record<string, Block> = {};
    for (const [k, v] of this._blocks) out[k] = v;
    return out;
  }
}

export class BlocksMap {
  private _scripts: Script[] = [];
  private _orphans: Map<string, Block> = new Map();
  readonly comments: Map<string, Comment> = new Map();

  get scripts(): readonly Script[] {
    return this._scripts;
  }

  get orphans(): ReadonlyMap<string, Block> {
    return this._orphans;
  }

  addScript(script: Script): this {
    for (const [k, v] of script.comments) this.comments.set(k, v);
    this._scripts.push(script);
    return this;
  }

  addBlock(id: string, block: Block): this {
    this._orphans.set(id, block);
    return this;
  }

  toRecord(): Record<string, Block> {
    const out: Record<string, Block> = {};
    for (const s of this._scripts) {
      for (const [k, v] of Object.entries(s.toRecord())) out[k] = v;
    }
    for (const [k, v] of this._orphans) out[k] = v;
    return out;
  }
}

export function serializeBlocksRecord(blocks: Record<string, Block>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(blocks)) {
    out[k] = instanceToPlain(v, {excludeExtraneousValues: true});
  }
  return out;
}

function compactArrayToBlock(arr: unknown[]): Block | null {
  const type = arr[0] as number;
  const b = new Block();
  b.shadow = false;
  b.inputs = {};
  b.fields = {};
  const hasPos = arr.length >= 5;
  b.topLevel = hasPos;
  if (hasPos) { b.x = arr[arr.length - 2] as number; b.y = arr[arr.length - 1] as number; }

  if (type === 12) {
    b.opcode = 'data_variable';
    b.fields['VARIABLE'] = Field.of(arr[1] as string, arr[2] as string);
  } else if (type === 13) {
    b.opcode = 'data_listcontents';
    b.fields['LIST'] = Field.of(arr[1] as string, arr[2] as string);
  } else if (type === 11) {
    b.opcode = 'event_broadcast_menu';
    b.fields['BROADCAST_OPTION'] = Field.of(arr[1] as string, arr[2] as string);
  } else {
    return null;
  }
  return b;
}

export function deserializeBlocksRecord(raw: Record<string, unknown>): Record<string, Block> {
  const out: Record<string, Block> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (Array.isArray(v)) {
      const b = compactArrayToBlock(v);
      if (b) out[k] = b;
      continue;
    }
    out[k] = plainToInstance(Block, v as object, {excludeExtraneousValues: true});
  }
  return out;
}
