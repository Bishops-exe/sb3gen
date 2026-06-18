import { Block } from '../block/Block';

export class GoToPart {
  constructor(public part: string) {}
  build(): Block { return Block.create('faceSensing_goToPart').withField('PART', this.part); }
}

export class PointInFaceTiltDirection {
  build(): Block { return Block.create('faceSensing_pointInFaceTiltDirection'); }
}

export class SetSizeToFaceSize {
  build(): Block { return Block.create('faceSensing_setSizeToFaceSize'); }
}

export class WhenTilted {
  constructor(public direction: string) {}
  build(): Block { return Block.create('faceSensing_whenTilted').withField('DIRECTION', this.direction); }
}

export class WhenSpriteTouchesPart {
  constructor(public part: string) {}
  build(): Block { return Block.create('faceSensing_whenSpriteTouchesPart').withField('PART', this.part); }
}

export class WhenFaceDetected {
  build(): Block { return Block.create('faceSensing_whenFaceDetected'); }
}

export class FaceIsDetected {
  build(): Block { return Block.create('faceSensing_faceIsDetected'); }
}

export class FaceTilt {
  build(): Block { return Block.create('faceSensing_faceTilt'); }
}

export class FaceSize {
  build(): Block { return Block.create('faceSensing_faceSize'); }
}
