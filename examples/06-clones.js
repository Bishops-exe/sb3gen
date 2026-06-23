/**
 * Clones: when flag clicked → forever spawn a clone every 0.5 s.
 * Each clone jumps to a random position, waits 1.5 s, then deletes itself.
 *
 * Shows:
 *  - CreateCloneOf('_myself_') — string overload auto-wires shadow menu
 *  - embed() for reporter blocks (Random) embedded in GoToXY inputs
 *  - Multiple scripts on one sprite via addScript()
 */
import {
  Project, Costume,
  WhenFlagClicked, Wait,
  CreateCloneOf,
  WhenIStartAsAClone, GoToXY, Random, DeleteThisClone,
  Forever,
} from '../src';

const project = new Project();
const stage = project.addStage();
stage.costumes.push(Costume.colored('backdrop1', '#1a1a2e'));

const sprite = project.addSprite('Particle');
sprite.costumes.push(Costume.circle('particle', '#FFD700', 20));

// Script 1: forever spawn a clone every 0.5 s
sprite.addScript(s => {
  s.push(WhenFlagClicked());
  s.push(Forever(inner => {
    inner.push(CreateCloneOf('_myself_'));
    inner.push(Wait(0.5));
  }));
});

// Script 2: clone behavior
sprite.addScript(s => {
  s.setXY(300, 0);
  s.push(WhenIStartAsAClone());
  s.push(GoToXY(
    s.embed(Random(-200, 200)),
    s.embed(Random(-150, 150))
  ));
  s.push(Wait(1.5));
  s.push(DeleteThisClone());
});

await project.save(`${import.meta.dir}/clones.sb3`);
console.log('Written clones.sb3');
