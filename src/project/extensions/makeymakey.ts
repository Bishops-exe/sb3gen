import { Block, CompoundBlock } from '../block/Block';
import { InputVal } from '../block/InputVal';
import { ck } from '../block/validate';

function sh(main: string, input: string, menuOp: string, field: string, val: string): CompoundBlock {
  return { main: Block.create(main), slots: [{ inputName: input, block: Block.create(menuOp).addField(field, val) }] };
}

export function WhenMakeyKeyPressed(key: string): CompoundBlock;
export function WhenMakeyKeyPressed(key: InputVal): Block;
export function WhenMakeyKeyPressed(key: string | InputVal): Block | CompoundBlock {
  ck(key, 'key');
  if (typeof key === 'string') return sh('makeymakey_whenMakeyKeyPressed', 'KEY', 'makeymakey_menu_KEY', 'KEY', key);
  return Block.create('makeymakey_whenMakeyKeyPressed').addInput('KEY', key);
}

export function WhenCodePressed(sequence: string): CompoundBlock;
export function WhenCodePressed(sequence: InputVal): Block;
export function WhenCodePressed(sequence: string | InputVal): Block | CompoundBlock {
  ck(sequence, 'sequence');
  if (typeof sequence === 'string') return sh('makeymakey_whenCodePressed', 'SEQUENCE', 'makeymakey_menu_SEQUENCE', 'SEQUENCE', sequence);
  return Block.create('makeymakey_whenCodePressed').addInput('SEQUENCE', sequence);
}

export function KeyMenu(key: string): Block {
  ck(key, 'key');
  return Block.create('makeymakey_menu_KEY').addField('KEY', key);
}

export function SequenceMenu(sequence: string): Block {
  ck(sequence, 'sequence');
  return Block.create('makeymakey_menu_SEQUENCE').addField('SEQUENCE', sequence);
}
