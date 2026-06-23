import { Block, CompoundBlock } from '../block/Block';
import { InputVal, NumVal } from '../block/InputVal';
import { ck } from '../block/validate';

const c = InputVal.coerce;

function sh(main: string, input: string, menuOp: string, field: string, val: string): CompoundBlock {
  return { main: Block.create(main), slots: [{ inputName: input, block: Block.create(menuOp).addField(field, val) }] };
}

export function MotorOnFor(motorId: string, duration: NumVal): CompoundBlock;
export function MotorOnFor(motorId: InputVal, duration: NumVal): Block;
export function MotorOnFor(motorId: string | InputVal, duration: NumVal): Block | CompoundBlock {
  ck(motorId, 'motorId'); ck(duration, 'duration');
  if (typeof motorId === 'string') {
    const compound = sh('boost_motorOnFor', 'MOTOR_ID', 'boost_menu_MOTOR_ID', 'MOTOR_ID', motorId);
    compound.main.addInput('DURATION', c(duration));
    return compound;
  }
  return Block.create('boost_motorOnFor').addInput('MOTOR_ID', motorId).addInput('DURATION', c(duration));
}

export function MotorOnForRotation(motorId: string, rotation: NumVal): CompoundBlock;
export function MotorOnForRotation(motorId: InputVal, rotation: NumVal): Block;
export function MotorOnForRotation(motorId: string | InputVal, rotation: NumVal): Block | CompoundBlock {
  ck(motorId, 'motorId'); ck(rotation, 'rotation');
  if (typeof motorId === 'string') {
    const compound = sh('boost_motorOnForRotation', 'MOTOR_ID', 'boost_menu_MOTOR_ID', 'MOTOR_ID', motorId);
    compound.main.addInput('ROTATION', c(rotation));
    return compound;
  }
  return Block.create('boost_motorOnForRotation').addInput('MOTOR_ID', motorId).addInput('ROTATION', c(rotation));
}

export function MotorOn(motorId: string): CompoundBlock;
export function MotorOn(motorId: InputVal): Block;
export function MotorOn(motorId: string | InputVal): Block | CompoundBlock {
  ck(motorId, 'motorId');
  if (typeof motorId === 'string') return sh('boost_motorOn', 'MOTOR_ID', 'boost_menu_MOTOR_ID', 'MOTOR_ID', motorId);
  return Block.create('boost_motorOn').addInput('MOTOR_ID', motorId);
}

export function MotorOff(motorId: string): CompoundBlock;
export function MotorOff(motorId: InputVal): Block;
export function MotorOff(motorId: string | InputVal): Block | CompoundBlock {
  ck(motorId, 'motorId');
  if (typeof motorId === 'string') return sh('boost_motorOff', 'MOTOR_ID', 'boost_menu_MOTOR_ID', 'MOTOR_ID', motorId);
  return Block.create('boost_motorOff').addInput('MOTOR_ID', motorId);
}

export function SetMotorPower(motorId: string, power: NumVal): CompoundBlock;
export function SetMotorPower(motorId: InputVal, power: NumVal): Block;
export function SetMotorPower(motorId: string | InputVal, power: NumVal): Block | CompoundBlock {
  ck(motorId, 'motorId'); ck(power, 'power');
  if (typeof motorId === 'string') {
    const compound = sh('boost_setMotorPower', 'MOTOR_ID', 'boost_menu_MOTOR_ID', 'MOTOR_ID', motorId);
    compound.main.addInput('POWER', c(power));
    return compound;
  }
  return Block.create('boost_setMotorPower').addInput('MOTOR_ID', motorId).addInput('POWER', c(power));
}

export function SetMotorDirection(motorId: string, motorDirection: string): CompoundBlock;
export function SetMotorDirection(motorId: InputVal, motorDirection: InputVal): Block;
export function SetMotorDirection(motorId: string | InputVal, motorDirection: string | InputVal): Block | CompoundBlock {
  ck(motorId, 'motorId'); ck(motorDirection, 'motorDirection');
  if (typeof motorId === 'string' && typeof motorDirection === 'string') {
    return {
      main: Block.create('boost_setMotorDirection'),
      slots: [
        { inputName: 'MOTOR_ID',        block: Block.create('boost_menu_MOTOR_ID').addField('MOTOR_ID', motorId) },
        { inputName: 'MOTOR_DIRECTION', block: Block.create('boost_menu_MOTOR_DIRECTION').addField('MOTOR_DIRECTION', motorDirection) },
      ],
    };
  }
  return Block.create('boost_setMotorDirection')
    .addInput('MOTOR_ID', motorId as InputVal)
    .addInput('MOTOR_DIRECTION', motorDirection as InputVal);
}

export function GetMotorPosition(motorReporterId: string): CompoundBlock;
export function GetMotorPosition(motorReporterId: InputVal): Block;
export function GetMotorPosition(motorReporterId: string | InputVal): Block | CompoundBlock {
  ck(motorReporterId, 'motorReporterId');
  if (typeof motorReporterId === 'string') return sh('boost_getMotorPosition', 'MOTOR_REPORTER_ID', 'boost_menu_MOTOR_REPORTER_ID', 'MOTOR_REPORTER_ID', motorReporterId);
  return Block.create('boost_getMotorPosition').addInput('MOTOR_REPORTER_ID', motorReporterId);
}

export function WhenColor(color: string): CompoundBlock;
export function WhenColor(color: InputVal): Block;
export function WhenColor(color: string | InputVal): Block | CompoundBlock {
  ck(color, 'color');
  if (typeof color === 'string') return sh('boost_whenColor', 'COLOR', 'boost_menu_COLOR', 'COLOR', color);
  return Block.create('boost_whenColor').addInput('COLOR', color);
}

export function SeeingColor(color: string): CompoundBlock;
export function SeeingColor(color: InputVal): Block;
export function SeeingColor(color: string | InputVal): Block | CompoundBlock {
  ck(color, 'color');
  if (typeof color === 'string') return sh('boost_seeingColor', 'COLOR', 'boost_menu_COLOR', 'COLOR', color);
  return Block.create('boost_seeingColor').addInput('COLOR', color);
}

export function WhenTilted(tiltDirectionAny: string): CompoundBlock;
export function WhenTilted(tiltDirectionAny: InputVal): Block;
export function WhenTilted(tiltDirectionAny: string | InputVal): Block | CompoundBlock {
  ck(tiltDirectionAny, 'tiltDirectionAny');
  if (typeof tiltDirectionAny === 'string') return sh('boost_whenTilted', 'TILT_DIRECTION_ANY', 'boost_menu_TILT_DIRECTION_ANY', 'TILT_DIRECTION_ANY', tiltDirectionAny);
  return Block.create('boost_whenTilted').addInput('TILT_DIRECTION_ANY', tiltDirectionAny);
}

export function GetTiltAngle(tiltDirection: string): CompoundBlock;
export function GetTiltAngle(tiltDirection: InputVal): Block;
export function GetTiltAngle(tiltDirection: string | InputVal): Block | CompoundBlock {
  ck(tiltDirection, 'tiltDirection');
  if (typeof tiltDirection === 'string') return sh('boost_getTiltAngle', 'TILT_DIRECTION', 'boost_menu_TILT_DIRECTION', 'TILT_DIRECTION', tiltDirection);
  return Block.create('boost_getTiltAngle').addInput('TILT_DIRECTION', tiltDirection);
}

export function SetLightHue(hue: NumVal): Block {
  ck(hue, 'hue');
  return Block.create('boost_setLightHue').addInput('HUE', c(hue));
}

export function MotorIdMenu(motorId: string): Block {
  ck(motorId, 'motorId');
  return Block.create('boost_menu_MOTOR_ID').addField('MOTOR_ID', motorId);
}

export function MotorDirectionMenu(motorDirection: string): Block {
  ck(motorDirection, 'motorDirection');
  return Block.create('boost_menu_MOTOR_DIRECTION').addField('MOTOR_DIRECTION', motorDirection);
}

export function MotorReporterIdMenu(motorReporterId: string): Block {
  ck(motorReporterId, 'motorReporterId');
  return Block.create('boost_menu_MOTOR_REPORTER_ID').addField('MOTOR_REPORTER_ID', motorReporterId);
}

export function ColorMenu(color: string): Block {
  ck(color, 'color');
  return Block.create('boost_menu_COLOR').addField('COLOR', color);
}

export function TiltDirectionAnyMenu(tiltDirectionAny: string): Block {
  ck(tiltDirectionAny, 'tiltDirectionAny');
  return Block.create('boost_menu_TILT_DIRECTION_ANY').addField('TILT_DIRECTION_ANY', tiltDirectionAny);
}

export function TiltDirectionMenu(tiltDirection: string): Block {
  ck(tiltDirection, 'tiltDirection');
  return Block.create('boost_menu_TILT_DIRECTION').addField('TILT_DIRECTION', tiltDirection);
}
