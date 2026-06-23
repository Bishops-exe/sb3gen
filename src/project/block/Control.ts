import { Block, Script, SubstackBlock } from './Block';
import { InputVal, Val } from './InputVal';

function buildSubstack(body: (s: Script) => void): {firstId: string; record: Record<string, Block>} | null {
  const inner = new Script();
  body(inner);
  const record = inner.toRecord();
  const entries = Object.entries(record);
  if (entries.length === 0) return null;
  return {firstId: entries[0][0], record};
}

export function Forever(body: (s: Script) => void): SubstackBlock | Block {
  const sub = buildSubstack(body);
  if (!sub) return Block.create('control_forever');
  const main = Block.create('control_forever').addInput('SUBSTACK', InputVal.block(sub.firstId));
  return {main, substacks: [sub]};
}

export function Repeat(times: Val, body: (s: Script) => void): SubstackBlock | Block {
  const sub = buildSubstack(body);
  const main = Block.create('control_repeat').addInput('TIMES', InputVal.coerce(times));
  if (!sub) return main;
  main.addInput('SUBSTACK', InputVal.block(sub.firstId));
  return {main, substacks: [sub]};
}

export function If(condition: InputVal, body: (s: Script) => void): SubstackBlock | Block {
  const sub = buildSubstack(body);
  const main = Block.create('control_if').addInput('CONDITION', condition);
  if (!sub) return main;
  main.addInput('SUBSTACK', InputVal.block(sub.firstId));
  return {main, substacks: [sub]};
}

export function IfElse(condition: InputVal, thenBody: (s: Script) => void, elseBody: (s: Script) => void): SubstackBlock | Block {
  const thenSub = buildSubstack(thenBody);
  const elseSub = buildSubstack(elseBody);
  const main = Block.create('control_if_else').addInput('CONDITION', condition);
  const substacks: SubstackBlock['substacks'] = [];
  if (thenSub) { main.addInput('SUBSTACK', InputVal.block(thenSub.firstId)); substacks.push(thenSub); }
  if (elseSub) { main.addInput('SUBSTACK2', InputVal.block(elseSub.firstId)); substacks.push(elseSub); }
  if (substacks.length === 0) return main;
  return {main, substacks};
}

export function RepeatUntil(condition: InputVal, body: (s: Script) => void): SubstackBlock | Block {
  const sub = buildSubstack(body);
  const main = Block.create('control_repeat_until').addInput('CONDITION', condition);
  if (!sub) return main;
  main.addInput('SUBSTACK', InputVal.block(sub.firstId));
  return {main, substacks: [sub]};
}