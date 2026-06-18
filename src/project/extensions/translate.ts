import { Block } from '../block/Block';
import { InputVal } from '../block/InputVal';

export class GetTranslate {
  constructor(public words: InputVal, public language: InputVal) {}
  build(): Block {
    return Block.create('translate_getTranslate').withInput('WORDS', this.words).withInput('LANGUAGE', this.language);
  }
}

export class GetViewerLanguage {
  build(): Block { return Block.create('translate_getViewerLanguage'); }
}

export class LanguagesMenu {
  constructor(public languages: string) {}
  build(): Block { return Block.create('translate_menu_languages').withField('languages', this.languages); }
}
