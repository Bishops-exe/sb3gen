import { Block } from '../block/Block';
import { ck } from '../block/validate';

export function GoToPart(part: string): Block {
  ck(part, 'part');
  return Block.create('faceSensing_goToPart').withField('PART', part);
}

export function PointInFaceTiltDirection(): Block {
  return Block.create('faceSensing_pointInFaceTiltDirection');
}

export function SetSizeToFaceSize(): Block { return Block.create('faceSensing_setSizeToFaceSize'); }

export function WhenTilted(direction: string): Block {
  ck(direction, 'direction');
  return Block.create('faceSensing_whenTilted').withField('DIRECTION', direction);
}

export function WhenSpriteTouchesPart(part: string): Block {
  ck(part, 'part');
  return Block.create('faceSensing_whenSpriteTouchesPart').withField('PART', part);
}

export function WhenFaceDetected(): Block { return Block.create('faceSensing_whenFaceDetected'); }

export function FaceIsDetected(): Block { return Block.create('faceSensing_faceIsDetected'); }

export function FaceTilt(): Block { return Block.create('faceSensing_faceTilt'); }

export function FaceSize(): Block { return Block.create('faceSensing_faceSize'); }
