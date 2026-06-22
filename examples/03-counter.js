/**
 * Counter: press space → score increases by 1, displayed on sprite.
 *
 * Shows: stage.addVariable(), variable reference passed directly as Val.
 */
import {
  Project, Costume,
  WhenKeyPressed, ChangeVariableBy, Say,
} from '../src';

const project = new Project();
const stage = project.addStage();
stage.costumes.push(Costume.colored('backdrop1', '#E6F0FF'));

const score = stage.addVariable('score', 0);

const sprite = project.addSprite('Counter');
sprite.costumes.push(Costume.rect('block', '#FFAB19', 80, 80, 10));

sprite.addScript(s => {
  s.push(WhenKeyPressed('space'));
  s.push(ChangeVariableBy(1, score));
  s.push(Say(score));
});

await project.save(`${import.meta.dir}/counter.sb3`);
console.log('Written counter.sb3');
