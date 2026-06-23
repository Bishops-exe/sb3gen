import { Block, CompoundBlock } from '../block/Block';
import { InputVal } from '../block/InputVal';
import { ck } from '../block/validate';

function sh(main: string, input: string, menuOp: string, field: string, val: string): CompoundBlock {
  return { main: Block.create(main), slots: [{ inputName: input, block: Block.create(menuOp).addField(field, val) }] };
}

export function WhenGesture(gesture: string): CompoundBlock;
export function WhenGesture(gesture: InputVal): Block;
export function WhenGesture(gesture: string | InputVal): Block | CompoundBlock {
  ck(gesture, 'gesture');
  if (typeof gesture === 'string') return sh('gdxfor_whenGesture', 'GESTURE', 'gdxfor_menu_gestureOptions', 'gestureOptions', gesture);
  return Block.create('gdxfor_whenGesture').addInput('GESTURE', gesture);
}

export function WhenForcePushedOrPulled(pushPull: string): CompoundBlock;
export function WhenForcePushedOrPulled(pushPull: InputVal): Block;
export function WhenForcePushedOrPulled(pushPull: string | InputVal): Block | CompoundBlock {
  ck(pushPull, 'pushPull');
  if (typeof pushPull === 'string') return sh('gdxfor_whenForcePushedOrPulled', 'PUSH_PULL', 'gdxfor_menu_pushPullOptions', 'pushPullOptions', pushPull);
  return Block.create('gdxfor_whenForcePushedOrPulled').addInput('PUSH_PULL', pushPull);
}

export function GetForce(): Block { return Block.create('gdxfor_getForce'); }

export function WhenTilted(tilt: string): CompoundBlock;
export function WhenTilted(tilt: InputVal): Block;
export function WhenTilted(tilt: string | InputVal): Block | CompoundBlock {
  ck(tilt, 'tilt');
  if (typeof tilt === 'string') return sh('gdxfor_whenTilted', 'TILT', 'gdxfor_menu_tiltAnyOptions', 'tiltAnyOptions', tilt);
  return Block.create('gdxfor_whenTilted').addInput('TILT', tilt);
}

export function IsTilted(tilt: string): CompoundBlock;
export function IsTilted(tilt: InputVal): Block;
export function IsTilted(tilt: string | InputVal): Block | CompoundBlock {
  ck(tilt, 'tilt');
  if (typeof tilt === 'string') return sh('gdxfor_isTilted', 'TILT', 'gdxfor_menu_tiltAnyOptions', 'tiltAnyOptions', tilt);
  return Block.create('gdxfor_isTilted').addInput('TILT', tilt);
}

export function GetTilt(tilt: string): CompoundBlock;
export function GetTilt(tilt: InputVal): Block;
export function GetTilt(tilt: string | InputVal): Block | CompoundBlock {
  ck(tilt, 'tilt');
  if (typeof tilt === 'string') return sh('gdxfor_getTilt', 'TILT', 'gdxfor_menu_tiltOptions', 'tiltOptions', tilt);
  return Block.create('gdxfor_getTilt').addInput('TILT', tilt);
}

export function IsFreeFalling(): Block { return Block.create('gdxfor_isFreeFalling'); }

export function GetSpinSpeed(direction: string): CompoundBlock;
export function GetSpinSpeed(direction: InputVal): Block;
export function GetSpinSpeed(direction: string | InputVal): Block | CompoundBlock {
  ck(direction, 'direction');
  if (typeof direction === 'string') return sh('gdxfor_getSpinSpeed', 'DIRECTION', 'gdxfor_menu_axisOptions', 'axisOptions', direction);
  return Block.create('gdxfor_getSpinSpeed').addInput('DIRECTION', direction);
}

export function GetAcceleration(direction: string): CompoundBlock;
export function GetAcceleration(direction: InputVal): Block;
export function GetAcceleration(direction: string | InputVal): Block | CompoundBlock {
  ck(direction, 'direction');
  if (typeof direction === 'string') return sh('gdxfor_getAcceleration', 'DIRECTION', 'gdxfor_menu_axisOptions', 'axisOptions', direction);
  return Block.create('gdxfor_getAcceleration').addInput('DIRECTION', direction);
}

export function GestureOptionsMenu(gestureOptions: string): Block {
  ck(gestureOptions, 'gestureOptions');
  return Block.create('gdxfor_menu_gestureOptions').addField('gestureOptions', gestureOptions);
}

export function PushPullOptionsMenu(pushPullOptions: string): Block {
  ck(pushPullOptions, 'pushPullOptions');
  return Block.create('gdxfor_menu_pushPullOptions').addField('pushPullOptions', pushPullOptions);
}

export function TiltAnyOptionsMenu(tiltAnyOptions: string): Block {
  ck(tiltAnyOptions, 'tiltAnyOptions');
  return Block.create('gdxfor_menu_tiltAnyOptions').addField('tiltAnyOptions', tiltAnyOptions);
}

export function TiltOptionsMenu(tiltOptions: string): Block {
  ck(tiltOptions, 'tiltOptions');
  return Block.create('gdxfor_menu_tiltOptions').addField('tiltOptions', tiltOptions);
}

export function AxisOptionsMenu(axisOptions: string): Block {
  ck(axisOptions, 'axisOptions');
  return Block.create('gdxfor_menu_axisOptions').addField('axisOptions', axisOptions);
}
