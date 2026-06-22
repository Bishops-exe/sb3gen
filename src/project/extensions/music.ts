import { Block, CompoundBlock } from '../block/Block';
import { InputVal, NumVal } from '../block/InputVal';
import { ck } from '../block/validate';

const c = InputVal.coerce;

function sh(main: string, input: string, menuOp: string, field: string, val: string): CompoundBlock {
  return { main: Block.create(main), slots: [{ inputName: input, block: Block.create(menuOp).withField(field, val) }] };
}

export function PlayDrumForBeats(drum: string, beats: NumVal): CompoundBlock;
export function PlayDrumForBeats(drum: InputVal, beats: NumVal): Block;
export function PlayDrumForBeats(drum: string | InputVal, beats: NumVal): Block | CompoundBlock {
  ck(drum, 'drum'); ck(beats, 'beats');
  if (typeof drum === 'string') {
    const compound = sh('music_playDrumForBeats', 'DRUM', 'music_menu_DRUM', 'DRUM', drum);
    compound.main.withInput('BEATS', c(beats));
    return compound;
  }
  return Block.create('music_playDrumForBeats').withInput('DRUM', drum).withInput('BEATS', c(beats));
}

export function DrumMenu(drum: string): Block {
  ck(drum, 'drum');
  return Block.create('music_menu_DRUM').withField('DRUM', drum);
}

export function RestForBeats(beats: NumVal): Block {
  ck(beats, 'beats');
  return Block.create('music_restForBeats').withInput('BEATS', c(beats));
}

export function PlayNoteForBeats(note: string, beats: NumVal): CompoundBlock;
export function PlayNoteForBeats(note: InputVal, beats: NumVal): Block;
export function PlayNoteForBeats(note: string | InputVal, beats: NumVal): Block | CompoundBlock {
  ck(note, 'note'); ck(beats, 'beats');
  if (typeof note === 'string') {
    const compound = sh('music_playNoteForBeats', 'NOTE', 'note', 'NOTE', note);
    compound.main.withInput('BEATS', c(beats));
    return compound;
  }
  return Block.create('music_playNoteForBeats').withInput('NOTE', note).withInput('BEATS', c(beats));
}

export function NoteMenu(note: string): Block {
  ck(note, 'note');
  return Block.create('note').withField('NOTE', note);
}

export function SetInstrument(instrument: string): CompoundBlock;
export function SetInstrument(instrument: InputVal): Block;
export function SetInstrument(instrument: string | InputVal): Block | CompoundBlock {
  ck(instrument, 'instrument');
  if (typeof instrument === 'string') return sh('music_setInstrument', 'INSTRUMENT', 'music_menu_INSTRUMENT', 'INSTRUMENT', instrument);
  return Block.create('music_setInstrument').withInput('INSTRUMENT', instrument);
}

export function InstrumentMenu(instrument: string): Block {
  ck(instrument, 'instrument');
  return Block.create('music_menu_INSTRUMENT').withField('INSTRUMENT', instrument);
}

export function SetTempo(tempo: NumVal): Block {
  ck(tempo, 'tempo');
  return Block.create('music_setTempo').withInput('TEMPO', c(tempo));
}

export function ChangeTempo(tempo: NumVal): Block {
  ck(tempo, 'tempo');
  return Block.create('music_changeTempo').withInput('TEMPO', c(tempo));
}

export function GetTempo(): Block { return Block.create('music_getTempo'); }
