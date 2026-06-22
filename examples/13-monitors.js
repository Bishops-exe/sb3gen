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
  s.push(WhenFlagClicked);
  s.push(SetVariableTo(0, score));
});

// 1. Default scalar monitor
const scoreMonitor      = new monitors.Variable(score.id, score.name);
scoreMonitor.x          = 10;
scoreMonitor.y          = 10;
scoreMonitor.visible    = true;
scoreMonitor.spriteName = null;

// 2. Slider monitor
const speedMonitor      = new monitors.Variable(speed.id, speed.name);
speedMonitor.x          = 10;
speedMonitor.y          = 40;
speedMonitor.visible    = true;
speedMonitor.mode       = ScalarMonitorMode.slider;
speedMonitor.sliderMin  = 1;
speedMonitor.sliderMax  = 10;
speedMonitor.isDiscrete = true;

// 3. List monitor
const itemsMonitor   = new monitors.ListContents(items.id, items.name);
itemsMonitor.x       = 200;
itemsMonitor.y       = 10;
itemsMonitor.width   = 130;
itemsMonitor.height  = 160;
itemsMonitor.visible = true;

project.addMonitor(scoreMonitor.build());
project.addMonitor(speedMonitor.build());
project.addMonitor(itemsMonitor.build());

await project.save(`${import.meta.dir}/monitors.sb3`);
console.log('Written monitors.sb3');
