/**
 * Counter: press space → score increases by 1, displayed on sprite.
 *
 * Shows: stage variables, variable references in blocks, key-press event.
 */
import 'reflect-metadata';
import { writeFileSync } from 'fs';
import {
  Project, Stage, Sprite, Costume,
  BlocksMap, Script, InputVal,
  WhenKeyPressed, ChangeVariableBy, Say,
  Zipper,
} from '../src';

const enc = new TextEncoder();
const BACKDROP = enc.encode(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360"><rect width="480" height="360" fill="#E6F0FF"/></svg>'
);
const SPRITE_SVG = enc.encode(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="10" fill="#FFAB19"/></svg>'
);

// Variable declared on the stage (global scope)
const SCORE_ID = 'score-variable-id';
const SCORE_NAME = 'score';

const stage = new Stage();
stage.costumes.push(new Costume('backdrop1', BACKDROP));
stage.variables[SCORE_ID] = [SCORE_NAME, 0];

const sprite = new Sprite('Counter');
sprite.costumes.push(new Costume('block', SPRITE_SVG));

// When space pressed: change score by 1, then say the new value
const bm = new BlocksMap();
const script = new Script();
script.push(new WhenKeyPressed('space').build());
script.push(new ChangeVariableBy(InputVal.num(1), SCORE_NAME).build());
// Say the current score (reference the variable as an input)
script.push(new Say(InputVal.varRef(SCORE_NAME, SCORE_ID)).build());
bm.addScript(script);

sprite.blocks = bm.toRecord();

const project = new Project();
project.addStage(stage).addSprite(sprite);

const bytes = await new Zipper(project).buildToBytes();
writeFileSync('counter.sb3', bytes);
console.log('Written counter.sb3');
