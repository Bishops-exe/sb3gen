import { Block, CompoundBlock } from '../block/Block';
import { InputVal, Val } from '../block/InputVal';
import { ck } from '../block/validate';

const c = InputVal.coerce;

function sh(main: string, input: string, menuOp: string, field: string, val: string): CompoundBlock {
  return { main: Block.create(main), slots: [{ inputName: input, block: Block.create(menuOp).addField(field, val) }] };
}

export function WhenButtonPressed(btn: string): CompoundBlock;
export function WhenButtonPressed(btn: InputVal): Block;
export function WhenButtonPressed(btn: string | InputVal): Block | CompoundBlock {
  ck(btn, 'btn');
  if (typeof btn === 'string') return sh('microbit_whenButtonPressed', 'BTN', 'microbit_menu_buttons', 'buttons', btn);
  return Block.create('microbit_whenButtonPressed').addInput('BTN', btn);
}

export function IsButtonPressed(btn: string): CompoundBlock;
export function IsButtonPressed(btn: InputVal): Block;
export function IsButtonPressed(btn: string | InputVal): Block | CompoundBlock {
  ck(btn, 'btn');
  if (typeof btn === 'string') return sh('microbit_isButtonPressed', 'BTN', 'microbit_menu_buttons', 'buttons', btn);
  return Block.create('microbit_isButtonPressed').addInput('BTN', btn);
}

export function WhenGesture(gesture: string): CompoundBlock;
export function WhenGesture(gesture: InputVal): Block;
export function WhenGesture(gesture: string | InputVal): Block | CompoundBlock {
  ck(gesture, 'gesture');
  if (typeof gesture === 'string') return sh('microbit_whenGesture', 'GESTURE', 'microbit_menu_gestures', 'gestures', gesture);
  return Block.create('microbit_whenGesture').addInput('GESTURE', gesture);
}

export function DisplaySymbol(matrix: string): CompoundBlock;
export function DisplaySymbol(matrix: InputVal): Block;
export function DisplaySymbol(matrix: string | InputVal): Block | CompoundBlock {
  ck(matrix, 'matrix');
  if (typeof matrix === 'string') return sh('microbit_displaySymbol', 'MATRIX', 'matrix', 'MATRIX', matrix);
  return Block.create('microbit_displaySymbol').addInput('MATRIX', matrix);
}

export function DisplayText(text: Val): Block {
  ck(text, 'text');
  return Block.create('microbit_displayText').addInput('TEXT', c(text));
}

export function DisplayClear(): Block { return Block.create('microbit_displayClear'); }

export function WhenTilted(direction: string): CompoundBlock;
export function WhenTilted(direction: InputVal): Block;
export function WhenTilted(direction: string | InputVal): Block | CompoundBlock {
  ck(direction, 'direction');
  if (typeof direction === 'string') return sh('microbit_whenTilted', 'DIRECTION', 'microbit_menu_tiltDirectionAny', 'tiltDirectionAny', direction);
  return Block.create('microbit_whenTilted').addInput('DIRECTION', direction);
}

export function IsTilted(direction: string): CompoundBlock;
export function IsTilted(direction: InputVal): Block;
export function IsTilted(direction: string | InputVal): Block | CompoundBlock {
  ck(direction, 'direction');
  if (typeof direction === 'string') return sh('microbit_isTilted', 'DIRECTION', 'microbit_menu_tiltDirectionAny', 'tiltDirectionAny', direction);
  return Block.create('microbit_isTilted').addInput('DIRECTION', direction);
}

export function GetTiltAngle(direction: string): CompoundBlock;
export function GetTiltAngle(direction: InputVal): Block;
export function GetTiltAngle(direction: string | InputVal): Block | CompoundBlock {
  ck(direction, 'direction');
  if (typeof direction === 'string') return sh('microbit_getTiltAngle', 'DIRECTION', 'microbit_menu_tiltDirection', 'tiltDirection', direction);
  return Block.create('microbit_getTiltAngle').addInput('DIRECTION', direction);
}

export function WhenPinConnected(pin: string): CompoundBlock;
export function WhenPinConnected(pin: InputVal): Block;
export function WhenPinConnected(pin: string | InputVal): Block | CompoundBlock {
  ck(pin, 'pin');
  if (typeof pin === 'string') return sh('microbit_whenPinConnected', 'PIN', 'microbit_menu_touchPins', 'touchPins', pin);
  return Block.create('microbit_whenPinConnected').addInput('PIN', pin);
}

export function ButtonsMenu(buttons: string): Block {
  ck(buttons, 'buttons');
  return Block.create('microbit_menu_buttons').addField('buttons', buttons);
}

export function GesturesMenu(gestures: string): Block {
  ck(gestures, 'gestures');
  return Block.create('microbit_menu_gestures').addField('gestures', gestures);
}

export function TiltDirectionAnyMenu(tiltDirectionAny: string): Block {
  ck(tiltDirectionAny, 'tiltDirectionAny');
  return Block.create('microbit_menu_tiltDirectionAny').addField('tiltDirectionAny', tiltDirectionAny);
}

export function TiltDirectionMenu(tiltDirection: string): Block {
  ck(tiltDirection, 'tiltDirection');
  return Block.create('microbit_menu_tiltDirection').addField('tiltDirection', tiltDirection);
}

export function TouchPinsMenu(touchPins: string): Block {
  ck(touchPins, 'touchPins');
  return Block.create('microbit_menu_touchPins').addField('touchPins', touchPins);
}

export function MatrixMenu(matrix: string): Block {
  ck(matrix, 'matrix');
  return Block.create('matrix').addField('MATRIX', matrix);
}
