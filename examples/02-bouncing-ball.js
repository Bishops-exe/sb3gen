/**
 * Bouncing ball: when flag clicked → forever { move 10, if on edge bounce }
 *
 * Nested substacks require manually linking parent IDs.
 * Pattern: build inner blocks first (to get their IDs), then build the
 * container block referencing those IDs, then fix topLevel/parent on the
 * first inner block.
 */
import 'reflect-metadata';
import { writeFileSync } from 'fs';
import {
  Project, Stage, Sprite, Costume,
  BlocksMap, Script, InputVal,
  WhenFlagClicked, MoveSteps, IfOnEdgeBounce, Forever,
  Zipper,
} from '../src';

const enc = new TextEncoder();
const BACKDROP = enc.encode(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360"><rect width="480" height="360" fill="white"/></svg>'
);
const BALL_SVG = enc.encode(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#FF6680"/></svg>'
);

const stage = new Stage();
stage.costumes.push(new Costume('backdrop1', BACKDROP));

const sprite = new Sprite('Ball');
sprite.costumes.push(new Costume('ball', BALL_SVG));
sprite.direction = 45;

// --- Build the inner substack first so we know the first block's ID ---
const innerScript = new Script();
const firstInnerId = innerScript.push(new MoveSteps(InputVal.num(10)).build());
innerScript.push(new IfOnEdgeBounce().build());

// --- Build the main script ---
const mainScript = new Script();
mainScript.push(new WhenFlagClicked().build());
const foreverId = mainScript.push(new Forever(InputVal.block(firstInnerId)).build());

// Fix the first inner block: it belongs to the forever, not at top-level
const innerRecord = innerScript.toRecord();
const firstInner = innerRecord[firstInnerId];
firstInner.parent = foreverId;
firstInner.topLevel = false;
firstInner.x = undefined;
firstInner.y = undefined;

const bm = new BlocksMap();
bm.addScript(mainScript);
for (const [id, block] of Object.entries(innerRecord)) bm.addBlock(id, block);

sprite.blocks = bm.toRecord();

const project = new Project();
project.addStage(stage).addSprite(sprite);

const bytes = await new Zipper(project).buildToBytes();
writeFileSync('bouncing-ball.sb3', bytes);
console.log('Written bouncing-ball.sb3');
