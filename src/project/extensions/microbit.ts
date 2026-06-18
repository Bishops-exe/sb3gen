import { Block } from '../block/Block';
import { InputVal } from '../block/InputVal';

export class WhenButtonPressed {
  constructor(public btn: InputVal) {}
  build(): Block { return Block.create('microbit_whenButtonPressed').withInput('BTN', this.btn); }
}

export class IsButtonPressed {
  constructor(public btn: InputVal) {}
  build(): Block { return Block.create('microbit_isButtonPressed').withInput('BTN', this.btn); }
}

export class WhenGesture {
  constructor(public gesture: InputVal) {}
  build(): Block { return Block.create('microbit_whenGesture').withInput('GESTURE', this.gesture); }
}

export class DisplaySymbol {
  constructor(public matrix: InputVal) {}
  build(): Block { return Block.create('microbit_displaySymbol').withInput('MATRIX', this.matrix); }
}

export class DisplayText {
  constructor(public text: InputVal) {}
  build(): Block { return Block.create('microbit_displayText').withInput('TEXT', this.text); }
}

export class DisplayClear {
  build(): Block { return Block.create('microbit_displayClear'); }
}

export class WhenTilted {
  constructor(public direction: InputVal) {}
  build(): Block { return Block.create('microbit_whenTilted').withInput('DIRECTION', this.direction); }
}

export class IsTilted {
  constructor(public direction: InputVal) {}
  build(): Block { return Block.create('microbit_isTilted').withInput('DIRECTION', this.direction); }
}

export class GetTiltAngle {
  constructor(public direction: InputVal) {}
  build(): Block { return Block.create('microbit_getTiltAngle').withInput('DIRECTION', this.direction); }
}

export class WhenPinConnected {
  constructor(public pin: InputVal) {}
  build(): Block { return Block.create('microbit_whenPinConnected').withInput('PIN', this.pin); }
}

export class ButtonsMenu {
  constructor(public buttons: string) {}
  build(): Block { return Block.create('microbit_menu_buttons').withField('buttons', this.buttons); }
}

export class GesturesMenu {
  constructor(public gestures: string) {}
  build(): Block { return Block.create('microbit_menu_gestures').withField('gestures', this.gestures); }
}

export class TiltDirectionAnyMenu {
  constructor(public tiltDirectionAny: string) {}
  build(): Block {
    return Block.create('microbit_menu_tiltDirectionAny').withField('tiltDirectionAny', this.tiltDirectionAny);
  }
}

export class TiltDirectionMenu {
  constructor(public tiltDirection: string) {}
  build(): Block {
    return Block.create('microbit_menu_tiltDirection').withField('tiltDirection', this.tiltDirection);
  }
}

export class TouchPinsMenu {
  constructor(public touchPins: string) {}
  build(): Block { return Block.create('microbit_menu_touchPins').withField('touchPins', this.touchPins); }
}

export class MatrixMenu {
  constructor(public matrix: string) {}
  build(): Block { return Block.create('matrix').withField('MATRIX', this.matrix); }
}
