import {
  Project, Costume,
  WhenFlagClicked, SayForSecs,
} from '../src';

const project = new Project();
const stage = project.addStage();
stage.costumes.push(Costume.blank('backdrop1'));

const sprite = project.addSprite('Cat');
sprite.costumes.push(Costume.circle('costume1', '#4C97FF', 100));

sprite.addScript(s => {
  s.push(WhenFlagClicked);
  s.push(SayForSecs('Hello, World!', 2));
});

await project.save(`${import.meta.dir}/hello-world.sb3`);
console.log('Written hello-world.sb3');
