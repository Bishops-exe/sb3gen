import type { InputVal } from './InputVal';

export function ck(val: unknown, name: string): void {
  if (val === null || val === undefined) {
    throw new TypeError(`[sb3gen] argument '${name}' is ${val === null ? 'null' : 'undefined'}`);
  }
}

export function ckColor(val: InputVal, name: string): void {
  if (val.kind !== 'color' && val.kind !== 'block') {
    throw new TypeError(
      `[sb3gen] '${name}' must be InputVal.color('#rrggbb') or a block ref, got kind='${val.kind}'`,
    );
  }
}
