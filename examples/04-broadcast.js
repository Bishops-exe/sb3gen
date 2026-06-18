/**
 * Broadcast: clicking one sprite sends a message; the other receives it.
 *
 * Shows: broadcasts map, WhenIReceive, BroadcastAndWait,
 *        two sprites in the same project.
 */
import 'reflect-metadata';
import { writeFileSync } from 'fs';
import {
  Project, Stage, Sprite, Costume,
  BlocksMap, Script, InputVal,
  WhenThisSpriteClicked, BroadcastAndWait,
  WhenIReceive, SayForSecs,
  Zipper,
} from '../src';

const enc = new TextEncoder();
const BACKDROP = enc.encode(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360"><rect width="480" height="360" fill="#FFF9E6"/></svg>'
);
const SENDER_SVG = enc.encode(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="40" fill="#5CB1D6"/></svg>'
);
const RECEIVER_SVG = enc.encode(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="40" fill="#FF6680"/></svg>'
);

const GREET_BROADCAST_ID = 'greet-broadcast-id';
const GREET_BROADCAST_NAME = 'greet';

// --- Stage ---
const stage = new Stage();
stage.costumes.push(new Costume('backdrop1', BACKDROP));
stage.broadcasts[GREET_BROADCAST_ID] = GREET_BROADCAST_NAME;

// --- Sender sprite (left): click it → broadcast "greet" and wait ---
const sender = new Sprite('Sender');
sender.costumes.push(new Costume('costume1', SENDER_SVG));
sender.x = -80;

const senderBm = new BlocksMap();
const senderScript = new Script();
senderScript.push(new WhenThisSpriteClicked().build());
senderScript.push(
  new BroadcastAndWait(InputVal.broadcast(GREET_BROADCAST_NAME, GREET_BROADCAST_ID)).build()
);
senderBm.addScript(senderScript);
sender.blocks = senderBm.toRecord();

// --- Receiver sprite (right): when "greet" received → say "Hello!" ---
const receiver = new Sprite('Receiver');
receiver.costumes.push(new Costume('costume1', RECEIVER_SVG));
receiver.x = 80;

const receiverBm = new BlocksMap();
const receiverScript = new Script();
receiverScript.push(new WhenIReceive(GREET_BROADCAST_NAME).build());
receiverScript.push(new SayForSecs(InputVal.str('Hello!'), InputVal.num(2)).build());
receiverBm.addScript(receiverScript);
receiver.blocks = receiverBm.toRecord();

// --- Assemble ---
const project = new Project();
project.addStage(stage).addSprite(sender).addSprite(receiver);

const bytes = await new Zipper(project).buildToBytes();
writeFileSync('broadcast.sb3', bytes);
console.log('Written broadcast.sb3');
