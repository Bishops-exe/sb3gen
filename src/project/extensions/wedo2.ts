import { Block, CompoundBlock } from '../block/Block';
import { InputVal, NumVal } from '../block/InputVal';
import { ck } from '../block/validate';

const c = InputVal.coerce;

function sh(main: string, input: string, menuOp: string, field: string, val: string): CompoundBlock {
  return { main: Block.create(main), slots: [{ inputName: input, block: Block.create(menuOp).withField(field, val) }] };
}

export function MotorOnFor(motorId: string, duration: NumVal): CompoundBlock;
export function MotorOnFor(motorId: InputVal, duration: NumVal): Block;
export function MotorOnFor(motorId: string | InputVal, duration: NumVal): Block | CompoundBlock {
  ck(motorId, 'motorId'); ck(duration, 'duration');
  if (typeof motorId === 'string') {
    const compound = sh('wedo2_motorOnFor', 'MOTOR_ID', 'wedo2_menu_MOTOR_ID', 'MOTOR_ID', motorId);
    compound.main.withInput('DURATION', c(duration));
    return compound;
  }
  return Block.create('wedo2_motorOnFor').withInput('MOTOR_ID', motorId).withInput('DURATION', c(duration));
}

export function MotorOn(motorId: string): CompoundBlock;
export function MotorOn(motorId: InputVal): Block;
export function MotorOn(motorId: string | InputVal): Block | CompoundBlock {
  ck(motorId, 'motorId');
  if (typeof motorId === 'string') return sh('wedo2_motorOn', 'MOTOR_ID', 'wedo2_menu_MOTOR_ID', 'MOTOR_ID', motorId);
  return Block.create('wedo2_motorOn').withInput('MOTOR_ID', motorId);
}

export function MotorOff(motorId: string): CompoundBlock;
export function MotorOff(motorId: InputVal): Block;
export function MotorOff(motorId: string | InputVal): Block | CompoundBlock {
  ck(motorId, 'motorId');
  if (typeof motorId === 'string') return sh('wedo2_motorOff', 'MOTOR_ID', 'wedo2_menu_MOTOR_ID', 'MOTOR_ID', motorId);
  return Block.create('wedo2_motorOff').withInput('MOTOR_ID', motorId);
}

export function StartMotorPower(motorId: string, power: NumVal): CompoundBlock;
export function StartMotorPower(motorId: InputVal, power: NumVal): Block;
export function StartMotorPower(motorId: string | InputVal, power: NumVal): Block | CompoundBlock {
  ck(motorId, 'motorId'); ck(power, 'power');
  if (typeof motorId === 'string') {
    const compound = sh('wedo2_startMotorPower', 'MOTOR_ID', 'wedo2_menu_MOTOR_ID', 'MOTOR_ID', motorId);
    compound.main.withInput('POWER', c(power));
    return compound;
  }
  return Block.create('wedo2_startMotorPower').withInput('MOTOR_ID', motorId).withInput('POWER', c(power));
}

export function SetMotorDirection(motorId: string, motorDirection: string): CompoundBlock;
export function SetMotorDirection(motorId: InputVal, motorDirection: InputVal): Block;
export function SetMotorDirection(motorId: string | InputVal, motorDirection: string | InputVal): Block | CompoundBlock {
  ck(motorId, 'motorId'); ck(motorDirection, 'motorDirection');
  if (typeof motorId === 'string' && typeof motorDirection === 'string') {
    return {
      main: Block.create('wedo2_setMotorDirection'),
      slots: [
        { inputName: 'MOTOR_ID',        block: Block.create('wedo2_menu_MOTOR_ID').withField('MOTOR_ID', motorId) },
        { inputName: 'MOTOR_DIRECTION', block: Block.create('wedo2_menu_MOTOR_DIRECTION').withField('MOTOR_DIRECTION', motorDirection) },
      ],
    };
  }
  return Block.create('wedo2_setMotorDirection')
    .withInput('MOTOR_ID', motorId as InputVal)
    .withInput('MOTOR_DIRECTION', motorDirection as InputVal);
}

export function SetLightHue(hue: NumVal): Block {
  ck(hue, 'hue');
  return Block.create('wedo2_setLightHue').withInput('HUE', c(hue));
}

export function WhenDistance(op: string, reference: NumVal): CompoundBlock;
export function WhenDistance(op: InputVal, reference: NumVal): Block;
export function WhenDistance(op: string | InputVal, reference: NumVal): Block | CompoundBlock {
  ck(op, 'op'); ck(reference, 'reference');
  if (typeof op === 'string') {
    const compound = sh('wedo2_whenDistance', 'OP', 'wedo2_menu_OP', 'OP', op);
    compound.main.withInput('REFERENCE', c(reference));
    return compound;
  }
  return Block.create('wedo2_whenDistance').withInput('OP', op).withInput('REFERENCE', c(reference));
}

export function WhenTilted(tiltDirectionAny: string): CompoundBlock;
export function WhenTilted(tiltDirectionAny: InputVal): Block;
export function WhenTilted(tiltDirectionAny: string | InputVal): Block | CompoundBlock {
  ck(tiltDirectionAny, 'tiltDirectionAny');
  if (typeof tiltDirectionAny === 'string') return sh('wedo2_whenTilted', 'TILT_DIRECTION_ANY', 'wedo2_menu_TILT_DIRECTION_ANY', 'TILT_DIRECTION_ANY', tiltDirectionAny);
  return Block.create('wedo2_whenTilted').withInput('TILT_DIRECTION_ANY', tiltDirectionAny);
}

export function GetDistance(): Block { return Block.create('wedo2_getDistance'); }

export function IsTilted(tiltDirectionAny: string): CompoundBlock;
export function IsTilted(tiltDirectionAny: InputVal): Block;
export function IsTilted(tiltDirectionAny: string | InputVal): Block | CompoundBlock {
  ck(tiltDirectionAny, 'tiltDirectionAny');
  if (typeof tiltDirectionAny === 'string') return sh('wedo2_isTilted', 'TILT_DIRECTION_ANY', 'wedo2_menu_TILT_DIRECTION_ANY', 'TILT_DIRECTION_ANY', tiltDirectionAny);
  return Block.create('wedo2_isTilted').withInput('TILT_DIRECTION_ANY', tiltDirectionAny);
}

export function GetTiltAngle(tiltDirection: string): CompoundBlock;
export function GetTiltAngle(tiltDirection: InputVal): Block;
export function GetTiltAngle(tiltDirection: string | InputVal): Block | CompoundBlock {
  ck(tiltDirection, 'tiltDirection');
  if (typeof tiltDirection === 'string') return sh('wedo2_getTiltAngle', 'TILT_DIRECTION', 'wedo2_menu_TILT_DIRECTION', 'TILT_DIRECTION', tiltDirection);
  return Block.create('wedo2_getTiltAngle').withInput('TILT_DIRECTION', tiltDirection);
}

export function MotorIdMenu(motorId: string): Block {
  ck(motorId, 'motorId');
  return Block.create('wedo2_menu_MOTOR_ID').withField('MOTOR_ID', motorId);
}

export function MotorDirectionMenu(motorDirection: string): Block {
  ck(motorDirection, 'motorDirection');
  return Block.create('wedo2_menu_MOTOR_DIRECTION').withField('MOTOR_DIRECTION', motorDirection);
}

export function OpMenu(op: string): Block {
  ck(op, 'op');
  return Block.create('wedo2_menu_OP').withField('OP', op);
}

export function TiltDirectionAnyMenu(tiltDirectionAny: string): Block {
  ck(tiltDirectionAny, 'tiltDirectionAny');
  return Block.create('wedo2_menu_TILT_DIRECTION_ANY').withField('TILT_DIRECTION_ANY', tiltDirectionAny);
}

export function TiltDirectionMenu(tiltDirection: string): Block {
  ck(tiltDirection, 'tiltDirection');
  return Block.create('wedo2_menu_TILT_DIRECTION').withField('TILT_DIRECTION', tiltDirection);
}
