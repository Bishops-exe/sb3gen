export type InputVal =
  | { kind: 'block'; id: string }
  | { kind: 'num'; value: number }
  | { kind: 'posNum'; value: number }
  | { kind: 'posInt'; value: number }
  | { kind: 'int'; value: number }
  | { kind: 'angle'; value: number }
  | { kind: 'color'; value: string }
  | { kind: 'str'; value: string }
  | { kind: 'broadcast'; name: string; id: string }
  | { kind: 'var'; name: string; id: string }
  | { kind: 'list'; name: string; id: string };

export type Val = number | string | InputVal;
export type NumVal = number | InputVal;

export type VarInputVal = Extract<InputVal, { kind: 'var' }>;
export type ListInputVal = Extract<InputVal, { kind: 'list' }>;
export type BroadcastInputVal = Extract<InputVal, { kind: 'broadcast' }>;

export type VarParam = string | VarInputVal;
export type ListParam = string | ListInputVal;
export type BroadcastParam = string | BroadcastInputVal;

export function varName(v: VarParam): string { return typeof v === 'string' ? v : v.name; }
export function listName(v: ListParam): string { return typeof v === 'string' ? v : v.name; }
export function broadcastName(v: BroadcastParam): string { return typeof v === 'string' ? v : v.name; }

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace InputVal {
  export const block = (id: string): InputVal => ({ kind: 'block', id });
  export const num = (value: number): InputVal => ({ kind: 'num', value });
  export const posNum = (value: number): InputVal => ({ kind: 'posNum', value });
  export const posInt = (value: number): InputVal => ({ kind: 'posInt', value });
  export const int = (value: number): InputVal => ({ kind: 'int', value });
  export const angle = (value: number): InputVal => ({ kind: 'angle', value });
  export const color = (value: string): InputVal => ({ kind: 'color', value });
  export const str = (value: string): InputVal => ({ kind: 'str', value });
  export const broadcast = (name: string, id: string): InputVal => ({ kind: 'broadcast', name, id });
  export const varRef = (name: string, id: string): InputVal => ({ kind: 'var', name, id });
  export const listRef = (name: string, id: string): InputVal => ({ kind: 'list', name, id });
  export const coerce = (v: number | string | InputVal): InputVal => {
    if (typeof v === 'number') return InputVal.num(v);
    if (typeof v === 'string') return InputVal.str(v);
    return v;
  };
}

export function serializeInputVal(v: InputVal): unknown {
  switch (v.kind) {
    case 'block': return v.id;
    case 'num': return [4, v.value.toString()];
    case 'posNum': return [5, v.value.toString()];
    case 'posInt': return [6, v.value.toString()];
    case 'int': return [7, v.value.toString()];
    case 'angle': return [8, v.value.toString()];
    case 'color': return [9, v.value];
    case 'str': return [10, v.value];
    case 'broadcast': return [11, v.name, v.id];
    case 'var': return [12, v.name, v.id];
    case 'list': return [13, v.name, v.id];
  }
}

export function deserializeInputVal(raw: unknown): InputVal {
  if (typeof raw === 'string') return InputVal.block(raw);
  if (!Array.isArray(raw)) throw new Error(`Invalid InputVal: ${JSON.stringify(raw)}`);
  const [type, a, b] = raw as [number, string, string?];
  switch (type) {
    case 4: return InputVal.num(parseFloat(a));
    case 5: return InputVal.posNum(parseFloat(a));
    case 6: return InputVal.posInt(parseFloat(a));
    case 7: return InputVal.int(parseFloat(a));
    case 8: return InputVal.angle(parseFloat(a));
    case 9: return InputVal.color(a);
    case 10: return InputVal.str(a);
    case 11: return InputVal.broadcast(a, b!);
    case 12: return InputVal.varRef(a, b!);
    case 13: return InputVal.listRef(a, b!);
    default: throw new Error(`Unknown InputVal type: ${type}`);
  }
}
