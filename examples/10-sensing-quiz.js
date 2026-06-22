/**
 * Sensing quiz: ask the user a maths question and check the answer.
 *
 * Shows:
 *  - AskAndWait with a string question
 *  - embed() for deeply nested reporters: if → Eq → SensingAnswer
 */
import {
  Project, Costume,
  WhenFlagClicked, AskAndWait, SayForSecs,
  SensingAnswer, Eq,
} from '../src';

const project = new Project();
const stage = project.addStage();
stage.costumes.push(Costume.colored('backdrop1', '#e8f5e9'));

const sprite = project.addSprite('Quiz');
sprite.costumes.push(Costume.circle('costume1', '#43A047', 80));

sprite.addScript(s => {
  s.push(WhenFlagClicked);
  s.push(AskAndWait('What is 6 \xd7 7?'));

  s.if(
    s.embed(Eq(s.embed(SensingAnswer()), '42')),
    then => { then.push(SayForSecs('Correct!', 2)); }
  );

  s.push(SayForSecs('The answer is 42.', 2));
});

await project.save(`${import.meta.dir}/sensing-quiz.sb3`);
console.log('Written sensing-quiz.sb3');
