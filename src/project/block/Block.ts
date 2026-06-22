import 'reflect-metadata';
import {Expose, Transform, instanceToPlain, plainToInstance} from 'class-transformer';
import {IsBoolean, IsNumber, IsOptional, IsString} from 'class-validator';
import {InputVal, Val, VarInputVal, ListInputVal, varName, listName, serializeInputVal, deserializeInputVal} from './InputVal';
import Comment from '../Comment';
import {getUniqueId} from '../../Utils';

export interface Input {
  mode: number;
  primary: InputVal;
  obscured?: string | InputVal;
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
    if (inp.obscured !== undefined) {
      arr.push(typeof inp.obscured === 'string' ? inp.obscured : serializeInputVal(inp.obscured));
    }
    out[k] = arr;
  }
  return out;
}

function deserializeInputs(raw: Record<string, unknown>): Record<string, Input> {
  const out: Record<string, Input> = {};
  for (const [k, v] of Object.entries(raw)) {
    const arr = v as [number, unknown, unknown?];
    const raw3 = arr[2];
    const obscured = raw3 === undefined ? undefined
      : typeof raw3 === 'string' ? raw3
      : deserializeInputVal(raw3);
    out[k] = {mode: arr[0], primary: deserializeInputVal(arr[1]), obscured};
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

export interface CompoundBlock {
  main: Block;
  slots: Array<{inputName: string; block: Block}>;
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
  @Transform(({ value, obj }) => (obj as Block).topLevel ? value : undefined, { toPlainOnly: true })
  @IsOptional()
  @IsNumber()
  x?: number;

  @Expose()
  @Transform(({ value, obj }) => (obj as Block).topLevel ? value : undefined, { toPlainOnly: true })
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
  private _pendingEmbeds: Array<{id: string; block: Block}> = [];
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

  push(block: Block | CompoundBlock | (() => Block)): string {
    if (typeof block === 'function') block = block();

    if (!('opcode' in block)) {
      const { main, slots } = block as CompoundBlock;
      const id = this.genId();
      this.insertChained(id, main);
      for (const { inputName, block: shadowBlock } of slots) {
        const shadowId = this.genId();
        shadowBlock.parent = id;
        shadowBlock.shadow = true;
        shadowBlock.topLevel = false;
        main.inputs[inputName] = Input.value(InputVal.block(shadowId));
        this._blocks.set(shadowId, shadowBlock);
      }
      this.drainEmbeds(id, main);
      return id;
    }

    const id = this.genId();
    this.insertChained(id, block as Block);
    this.drainEmbeds(id, block as Block);
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
    this.drainEmbeds(blockId, block);
    return blockId;
  }

  addOrphan(id: string, block: Block): void {
    this._blocks.set(id, block);
  }

  embed(variable: VarInputVal): InputVal;
  embed(list: ListInputVal): InputVal;
  embed(block: Block | CompoundBlock): InputVal;
  embed(item: VarInputVal | ListInputVal | Block | CompoundBlock): InputVal {
    if ('kind' in item) {
      const dataBlock = item.kind === 'var'
        ? Block.create('data_variable').withField('VARIABLE', varName(item as VarInputVal), (item as VarInputVal).id)
        : Block.create('data_listcontents').withField('LIST', listName(item as ListInputVal), (item as ListInputVal).id);
      const id = this.genId();
      dataBlock.topLevel = false;
      this._pendingEmbeds.push({id, block: dataBlock});
      return InputVal.block(id);
    }
    const block = item;
    if (!('opcode' in block)) {
      const { main, slots } = block as CompoundBlock;
      const id = this.genId();
      for (const { inputName, block: shadowBlock } of slots) {
        const shadowId = this.genId();
        shadowBlock.shadow = true;
        shadowBlock.topLevel = false;
        main.inputs[inputName] = Input.value(InputVal.block(shadowId));
        this._pendingEmbeds.push({id: shadowId, block: shadowBlock});
      }
      this._pendingEmbeds.push({id, block: main});
      return InputVal.block(id);
    }
    const id = this.genId();
    this._pendingEmbeds.push({id, block: block as Block});
    return InputVal.block(id);
  }

  private drainEmbeds(parentId: string, parentBlock: Block): void {
    if (this._pendingEmbeds.length === 0) return;
    const embedMap = new Map(this._pendingEmbeds.map(({id, block}) => [id, block]));
    this._pendingEmbeds = [];
    this.fixEmbedParents(embedMap, parentId, parentBlock);
    this.upgradeEmbedModes(embedMap, parentBlock);
    for (const [id, block] of embedMap) {
      block.topLevel = false;
      this._blocks.set(id, block);
    }
  }

  private upgradeEmbedModes(embedMap: Map<string, Block>, block: Block): void {
    for (const input of Object.values(block.inputs)) {
      if (input.primary.kind !== 'block') continue;
      const embedded = embedMap.get(input.primary.id);
      if (!embedded) continue;
      // Only upgrade reporter/variable blocks — not shadow menu blocks
      if (!embedded.shadow && input.mode === 1) {
        input.mode = 3;
        input.obscured = InputVal.str('');
      }
      this.upgradeEmbedModes(embedMap, embedded);
    }
  }

  private fixEmbedParents(embedMap: Map<string, Block>, parentId: string, parentBlock: Block): void {
    for (const input of Object.values(parentBlock.inputs)) {
      if (input.primary.kind === 'block') {
        const childId = input.primary.id;
        const childBlock = embedMap.get(childId);
        if (childBlock) {
          childBlock.parent = parentId;
          this.fixEmbedParents(embedMap, childId, childBlock);
        }
      }
    }
  }

  private buildSubstack(body: (s: Script) => void): {firstId: string; record: Record<string, Block>} | null {
    const inner = new Script();
    body(inner);
    const record = inner.toRecord();
    const entries = Object.entries(record);
    if (entries.length === 0) return null;
    return {firstId: entries[0][0], record};
  }

  private attachSubstack(sub: {firstId: string; record: Record<string, Block>}, parentId: string): void {
    sub.record[sub.firstId].parent = parentId;
    sub.record[sub.firstId].topLevel = false;
    for (const [id, block] of Object.entries(sub.record)) this.addOrphan(id, block);
  }

  forever(body: (s: Script) => void): string {
    const sub = this.buildSubstack(body);
    if (!sub) return this.push(Block.create('control_forever'));
    const b = Block.create('control_forever').withInput('SUBSTACK', InputVal.block(sub.firstId));
    const id = this.push(b);
    this.attachSubstack(sub, id);
    return id;
  }

  repeat(times: Val, body: (s: Script) => void): string {
    const sub = this.buildSubstack(body);
    const b = Block.create('control_repeat').withInput('TIMES', InputVal.coerce(times));
    if (!sub) return this.push(b);
    b.withInput('SUBSTACK', InputVal.block(sub.firstId));
    const id = this.push(b);
    this.attachSubstack(sub, id);
    return id;
  }

  if(condition: InputVal, body: (s: Script) => void): string {
    const sub = this.buildSubstack(body);
    const b = Block.create('control_if').withInput('CONDITION', condition);
    if (!sub) return this.push(b);
    b.withInput('SUBSTACK', InputVal.block(sub.firstId));
    const id = this.push(b);
    this.attachSubstack(sub, id);
    return id;
  }

  ifElse(condition: InputVal, thenBody: (s: Script) => void, elseBody: (s: Script) => void): string {
    const thenSub = this.buildSubstack(thenBody);
    const elseSub = this.buildSubstack(elseBody);
    const b = Block.create('control_if_else').withInput('CONDITION', condition);
    if (thenSub) b.withInput('SUBSTACK', InputVal.block(thenSub.firstId));
    if (elseSub) b.withInput('SUBSTACK2', InputVal.block(elseSub.firstId));
    const id = this.push(b);
    if (thenSub) this.attachSubstack(thenSub, id);
    if (elseSub) this.attachSubstack(elseSub, id);
    return id;
  }

  repeatUntil(condition: InputVal, body: (s: Script) => void): string {
    const sub = this.buildSubstack(body);
    const b = Block.create('control_repeat_until').withInput('CONDITION', condition);
    if (!sub) return this.push(b);
    b.withInput('SUBSTACK', InputVal.block(sub.firstId));
    const id = this.push(b);
    this.attachSubstack(sub, id);
    return id;
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

  deleteBlock(id: string): this {
    this._orphans.delete(id);
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
