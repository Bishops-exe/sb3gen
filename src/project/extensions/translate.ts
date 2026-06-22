import { Block, CompoundBlock } from '../block/Block';
import { InputVal, Val } from '../block/InputVal';
import { ck } from '../block/validate';

const c = InputVal.coerce;

function sh(main: string, input: string, menuOp: string, field: string, val: string): CompoundBlock {
  return { main: Block.create(main), slots: [{ inputName: input, block: Block.create(menuOp).withField(field, val) }] };
}

export function GetTranslate(words: Val, language: string): CompoundBlock;
export function GetTranslate(words: Val, language: InputVal): Block;
export function GetTranslate(words: Val, language: string | InputVal): Block | CompoundBlock {
  ck(words, 'words'); ck(language, 'language');
  if (typeof language === 'string') {
    const compound = sh('translate_getTranslate', 'LANGUAGE', 'translate_menu_languages', 'languages', language);
    compound.main.withInput('WORDS', c(words));
    return compound;
  }
  return Block.create('translate_getTranslate').withInput('WORDS', c(words)).withInput('LANGUAGE', language);
}

export function GetViewerLanguage(): Block { return Block.create('translate_getViewerLanguage'); }

export function LanguagesMenu(languages: string): Block {
  ck(languages, 'languages');
  return Block.create('translate_menu_languages').withField('languages', languages);
}
