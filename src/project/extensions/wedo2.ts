import { Block } from '../block/Block';
import { InputVal } from '../block/InputVal';

export class MotorOnFor {
  constructor(public motorId: InputVal, public duration: InputVal) {}
  build(): Block {
    return Block.create('wedo2_motorOnFor').withInput('MOTOR_ID', this.motorId).withInput('DURATION', this.duration);
  }
}

export class MotorOn {
  constructor(public motorId: InputVal) {}
  build(): Block { return Block.create('wedo2_motorOn').withInput('MOTOR_ID', this.motorId); }
}

export class MotorOff {
  constructor(public motorId: InputVal) {}
  build(): Block { return Block.create('wedo2_motorOff').withInput('MOTOR_ID', this.motorId); }
}

export class StartMotorPower {
  constructor(public motorId: InputVal, public power: InputVal) {}
  build(): Block {
    return Block.create('wedo2_startMotorPower').withInput('MOTOR_ID', this.motorId).withInput('POWER', this.power);
  }
}

export class SetMotorDirection {
  constructor(public motorId: InputVal, public motorDirection: InputVal) {}
  build(): Block {
    return Block.create('wedo2_setMotorDirection')
      .withInput('MOTOR_ID', this.motorId)
      .withInput('MOTOR_DIRECTION', this.motorDirection);
  }
}

export class SetLightHue {
  constructor(public hue: InputVal) {}
  build(): Block { return Block.create('wedo2_setLightHue').withInput('HUE', this.hue); }
}

export class WhenDistance {
  constructor(public op: InputVal, public reference: InputVal) {}
  build(): Block {
    return Block.create('wedo2_whenDistance').withInput('OP', this.op).withInput('REFERENCE', this.reference);
  }
}

export class WhenTilted {
  constructor(public tiltDirectionAny: InputVal) {}
  build(): Block { return Block.create('wedo2_whenTilted').withInput('TILT_DIRECTION_ANY', this.tiltDirectionAny); }
}

export class GetDistance {
  build(): Block { return Block.create('wedo2_getDistance'); }
}

export class IsTilted {
  constructor(public tiltDirectionAny: InputVal) {}
  build(): Block { return Block.create('wedo2_isTilted').withInput('TILT_DIRECTION_ANY', this.tiltDirectionAny); }
}

export class GetTiltAngle {
  constructor(public tiltDirection: InputVal) {}
  build(): Block { return Block.create('wedo2_getTiltAngle').withInput('TILT_DIRECTION', this.tiltDirection); }
}

export class MotorIdMenu {
  constructor(public motorId: string) {}
  build(): Block { return Block.create('wedo2_menu_MOTOR_ID').withField('MOTOR_ID', this.motorId); }
}

export class MotorDirectionMenu {
  constructor(public motorDirection: string) {}
  build(): Block { return Block.create('wedo2_menu_MOTOR_DIRECTION').withField('MOTOR_DIRECTION', this.motorDirection); }
}

export class OpMenu {
  constructor(public op: string) {}
  build(): Block { return Block.create('wedo2_menu_OP').withField('OP', this.op); }
}

export class TiltDirectionAnyMenu {
  constructor(public tiltDirectionAny: string) {}
  build(): Block {
    return Block.create('wedo2_menu_TILT_DIRECTION_ANY').withField('TILT_DIRECTION_ANY', this.tiltDirectionAny);
  }
}

export class TiltDirectionMenu {
  constructor(public tiltDirection: string) {}
  build(): Block {
    return Block.create('wedo2_menu_TILT_DIRECTION').withField('TILT_DIRECTION', this.tiltDirection);
  }
}
