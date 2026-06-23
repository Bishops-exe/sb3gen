/**
 * Monitors: display a variable, a slider variable, and a list on screen.
 *
 * Shows:
 *  - stage.addVariable() / stage.addList() return typed refs with IDs
 *  - monitors.Variable / monitors.ListContents using the returned IDs
 *  - ScalarMonitorMode.default / ScalarMonitorMode.slider
 *  - sliderMin, sliderMax, isDiscrete for slider-mode monitors
 */
import {
  Project, Costume,
  WhenFlagClicked, SetVariableTo,
  monitors, ScalarMonitorMode,
} from '../src';

const project = new Project();
const stage = project.addStage();
stage.costumes.push(Costume.colored('backdrop1', '#f9fbe7'));

const score = stage.addVariable('score', 0);
const speed = stage.addVariable('speed', 5);
const items = stage.addList('items', ['alpha', 'beta', 'gamma']);

const sprite = project.addSprite('Player');
sprite.costumes.push(Costume.circle('costume1', '#8BC34A', 60));

sprite.addScript(s => {
  s.push(WhenFlagClicked());
  s.push(SetVariableTo(0, score));
});

// 1. Default scalar monitor
project.addMonitor(monitors.Variable(score, { x: 10, y: 10 }));

// 2. Slider monitor
project.addMonitor(monitors.Variable(speed, {
  x: 10, y: 40,
  mode: ScalarMonitorMode.slider,
  sliderMin: 1, sliderMax: 10, isDiscrete: true,
}));

// 3. List monitor
project.addMonitor(monitors.ListContents(items, {
  x: 200, y: 10, width: 130, height: 160,
}));

await project.save(`${import.meta.dir}/monitors.sb3`);
console.log('Written monitors.sb3');