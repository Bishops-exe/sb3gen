/**
 * Costume animation: three-frame sprite cycles at ~10 fps.
 *
 * Shows:
 *  - Multiple Costume entries on one sprite
 *  - SwitchCostumeTo('frame1') — string overload auto-wires shadow menu
 *  - NextCostume in a forever loop for frame cycling
 *  - Wait for frame-rate control
 */
import {
  Project, Costume,
  WhenFlagClicked, SwitchCostumeTo, NextCostume, Wait,
} from '../src';

const project = new Project();
const stage = project.addStage();
stage.costumes.push(Costume.colored('backdrop1', '#e3f2fd'));

const sprite = project.addSprite('Animator');
sprite.costumes.push(Costume.circle('frame1', '#FF6680', 30));
sprite.costumes.push(Costume.circle('frame2', '#FF9933', 50));
sprite.costumes.push(Costume.circle('frame3', '#FFCC00', 70));
sprite.currentCostume = 0;

sprite.addScript(s => {
  s.push(WhenFlagClicked);
  s.push(SwitchCostumeTo('frame1'));
  s.forever(inner => {
    inner.push(NextCostume);
    inner.push(Wait(0.1));
  });
});

await project.save(`${import.meta.dir}/animation.sb3`);
console.log('Written animation.sb3');
