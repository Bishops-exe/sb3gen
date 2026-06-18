import { Block } from '../block/Block';
import { InputVal } from '../block/InputVal';

export class WhenGesture {
  constructor(public gesture: InputVal) {}
  build(): Block { return Block.create('gdxfor_whenGesture').withInput('GESTURE', this.gesture); }
}

export class WhenForcePushedOrPulled {
  constructor(public pushPull: InputVal) {}
  build(): Block { return Block.create('gdxfor_whenForcePushedOrPulled').withInput('PUSH_PULL', this.pushPull); }
}

export class GetForce {
  build(): Block { return Block.create('gdxfor_getForce'); }
}

export class WhenTilted {
  constructor(public tilt: InputVal) {}
  build(): Block { return Block.create('gdxfor_whenTilted').withInput('TILT', this.tilt); }
}

export class IsTilted {
  constructor(public tilt: InputVal) {}
  build(): Block { return Block.create('gdxfor_isTilted').withInput('TILT', this.tilt); }
}

export class GetTilt {
  constructor(public tilt: InputVal) {}
  build(): Block { return Block.create('gdxfor_getTilt').withInput('TILT', this.tilt); }
}

export class IsFreeFalling {
  build(): Block { return Block.create('gdxfor_isFreeFalling'); }
}

export class GetSpinSpeed {
  constructor(public direction: InputVal) {}
  build(): Block { return Block.create('gdxfor_getSpinSpeed').withInput('DIRECTION', this.direction); }
}

export class GetAcceleration {
  constructor(public direction: InputVal) {}
  build(): Block { return Block.create('gdxfor_getAcceleration').withInput('DIRECTION', this.direction); }
}

export class GestureOptionsMenu {
  constructor(public gestureOptions: string) {}
  build(): Block { return Block.create('gdxfor_menu_gestureOptions').withField('gestureOptions', this.gestureOptions); }
}

export class PushPullOptionsMenu {
  constructor(public pushPullOptions: string) {}
  build(): Block {
    return Block.create('gdxfor_menu_pushPullOptions').withField('pushPullOptions', this.pushPullOptions);
  }
}

export class TiltAnyOptionsMenu {
  constructor(public tiltAnyOptions: string) {}
  build(): Block {
    return Block.create('gdxfor_menu_tiltAnyOptions').withField('tiltAnyOptions', this.tiltAnyOptions);
  }
}

export class TiltOptionsMenu {
  constructor(public tiltOptions: string) {}
  build(): Block { return Block.create('gdxfor_menu_tiltOptions').withField('tiltOptions', this.tiltOptions); }
}

export class AxisOptionsMenu {
  constructor(public axisOptions: string) {}
  build(): Block { return Block.create('gdxfor_menu_axisOptions').withField('axisOptions', this.axisOptions); }
}
