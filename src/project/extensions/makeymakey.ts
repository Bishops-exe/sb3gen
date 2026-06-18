import { Block } from '../block/Block';
import { InputVal } from '../block/InputVal';

export class WhenMakeyKeyPressed {
  constructor(public key: InputVal) {}
  build(): Block { return Block.create('makeymakey_whenMakeyKeyPressed').withInput('KEY', this.key); }
}

export class WhenCodePressed {
  constructor(public sequence: InputVal) {}
  build(): Block { return Block.create('makeymakey_whenCodePressed').withInput('SEQUENCE', this.sequence); }
}

export class KeyMenu {
  constructor(public key: string) {}
  build(): Block { return Block.create('makeymakey_menu_KEY').withField('KEY', this.key); }
}

export class SequenceMenu {
  constructor(public sequence: string) {}
  build(): Block { return Block.create('makeymakey_menu_SEQUENCE').withField('SEQUENCE', this.sequence); }
}
