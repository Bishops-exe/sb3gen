import { Block, CompoundBlock } from '../block/Block';
import { InputVal, Val } from '../block/InputVal';
import { ck } from '../block/validate';

const c = InputVal.coerce;

function sh(main: string, input: string, menuOp: string, field: string, val: string): CompoundBlock {
  return { main: Block.create(main), slots: [{ inputName: input, block: Block.create(menuOp).addField(field, val) }] };
}

export function SpeakAndWait(words: Val): Block {
  ck(words, 'words');
  return Block.create('text2speech_speakAndWait').addInput('WORDS', c(words));
}

export function SetVoice(voice: string): CompoundBlock;
export function SetVoice(voice: InputVal): Block;
export function SetVoice(voice: string | InputVal): Block | CompoundBlock {
  ck(voice, 'voice');
  if (typeof voice === 'string') return sh('text2speech_setVoice', 'VOICE', 'text2speech_menu_voices', 'voices', voice);
  return Block.create('text2speech_setVoice').addInput('VOICE', voice);
}

export function SetLanguage(language: string): CompoundBlock;
export function SetLanguage(language: InputVal): Block;
export function SetLanguage(language: string | InputVal): Block | CompoundBlock {
  ck(language, 'language');
  if (typeof language === 'string') return sh('text2speech_setLanguage', 'LANGUAGE', 'text2speech_menu_languages', 'languages', language);
  return Block.create('text2speech_setLanguage').addInput('LANGUAGE', language);
}

export function VoicesMenu(voices: string): Block {
  ck(voices, 'voices');
  return Block.create('text2speech_menu_voices').addField('voices', voices);
}

export function LanguagesMenu(languages: string): Block {
  ck(languages, 'languages');
  return Block.create('text2speech_menu_languages').addField('languages', languages);
}
