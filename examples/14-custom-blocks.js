/**
 * Custom blocks: define a reusable "say hello to %s %b times" block and call it.
 *
 * Shows: procedure(), DefineBlock(), CallBlock(), ArgumentReporterStringNumber().
 */
import {
  Project, Costume,
  WhenFlagClicked,
  procedure, DefineBlock, CallBlock,
  ArgumentReporterStringNumber, ArgumentReporterBoolean,
  If, Say, Eq,
  InputVal,
} from '../src';

const project = new Project();
const stage = project.addStage();
stage.costumes.push(Costume.colored('backdrop1', '#E6F0FF'));

const sprite = project.addSprite('Greeter');
sprite.costumes.push(Costume.rect('costume1', '#5C9EFF', 80, 80, 10));

// Define the spec — reuse for both DefineBlock and CallBlock
const greet = procedure('greet %s loudly: %b', [
  { name: 'name',  type: 'string_number' },
  { name: 'shout', type: 'boolean' },
]);

// Custom block definition script
sprite.addScript(s => {
  s.push(DefineBlock(greet));
  s.push(If(
    s.embed(ArgumentReporterBoolean('shout')),
    inner => {
      inner.push(Say(inner.embed(ArgumentReporterStringNumber('name'))));
    },
  ));
  s.push(Say(InputVal.str('hello')));
});

// Main script — calls the custom block
sprite.addScript(s => {
  s.push(WhenFlagClicked());
  s.push(CallBlock(greet, [InputVal.str('World'), s.embed(Eq(1, 1))]));
  s.push(CallBlock(greet, [InputVal.str('Scratch'), s.embed(Eq(1, 2))]));
});

await project.save(`${import.meta.dir}/custom-blocks.sb3`);
console.log('Written custom-blocks.sb3');
