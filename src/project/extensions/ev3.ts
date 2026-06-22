import { Block, CompoundBlock } from '../block/Block';
import { InputVal, NumVal } from '../block/InputVal';
import { ck } from '../block/validate';

const c = InputVal.coerce;

function sh(main: string, input: string, menuOp: string, field: string, val: string): CompoundBlock {
  return { main: Block.create(main), slots: [{ inputName: input, block: Block.create(menuOp).withField(field, val) }] };
}

export function Beep(note: NumVal, time: NumVal): Block {
  ck(note, 'note'); ck(time, 'time');
  return Block.create('ev3_beep').withInput('NOTE', c(note)).withInput('TIME', c(time));
}

export function GetBrightness(): Block { return Block.create('ev3_getBrightness'); }

export function GetDistance(): Block { return Block.create('ev3_getDistance'); }

export function ButtonPressed(port: string): CompoundBlock;
export function ButtonPressed(port: InputVal): Block;
export function ButtonPressed(port: string | InputVal): Block | CompoundBlock {
  ck(port, 'port');
  if (typeof port === 'string') return sh('ev3_buttonPressed', 'PORT', 'ev3_menu_sensorPorts', 'sensorPorts', port);
  return Block.create('ev3_buttonPressed').withInput('PORT', port);
}

export function WhenBrightnessLessThan(distance: NumVal): Block {
  ck(distance, 'distance');
  return Block.create('ev3_whenBrightnessLessThan').withInput('DISTANCE', c(distance));
}

export function WhenDistanceLessThan(distance: NumVal): Block {
  ck(distance, 'distance');
  return Block.create('ev3_whenDistanceLessThan').withInput('DISTANCE', c(distance));
}

export function WhenButtonPressed(port: string): CompoundBlock;
export function WhenButtonPressed(port: InputVal): Block;
export function WhenButtonPressed(port: string | InputVal): Block | CompoundBlock {
  ck(port, 'port');
  if (typeof port === 'string') return sh('ev3_whenButtonPressed', 'PORT', 'ev3_menu_sensorPorts', 'sensorPorts', port);
  return Block.create('ev3_whenButtonPressed').withInput('PORT', port);
}

export function GetMotorPosition(port: string): CompoundBlock;
export function GetMotorPosition(port: InputVal): Block;
export function GetMotorPosition(port: string | InputVal): Block | CompoundBlock {
  ck(port, 'port');
  if (typeof port === 'string') return sh('ev3_getMotorPosition', 'PORT', 'ev3_menu_motorPorts', 'motorPorts', port);
  return Block.create('ev3_getMotorPosition').withInput('PORT', port);
}

export function MotorSetPower(port: string, power: NumVal): CompoundBlock;
export function MotorSetPower(port: InputVal, power: NumVal): Block;
export function MotorSetPower(port: string | InputVal, power: NumVal): Block | CompoundBlock {
  ck(port, 'port'); ck(power, 'power');
  if (typeof port === 'string') {
    const compound = sh('ev3_motorSetPower', 'PORT', 'ev3_menu_motorPorts', 'motorPorts', port);
    compound.main.withInput('POWER', c(power));
    return compound;
  }
  return Block.create('ev3_motorSetPower').withInput('PORT', port).withInput('POWER', c(power));
}

export function MotorTurnClockwise(port: string, time: NumVal): CompoundBlock;
export function MotorTurnClockwise(port: InputVal, time: NumVal): Block;
export function MotorTurnClockwise(port: string | InputVal, time: NumVal): Block | CompoundBlock {
  ck(port, 'port'); ck(time, 'time');
  if (typeof port === 'string') {
    const compound = sh('ev3_motorTurnClockwise', 'PORT', 'ev3_menu_motorPorts', 'motorPorts', port);
    compound.main.withInput('TIME', c(time));
    return compound;
  }
  return Block.create('ev3_motorTurnClockwise').withInput('PORT', port).withInput('TIME', c(time));
}

export function MotorTurnCounterClockwise(port: string, time: NumVal): CompoundBlock;
export function MotorTurnCounterClockwise(port: InputVal, time: NumVal): Block;
export function MotorTurnCounterClockwise(port: string | InputVal, time: NumVal): Block | CompoundBlock {
  ck(port, 'port'); ck(time, 'time');
  if (typeof port === 'string') {
    const compound = sh('ev3_motorTurnCounterClockwise', 'PORT', 'ev3_menu_motorPorts', 'motorPorts', port);
    compound.main.withInput('TIME', c(time));
    return compound;
  }
  return Block.create('ev3_motorTurnCounterClockwise').withInput('PORT', port).withInput('TIME', c(time));
}

export function SensorPortsMenu(sensorPorts: string): Block {
  ck(sensorPorts, 'sensorPorts');
  return Block.create('ev3_menu_sensorPorts').withField('sensorPorts', sensorPorts);
}

export function MotorPortsMenu(motorPorts: string): Block {
  ck(motorPorts, 'motorPorts');
  return Block.create('ev3_menu_motorPorts').withField('motorPorts', motorPorts);
}

export function Ev3NoteMenu(note: string): Block {
  ck(note, 'note');
  return Block.create('note').withField('NOTE', note);
}
