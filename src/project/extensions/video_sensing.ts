import { Block } from '../block/Block';
import { InputVal } from '../block/InputVal';

export class WhenMotionGreaterThan {
  constructor(public reference: InputVal) {}
  build(): Block {
    return Block.create('videoSensing_whenMotionGreaterThan').withInput('REFERENCE', this.reference);
  }
}

export class VideoOn {
  constructor(public attribute: InputVal, public subject: InputVal) {}
  build(): Block {
    return Block.create('videoSensing_videoOn')
      .withInput('ATTRIBUTE', this.attribute)
      .withInput('SUBJECT', this.subject);
  }
}

export class VideoToggle {
  constructor(public videoState: InputVal) {}
  build(): Block { return Block.create('videoSensing_videoToggle').withInput('VIDEO_STATE', this.videoState); }
}

export class SetVideoTransparency {
  constructor(public transparency: InputVal) {}
  build(): Block {
    return Block.create('videoSensing_setVideoTransparency').withInput('TRANSPARENCY', this.transparency);
  }
}

export class AttributeMenu {
  constructor(public attribute: string) {}
  build(): Block { return Block.create('videoSensing_menu_ATTRIBUTE').withField('ATTRIBUTE', this.attribute); }
}

export class SubjectMenu {
  constructor(public subject: string) {}
  build(): Block { return Block.create('videoSensing_menu_SUBJECT').withField('SUBJECT', this.subject); }
}

export class VideoStateMenu {
  constructor(public videoState: string) {}
  build(): Block { return Block.create('videoSensing_menu_VIDEO_STATE').withField('VIDEO_STATE', this.videoState); }
}
