import { Block } from '../block/Block';
import { InputVal } from '../block/InputVal';

export class MotorOnFor {
  constructor(public motorId: InputVal, public duration: InputVal) {}
  build(): Block {
    return Block.create('boost_motorOnFor').withInput('MOTOR_ID', this.motorId).withInput('DURATION', this.duration);
  }
}

export class MotorOnForRotation {
  constructor(public motorId: InputVal, public rotation: InputVal) {}
  build(): Block {
    return Block.create('boost_motorOnForRotation')
      .withInput('MOTOR_ID', this.motorId)
      .withInput('ROTATION', this.rotation);
  }
}

export class MotorOn {
  constructor(public motorId: InputVal) {}
  build(): Block { return Block.create('boost_motorOn').withInput('MOTOR_ID', this.motorId); }
}

export class MotorOff {
  constructor(public motorId: InputVal) {}
  build(): Block { return Block.create('boost_motorOff').withInput('MOTOR_ID', this.motorId); }
}

export class SetMotorPower {
  constructor(public motorId: InputVal, public power: InputVal) {}
  build(): Block {
    return Block.create('boost_setMotorPower').withInput('MOTOR_ID', this.motorId).withInput('POWER', this.power);
  }
}

export class SetMotorDirection {
  constructor(public motorId: InputVal, public motorDirection: InputVal) {}
  build(): Block {
    return Block.create('boost_setMotorDirection')
      .withInput('MOTOR_ID', this.motorId)
      .withInput('MOTOR_DIRECTION', this.motorDirection);
  }
}

export class GetMotorPosition {
  constructor(public motorReporterId: InputVal) {}
  build(): Block {
    return Block.create('boost_getMotorPosition').withInput('MOTOR_REPORTER_ID', this.motorReporterId);
  }
}

export class WhenColor {
  constructor(public color: InputVal) {}
  build(): Block { return Block.create('boost_whenColor').withInput('COLOR', this.color); }
}

export class SeeingColor {
  constructor(public color: InputVal) {}
  build(): Block { return Block.create('boost_seeingColor').withInput('COLOR', this.color); }
}

export class WhenTilted {
  constructor(public tiltDirectionAny: InputVal) {}
  build(): Block {
    return Block.create('boost_whenTilted').withInput('TILT_DIRECTION_ANY', this.tiltDirectionAny);
  }
}

export class GetTiltAngle {
  constructor(public tiltDirection: InputVal) {}
  build(): Block { return Block.create('boost_getTiltAngle').withInput('TILT_DIRECTION', this.tiltDirection); }
}

export class SetLightHue {
  constructor(public hue: InputVal) {}
  build(): Block { return Block.create('boost_setLightHue').withInput('HUE', this.hue); }
}

export class MotorIdMenu {
  constructor(public motorId: string) {}
  build(): Block { return Block.create('boost_menu_MOTOR_ID').withField('MOTOR_ID', this.motorId); }
}

export class MotorDirectionMenu {
  constructor(public motorDirection: string) {}
  build(): Block { return Block.create('boost_menu_MOTOR_DIRECTION').withField('MOTOR_DIRECTION', this.motorDirection); }
}

export class MotorReporterIdMenu {
  constructor(public motorReporterId: string) {}
  build(): Block {
    return Block.create('boost_menu_MOTOR_REPORTER_ID').withField('MOTOR_REPORTER_ID', this.motorReporterId);
  }
}

export class ColorMenu {
  constructor(public color: string) {}
  build(): Block { return Block.create('boost_menu_COLOR').withField('COLOR', this.color); }
}

export class TiltDirectionAnyMenu {
  constructor(public tiltDirectionAny: string) {}
  build(): Block {
    return Block.create('boost_menu_TILT_DIRECTION_ANY').withField('TILT_DIRECTION_ANY', this.tiltDirectionAny);
  }
}

export class TiltDirectionMenu {
  constructor(public tiltDirection: string) {}
  build(): Block { return Block.create('boost_menu_TILT_DIRECTION').withField('TILT_DIRECTION', this.tiltDirection); }
}
