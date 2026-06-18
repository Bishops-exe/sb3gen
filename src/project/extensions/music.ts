import { Block } from '../block/Block';
import { InputVal } from '../block/InputVal';

export class PlayDrumForBeats {
  constructor(public drum: InputVal, public beats: InputVal) {}
  build(): Block {
    return Block.create('music_playDrumForBeats').withInput('DRUM', this.drum).withInput('BEATS', this.beats);
  }
}

export class DrumMenu {
  constructor(public drum: string) {}
  build(): Block { return Block.create('music_menu_DRUM').withField('DRUM', this.drum); }
}

export class RestForBeats {
  constructor(public beats: InputVal) {}
  build(): Block { return Block.create('music_restForBeats').withInput('BEATS', this.beats); }
}

export class PlayNoteForBeats {
  constructor(public note: InputVal, public beats: InputVal) {}
  build(): Block {
    return Block.create('music_playNoteForBeats').withInput('NOTE', this.note).withInput('BEATS', this.beats);
  }
}

export class NoteMenu {
  constructor(public note: string) {}
  build(): Block { return Block.create('note').withField('NOTE', this.note); }
}

export class SetInstrument {
  constructor(public instrument: InputVal) {}
  build(): Block { return Block.create('music_setInstrument').withInput('INSTRUMENT', this.instrument); }
}

export class InstrumentMenu {
  constructor(public instrument: string) {}
  build(): Block { return Block.create('music_menu_INSTRUMENT').withField('INSTRUMENT', this.instrument); }
}

export class SetTempo {
  constructor(public tempo: InputVal) {}
  build(): Block { return Block.create('music_setTempo').withInput('TEMPO', this.tempo); }
}

export class ChangeTempo {
  constructor(public tempo: InputVal) {}
  build(): Block { return Block.create('music_changeTempo').withInput('TEMPO', this.tempo); }
}

export class GetTempo {
  build(): Block { return Block.create('music_getTempo'); }
}
