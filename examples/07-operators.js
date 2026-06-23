/**
 * Operators: pick a random number, double it, say "pick × 2 = <result>".
 *
 * Shows:
 *  - stage.addVariable() returns a VarInputVal
 *  - s.embed(variable) creates a draggable data_variable block
 *  - reporter blocks nested in other inputs
 */
import {
  Project, Costume,
  WhenFlagClicked, SetVariableTo, SayForSecs,
  Random, Multiply, Join,
} from '../src';

const project = new Project();
const stage = project.addStage();
stage.costumes.push(Costume.colored('backdrop1', '#f0f4ff'));

const pick    = stage.addVariable('pick', 0);
const doubled = stage.addVariable('doubled', 0);

const sprite = project.addSprite('Math');
sprite.costumes.push(Costume.circle('costume1', '#5CB1D6', 80));

sprite.addScript(s => {
  s.push(WhenFlagClicked());
  s.push(SetVariableTo(s.embed(Random(1, 10)), pick));
  s.push(SetVariableTo(s.embed(Multiply(s.embed(pick), 2)), doubled));
  s.push(SayForSecs(s.embed(Join('pick \xd7 2 = ', s.embed(doubled))), 2));
});

await project.save(`${import.meta.dir}/operators.sb3`);
console.log('Written operators.sb3');
