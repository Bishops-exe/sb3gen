import { Block } from '../block/Block';
import { InputVal } from '../block/InputVal';

export class PenClear {
  build(): Block { return Block.create('pen_clear'); }
}

export class PenStamp {
  build(): Block { return Block.create('pen_stamp'); }
}

export class PenDown {
  build(): Block { return Block.create('pen_penDown'); }
}

export class PenUp {
  build(): Block { return Block.create('pen_penUp'); }
}

export class SetPenColor {
  constructor(public color: InputVal) {}
  build(): Block { return Block.create('pen_setPenColorToColor').withInput('COLOR', this.color); }
}

export class ChangePenColorParam {
  constructor(public colorParam: InputVal, public value: InputVal) {}
  build(): Block {
    return Block.create('pen_changePenColorParamBy')
      .withInput('COLOR_PARAM', this.colorParam)
      .withInput('VALUE', this.value);
  }
}

export class SetPenColorParam {
  constructor(public colorParam: InputVal, public value: InputVal) {}
  build(): Block {
    return Block.create('pen_setPenColorParamTo')
      .withInput('COLOR_PARAM', this.colorParam)
      .withInput('VALUE', this.value);
  }
}

export class PenColorParamMenu {
  constructor(public colorParam: string) {}
  build(): Block { return Block.create('pen_menu_colorParam').withField('colorParam', this.colorParam); }
}

export class ChangePenSize {
  constructor(public size: InputVal) {}
  build(): Block { return Block.create('pen_changePenSizeBy').withInput('SIZE', this.size); }
}

export class SetPenSize {
  constructor(public size: InputVal) {}
  build(): Block { return Block.create('pen_setPenSizeTo').withInput('SIZE', this.size); }
}
