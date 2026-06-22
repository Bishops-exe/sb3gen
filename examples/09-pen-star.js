/**
 * Pen star: draws a 5-pointed star using the Pen extension.
 *
 * Shows:
 *  - Registering Extension.Pen on the project
 *  - pen.PenClear, pen.PenDown, pen.PenUp
 *  - pen.SetPenColor with InputVal.color (hex string)
 *  - pen.SetPenSize
 *  - repeat() to draw the 5 sides
 */
import {
  Project, Costume,
  InputVal,
  WhenFlagClicked, GoToXY, PointInDirection,
  MoveSteps, TurnRight,
  pen,
} from '../src';

const project = new Project();
const stage = project.addStage();
stage.costumes.push(Costume.colored('backdrop1', '#1e1e2e'));

const sprite = project.addSprite('Pen');
sprite.costumes.push(Costume.circle('tip', 'transparent', 10));

sprite.addScript(s => {
  s.push(WhenFlagClicked);
  s.push(pen.PenClear);
  s.push(GoToXY(0, -60));
  s.push(PointInDirection(InputVal.angle(0)));
  s.push(pen.SetPenColor(InputVal.color('#FFD700')));
  s.push(pen.SetPenSize(4));
  s.push(pen.PenDown);
  s.repeat(5, inner => {
    inner.push(MoveSteps(150));
    inner.push(TurnRight(144));
  });
  s.push(pen.PenUp);
});

await project.save(`${import.meta.dir}/pen-star.sb3`);
console.log('Written pen-star.sb3');
