/**
 * Broadcast: clicking one sprite sends a message; the other receives it.
 *
 * Shows: stage.addBroadcast(), WhenIReceive, BroadcastAndWait.
 */
import {
  Project, Costume,
  WhenThisSpriteClicked, BroadcastAndWait,
  WhenIReceive, SayForSecs,
} from '../src';

const project = new Project();
const stage = project.addStage();
stage.costumes.push(Costume.colored('backdrop1', '#FFF9E6'));

const greet = stage.addBroadcast('greet');

const sender = project.addSprite('Sender');
sender.costumes.push(Costume.circle('costume1', '#5CB1D6', 80));
sender.x = -80;
sender.addScript(s => {
  s.push(WhenThisSpriteClicked());
  s.push(BroadcastAndWait(greet));
});

const receiver = project.addSprite('Receiver');
receiver.costumes.push(Costume.circle('costume1', '#FF6680', 80));
receiver.x = 80;
receiver.addScript(s => {
  s.push(WhenIReceive(greet));
  s.push(SayForSecs('Hello!', 2));
});

await project.save(`${import.meta.dir}/broadcast.sb3`);
console.log('Written broadcast.sb3');
