import { Block, CompoundBlock } from '../block/Block';
import { InputVal, NumVal } from '../block/InputVal';
import { ck, ckColor } from '../block/validate';

const c = InputVal.coerce;

function sh(main: string, input: string, menuOp: string, field: string, val: string): CompoundBlock {
  return { main: Block.create(main), slots: [{ inputName: input, block: Block.create(menuOp).addField(field, val) }] };
}

export function PenClear(): Block { return Block.create('pen_clear'); }

export function PenStamp(): Block { return Block.create('pen_stamp'); }

export function PenDown(): Block { return Block.create('pen_penDown'); }

export function PenUp(): Block { return Block.create('pen_penUp'); }

export function SetPenColor(color: InputVal): Block {
  ck(color, 'color');
  ckColor(color, 'color');
  return Block.create('pen_setPenColorToColor').addInput('COLOR', color);
}

export function PenColorParamMenu(colorParam: string): Block {
  ck(colorParam, 'colorParam');
  return Block.create('pen_menu_colorParam').addField('colorParam', colorParam);
}

export function ChangePenColorParam(colorParam: string, value: NumVal): CompoundBlock;
export function ChangePenColorParam(colorParam: InputVal, value: NumVal): Block;
export function ChangePenColorParam(colorParam: string | InputVal, value: NumVal): Block | CompoundBlock {
  ck(colorParam, 'colorParam'); ck(value, 'value');
  if (typeof colorParam === 'string') {
    const compound = sh('pen_changePenColorParamBy', 'COLOR_PARAM', 'pen_menu_colorParam', 'colorParam', colorParam);
    compound.main.addInput('VALUE', c(value));
    return compound;
  }
  return Block.create('pen_changePenColorParamBy').addInput('COLOR_PARAM', colorParam).addInput('VALUE', c(value));
}

export function SetPenColorParam(colorParam: string, value: NumVal): CompoundBlock;
export function SetPenColorParam(colorParam: InputVal, value: NumVal): Block;
export function SetPenColorParam(colorParam: string | InputVal, value: NumVal): Block | CompoundBlock {
  ck(colorParam, 'colorParam'); ck(value, 'value');
  if (typeof colorParam === 'string') {
    const compound = sh('pen_setPenColorParamTo', 'COLOR_PARAM', 'pen_menu_colorParam', 'colorParam', colorParam);
    compound.main.addInput('VALUE', c(value));
    return compound;
  }
  return Block.create('pen_setPenColorParamTo').addInput('COLOR_PARAM', colorParam).addInput('VALUE', c(value));
}

export function ChangePenSize(size: NumVal): Block {
  ck(size, 'size');
  return Block.create('pen_changePenSizeBy').addInput('SIZE', c(size));
}

export function SetPenSize(size: NumVal): Block {
  ck(size, 'size');
  return Block.create('pen_setPenSizeTo').addInput('SIZE', c(size));
}
