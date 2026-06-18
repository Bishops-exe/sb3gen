import 'reflect-metadata';
import { writeFileSync } from 'fs';
import {
  Project, Stage, Sprite, Costume,
  BlocksMap, Script, InputVal,
  WhenFlagClicked, SayForSecs,
  Zipper,
} from '../src';

const enc = new TextEncoder();

const BACKDROP = enc.encode(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360"><rect width="480" height="360" fill="white"/></svg>'
);
const SPRITE_SVG = enc.encode(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#4C97FF"/></svg>'
);

const stage = new Stage();
stage.costumes.push(new Costume('backdrop1', BACKDROP));

const sprite = new Sprite('Cat');
sprite.costumes.push(new Costume('costume1', SPRITE_SVG));

const bm = new BlocksMap();
const script = new Script();
script.push(new WhenFlagClicked().build());
script.push(new SayForSecs(InputVal.str('Hello, World!'), InputVal.num(2)).build());
bm.addScript(script);

sprite.blocks = bm.toRecord();

const project = new Project();
project.addStage(stage).addSprite(sprite);

const bytes = await new Zipper(project).buildToBytes();
writeFileSync('hello-world.sb3', bytes);
console.log('Written hello-world.sb3');
