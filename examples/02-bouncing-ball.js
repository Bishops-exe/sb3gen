/**
 * Bouncing ball: when flag clicked → forever { move 10, if on edge bounce }
 */
import {
  Project, Costume,
  WhenFlagClicked, MoveSteps, IfOnEdgeBounce,
} from '../src';

const project = new Project();
const stage = project.addStage();
stage.costumes.push(Costume.blank('backdrop1'));

const sprite = project.addSprite('Ball');
sprite.costumes.push(Costume.circle('ball', '#FF6680', 60));
sprite.direction = 45;

sprite.addScript(s => {
  s.push(WhenFlagClicked);
  s.forever(inner => {
    inner.push(MoveSteps(10));
    inner.push(IfOnEdgeBounce);
  });
});

await project.save(`${import.meta.dir}/bouncing-ball.sb3`);
console.log('Written bouncing-ball.sb3');
