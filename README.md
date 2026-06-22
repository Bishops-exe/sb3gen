# sb3gen

Programmatically generate and edit [Scratch](https://scratch.mit.edu/) `.sb3` files with a typed JavaScript/TypeScript API.

```js
import { Project, Costume, WhenFlagClicked, SayForSecs } from 'sb3gen';

const project = new Project();
const stage = project.addStage();
stage.costumes.push(Costume.blank('backdrop1'));

const sprite = project.addSprite('Cat');
sprite.costumes.push(Costume.circle('costume1', '#4C97FF', 100));

sprite.addScript(s => {
  s.push(WhenFlagClicked);
  s.push(SayForSecs('Hello, World!', 2));
});

await project.save('hello-world.sb3');
```

## Installation

```sh
npm install sb3gen
# or
bun add sb3gen
```

## Core concepts

### Project

```js
const project = new Project();
const stage = project.addStage();   // returns Stage
const sprite = project.addSprite('Name'); // returns Sprite
await project.save('out.sb3');
```

### Costumes

Four SVG factory methods — no external files needed:

```js
Costume.blank('name')                        // white rectangle
Costume.colored('name', '#hex')              // solid color fill
Costume.circle('name', '#hex', size)         // filled circle
Costume.rect('name', '#hex', w, h, radius)   // rounded rectangle
```

Pass any `new Costume(name, uint8Array)` for custom PNG/SVG data.

### Scripts

`addScript` yields a `Script` builder. Push blocks, embed reporters, and use loop helpers:

```js
sprite.addScript(s => {
  s.push(WhenFlagClicked);
  s.push(MoveSteps(10));

  s.forever(inner => {
    inner.push(MoveSteps(10));
    inner.push(IfOnEdgeBounce);
  });

  s.repeat(5, inner => {
    inner.push(TurnRight(72));
  });

  // embed a reporter block as an input value
  s.push(GoToXY(
    s.embed(Random(-200, 200)),
    s.embed(Random(-150, 150))
  ));

  s.xy(300, 100); // set script position in the editor
});
```

### Variables, lists, and broadcasts

```js
const score = stage.addVariable('score', 0);    // VarInputVal
const items = stage.addList('items');            // ListInputVal
const greet = stage.addBroadcast('greet');       // BroadcastInputVal
```

Pass the returned reference directly to block functions — no string lookups needed:

```js
s.push(ChangeVariableBy(1, score));
s.push(AddToList('hello', items));
s.push(BroadcastAndWait(greet));
s.push(WhenIReceive(greet));
```

### Extensions

Extensions are auto-detected from opcodes when you call `project.save()`. Import blocks from the extension namespace:

```js
import { pen, music } from 'sb3gen';

s.push(pen.PenClear);
s.push(pen.SetPenColor(InputVal.color('#FFD700')));
s.push(pen.SetPenSize(4));
s.push(pen.PenDown);
```

Available namespaces: `pen`, `music`, `wedo2`, `boost`, `ev3`, `gdxfor`, `makeymakey`, `microbit`, `translate`, `text2speech`, `videoSensing`, `faceSensing`.

### Editing existing `.sb3` files

```js
import { readFileSync } from 'fs';
import { Zipper } from 'sb3gen';

const project = await Zipper.decode(readFileSync('input.sb3'));

const sprite = project.targets.find(t => !t.isStage);
sprite.name = 'Renamed';
sprite.addScript(s => {
  s.push(WhenFlagClicked);
  s.push(Say('Injected!'));
});

await project.save('output.sb3');
```

## Examples

Run any example with `bun run examples/<file>`:

| File | Demonstrates |
|------|-------------|
| `01-hello-world.js` | Basic project, sprite, say block |
| `02-bouncing-ball.js` | `forever`, `IfOnEdgeBounce` |
| `03-counter.js` | Variables, `ChangeVariableBy` |
| `04-broadcast.js` | `addBroadcast`, `WhenIReceive`, two sprites |
| `05-edit-existing.js` | `Zipper.decode`, mutate and re-save |
| `06-clones.js` | `CreateCloneOf`, `WhenIStartAsAClone`, `s.embed` |
| `07-operators.js` | Math and logic reporter blocks |
| `08-if-else.js` | `s.ifElse`, conditionals |
| `09-pen-star.js` | Pen extension, `repeat` |
| `10-sensing-quiz.js` | `ask`/`answer`, sensing blocks |
| `11-animation.js` | Costume switching, timing |
| `12-lists.js` | `addList`, `ItemOfList`, nested embeds |
| `13-monitors.js` | Stage monitors |

## Building

```sh
bun install
bun run build
```

## License

[GPLv3](https://github.com/Bishops-exe/sb3gen/blob/main/LICENSE)