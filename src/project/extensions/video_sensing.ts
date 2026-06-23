import { Block, CompoundBlock } from '../block/Block';
import { InputVal, NumVal } from '../block/InputVal';
import { ck } from '../block/validate';

const c = InputVal.coerce;

function sh(main: string, input: string, menuOp: string, field: string, val: string): CompoundBlock {
  return { main: Block.create(main), slots: [{ inputName: input, block: Block.create(menuOp).addField(field, val) }] };
}

export function WhenMotionGreaterThan(reference: NumVal): Block {
  ck(reference, 'reference');
  return Block.create('videoSensing_whenMotionGreaterThan').addInput('REFERENCE', c(reference));
}

export function VideoOn(attribute: string, subject: string): CompoundBlock;
export function VideoOn(attribute: InputVal, subject: InputVal): Block;
export function VideoOn(attribute: string | InputVal, subject: string | InputVal): Block | CompoundBlock {
  ck(attribute, 'attribute'); ck(subject, 'subject');
  if (typeof attribute === 'string' && typeof subject === 'string') {
    return {
      main: Block.create('videoSensing_videoOn'),
      slots: [
        { inputName: 'ATTRIBUTE', block: Block.create('videoSensing_menu_ATTRIBUTE').addField('ATTRIBUTE', attribute) },
        { inputName: 'SUBJECT',   block: Block.create('videoSensing_menu_SUBJECT').addField('SUBJECT', subject) },
      ],
    };
  }
  return Block.create('videoSensing_videoOn')
    .addInput('ATTRIBUTE', attribute as InputVal)
    .addInput('SUBJECT', subject as InputVal);
}

export function VideoToggle(videoState: string): CompoundBlock;
export function VideoToggle(videoState: InputVal): Block;
export function VideoToggle(videoState: string | InputVal): Block | CompoundBlock {
  ck(videoState, 'videoState');
  if (typeof videoState === 'string') return sh('videoSensing_videoToggle', 'VIDEO_STATE', 'videoSensing_menu_VIDEO_STATE', 'VIDEO_STATE', videoState);
  return Block.create('videoSensing_videoToggle').addInput('VIDEO_STATE', videoState);
}

export function SetVideoTransparency(transparency: NumVal): Block {
  ck(transparency, 'transparency');
  return Block.create('videoSensing_setVideoTransparency').addInput('TRANSPARENCY', c(transparency));
}

export function AttributeMenu(attribute: string): Block {
  ck(attribute, 'attribute');
  return Block.create('videoSensing_menu_ATTRIBUTE').addField('ATTRIBUTE', attribute);
}

export function SubjectMenu(subject: string): Block {
  ck(subject, 'subject');
  return Block.create('videoSensing_menu_SUBJECT').addField('SUBJECT', subject);
}

export function VideoStateMenu(videoState: string): Block {
  ck(videoState, 'videoState');
  return Block.create('videoSensing_menu_VIDEO_STATE').addField('VIDEO_STATE', videoState);
}
