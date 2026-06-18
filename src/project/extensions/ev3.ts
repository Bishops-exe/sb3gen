import { Block } from '../block/Block';
import { InputVal } from '../block/InputVal';

export class Beep {
  constructor(public note: InputVal, public time: InputVal) {}
  build(): Block {
    return Block.create('ev3_beep').withInput('NOTE', this.note).withInput('TIME', this.time);
  }
}

export class GetBrightness {
  build(): Block { return Block.create('ev3_getBrightness'); }
}

export class GetDistance {
  build(): Block { return Block.create('ev3_getDistance'); }
}

export class ButtonPressed {
  constructor(public port: InputVal) {}
  build(): Block { return Block.create('ev3_buttonPressed').withInput('PORT', this.port); }
}

export class WhenBrightnessLessThan {
  constructor(public distance: InputVal) {}
  build(): Block { return Block.create('ev3_whenBrightnessLessThan').withInput('DISTANCE', this.distance); }
}

export class WhenDistanceLessThan {
  constructor(public distance: InputVal) {}
  build(): Block { return Block.create('ev3_whenDistanceLessThan').withInput('DISTANCE', this.distance); }
}

export class WhenButtonPressed {
  constructor(public port: InputVal) {}
  build(): Block { return Block.create('ev3_whenButtonPressed').withInput('PORT', this.port); }
}

export class GetMotorPosition {
  constructor(public port: InputVal) {}
  build(): Block { return Block.create('ev3_getMotorPosition').withInput('PORT', this.port); }
}

export class MotorSetPower {
  constructor(public port: InputVal, public power: InputVal) {}
  build(): Block {
    return Block.create('ev3_motorSetPower').withInput('PORT', this.port).withInput('POWER', this.power);
  }
}

export class MotorTurnClockwise {
  constructor(public port: InputVal, public time: InputVal) {}
  build(): Block {
    return Block.create('ev3_motorTurnClockwise').withInput('PORT', this.port).withInput('TIME', this.time);
  }
}

export class MotorTurnCounterClockwise {
  constructor(public port: InputVal, public time: InputVal) {}
  build(): Block {
    return Block.create('ev3_motorTurnCounterClockwise').withInput('PORT', this.port).withInput('TIME', this.time);
  }
}

export class SensorPortsMenu {
  constructor(public sensorPorts: string) {}
  build(): Block { return Block.create('ev3_menu_sensorPorts').withField('sensorPorts', this.sensorPorts); }
}

export class MotorPortsMenu {
  constructor(public motorPorts: string) {}
  build(): Block { return Block.create('ev3_menu_motorPorts').withField('motorPorts', this.motorPorts); }
}

export class Ev3NoteMenu {
  constructor(public note: string) {}
  build(): Block { return Block.create('note').withField('NOTE', this.note); }
}
