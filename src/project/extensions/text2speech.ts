import { Block } from '../block/Block';
import { InputVal } from '../block/InputVal';

export class SpeakAndWait {
  constructor(public words: InputVal) {}
  build(): Block { return Block.create('text2speech_speakAndWait').withInput('WORDS', this.words); }
}

export class SetVoice {
  constructor(public voice: InputVal) {}
  build(): Block { return Block.create('text2speech_setVoice').withInput('VOICE', this.voice); }
}

export class SetLanguage {
  constructor(public language: InputVal) {}
  build(): Block { return Block.create('text2speech_setLanguage').withInput('LANGUAGE', this.language); }
}

export class VoicesMenu {
  constructor(public voices: string) {}
  build(): Block { return Block.create('text2speech_menu_voices').withField('voices', this.voices); }
}

export class LanguagesMenu {
  constructor(public languages: string) {}
  build(): Block { return Block.create('text2speech_menu_languages').withField('languages', this.languages); }
}
