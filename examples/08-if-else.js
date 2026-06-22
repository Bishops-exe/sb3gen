/**
 * If/Else and WaitUntil: pick a random number, judge it "big" or "small",
 * then wait for space to play again.
 *
 * Shows:
 *  - s.embed(variable) creates a draggable data_variable block
 *  - ifElse() with an embedded Gt boolean reporter as the condition
 *  - WaitUntil with embedded KeyPressed('space') — string overload auto-wires shadow
 */
import {
  Project, Costume,
  WhenFlagClicked, SetVariableTo, WaitUntil, SayForSecs,
  Random, Gt, KeyPressed,
} from '../src';

const project = new Project();
const stage = project.addStage();
stage.costumes.push(Costume.colored('backdrop1', '#fff5e6'));

const n = stage.addVariable('n', 0);

const sprite = project.addSprite('Judge');
sprite.costumes.push(Costume.rect('costume1', '#FFAB19', 80, 80, 12));

sprite.addScript(s => {
  s.push(WhenFlagClicked);
  s.push(SetVariableTo(s.embed(Random(1, 10)), n));

  s.ifElse(
    s.embed(Gt(s.embed(n), 5)),
    then => { then.push(SayForSecs('big!', 1)); },
    els  => { els.push(SayForSecs('small!', 1)); }
  );

  s.push(WaitUntil(s.embed(KeyPressed('space'))));
});

await project.save(`${import.meta.dir}/if-else.sb3`);
console.log('Written if-else.sb3');
