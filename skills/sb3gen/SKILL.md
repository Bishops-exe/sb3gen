---
name: sb3gen
description: >
  Generates Scratch 3 (.sb3) project files using the sb3gen TypeScript library.
  Use when the user asks to: create a Scratch project, generate an sb3 file,
  build Scratch blocks programmatically, add sprites/costumes/sounds, use
  Scratch extensions (pen, music, etc.), or work with the sb3gen API.
  Trigger: "make a Scratch project", "generate sb3", "create a sprite that...",
  "add blocks to...", "/sb3gen", or any Scratch project generation task.
---

You are an expert at generating Scratch 3 projects using the `sb3gen` TypeScript library.
Always import from `sb3gen`. Use `project.save(filename)` when running in Node/Bun. In browser environments use `new Zipper(project).buildToBytes()` instead.

## Core imports

```typescript
import {
  Project, Stage, Sprite, Script, Block, BlocksMap,
  InputVal, Zipper, Costume, Sound, Comment,
  WhenFlagClicked, WhenThisSpriteClicked, WhenKeyPressed,
  pen, music, // extension namespaces are named exports
  // ...any block factory functions needed
} from 'sb3gen';
```

## Project structure

```typescript
const project = new Project();
const stage = project.addStage();        // returns Stage
const sprite = project.addSprite('Cat'); // returns Sprite

// Node/Bun: write directly to disk
await project.save('output.sb3');

// Browser / any env: get raw bytes
const bytes = await new Zipper(project).buildToBytes(); // Uint8Array
```

## Adding scripts to a target

```typescript
sprite.addScript(s => {
  s.push(WhenFlagClicked());
  s.push(MoveSteps(10));
  s.push(Say('Hello!'));
});
```

## Control flow — standalone functions, pushed onto Script

Control blocks are imported functions, not Script methods. Pass them to `s.push()`:

```typescript
s.push(Forever(inner => {
  inner.push(MoveSteps(10));
  inner.push(Wait(0.1));
}));

s.push(Repeat(10, inner => {
  inner.push(TurnRight(36));
}));

s.push(If(condition, inner => {
  inner.push(Say('yes'));
}));

s.push(IfElse(condition,
  inner => inner.push(Say('yes')),
  inner => inner.push(Say('no'))
));

s.push(RepeatUntil(condition, inner => {
  inner.push(MoveSteps(5));
}));
```

## Embedding reporter blocks as inputs

Use `s.embed()` to nest a reporter block inside another block's input:

```typescript
s.push(Say(s.embed(MotionXPosition())));  // embed reporter
s.push(Say(s.embed(myVar)));              // embed variable ref
s.push(SetX(s.embed(Add(1, 2))));         // embed operator
```

## Variables, lists, broadcasts

Declare on the target before use. Returns a typed ref (`VarInputVal`, `ListInputVal`, `BroadcastInputVal`):

```typescript
const score = sprite.addVariable('score', 0); // initial value optional
const items = sprite.addList('items', []);
const msg   = stage.addBroadcast('start');

// Use the ref directly — note: value comes FIRST for variable/list blocks
s.push(SetVariableTo(100, score));
s.push(ChangeVariableBy(1, score));
s.push(AddToList('apple', items));
s.push(Broadcast(msg));

// Embed as reporter:
s.push(Say(s.embed(score)));
```

## InputVal constructors

```typescript
InputVal.num(42)           // number
InputVal.str('hello')      // string
InputVal.coerce(val)       // auto: number → num, string → str, InputVal → passthrough
InputVal.block(id)         // reference to another block by id
InputVal.varRef(name, id)  // variable reference
InputVal.listRef(name, id) // list reference
InputVal.broadcast(name, id)
InputVal.color('#ff0000')
InputVal.angle(90)
```

`Val = number | string | InputVal` — most block inputs accept `Val` and call `InputVal.coerce` internally.

## Key type aliases

| Type             | Accepts                        |
|------------------|--------------------------------|
| `Val`            | `number \| string \| InputVal` |
| `NumVal`         | `number \| InputVal`           |
| `VarParam`       | `string \| VarInputVal`        |
| `ListParam`      | `string \| ListInputVal`       |
| `BroadcastParam` | `string \| BroadcastInputVal`  |

## Block factory functions

### Events
`WhenFlagClicked()`, `WhenThisSpriteClicked()`, `WhenKeyPressed(key)`,
`WhenIReceive(broadcastParam)`, `Broadcast(broadcastInput)`, `BroadcastAndWait(broadcastInput)`,
`WhenBackdropSwitchesTo(backdrop)`, `WhenGreaterThan(value, menu)`

### Motion
`MoveSteps(n)`, `TurnRight(deg)`, `TurnLeft(deg)`, `GoToXY(x, y)`,
`GlideSecsToXY(secs, x, y)`, `PointInDirection(dir)`, `SetX(x)`, `SetY(y)`,
`ChangeXBy(dx)`, `ChangeYBy(dy)`, `IfOnEdgeBounce()`,
`GoTo('_mouse_' | '_random_' | spriteName)`, `GlideTo(secs, dest)`,
`PointTowards(target)`, `SetRotationStyle(style)`,
`MotionXPosition()`, `MotionYPosition()`, `MotionDirection()`

### Looks
`Say(msg)`, `SayForSecs(msg, secs)`, `Think(msg)`, `ThinkForSecs(msg, secs)`,
`Show()`, `Hide()`, `SetSizeTo(n)`, `ChangeSizeBy(n)`,
`SetEffect(val, effect)`, `ChangeEffect(val, effect)`, `ClearEffects()`,
`SwitchCostumeTo(name | inputVal)`, `NextCostume()`,
`SwitchBackdropTo(name | inputVal)`, `NextBackdrop()`

### Sound
`StartSound(soundMenu)`, `PlaySoundUntilDone(soundMenu)`,
`StopAllSounds()`, `SetVolumeTo(n)`, `ChangeVolumeBy(n)`

### Control
`Wait(secs)`, `WaitUntil(condition)`,
`Stop('all' | 'this script' | 'other scripts in sprite')`,
`WhenIStartAsAClone()`, `CreateCloneOf(target)`, `DeleteThisClone()`

### Sensing
`TouchingObject(touchingObjectMenu)`, `TouchingColor(color)`, `ColorIsTouchingColor(c1, c2)`,
`DistanceTo(distanceToMenu)`, `AskAndWait(question)`, `SensingAnswer()`,
`KeyPressed(key)`, `MouseDown()`, `MouseX()`, `MouseY()`,
`SetDragMode(mode)`, `SensingTimer()`, `ResetTimer()`, `SensingCurrent(currentMenu)`

### Operators
`Add(a, b)`, `Subtract(a, b)`, `Multiply(a, b)`, `Divide(a, b)`,
`Random(from, to)`, `Gt(a, b)`, `Lt(a, b)`, `Eq(a, b)`,
`And(a, b)`, `Or(a, b)`, `Not(a)`,
`Join(s1, s2)`, `LetterOf(letter, str)`, `LengthOf(str)`, `Contains(str, substr)`,
`Mod(a, b)`, `Round(n)`, `MathOp(num, operator)` (operator: `'abs'`, `'floor'`, `'ceiling'`, `'sqrt'`, etc.)

### Data (variables & lists) — value/item comes FIRST, variable/list ref comes LAST
`SetVariableTo(value, variable)`, `ChangeVariableBy(value, variable)`,
`ShowVariable(variable)`, `HideVariable(variable)`,
`AddToList(item, list)`, `DeleteOfList(index, list)`,
`DeleteAllOfList(list)`, `InsertAtList(item, index, list)`,
`ReplaceItemOfList(index, item, list)`, `ItemOfList(index, list)`,
`ItemNumOfList(item, list)`, `LengthOfList(list)`,
`ListContainsItem(item, list)`, `ShowList(list)`, `HideList(list)`

## Extensions

Extension namespaces are named exports from `'sb3gen'`:

```typescript
import { pen, music } from 'sb3gen';

s.push(pen.PenDown());
s.push(pen.PenUp());
s.push(pen.PenClear());
s.push(pen.SetPenColor(InputVal.color('#ff0000')));
s.push(pen.SetPenSize(4));
s.push(pen.ChangePenSize(1));
s.push(music.PlayDrumForBeats(1, 0.25));
```

Extensions auto-register in `project.extensions` when `project.serialize()` / `project.save()` is called.

## Costumes & sounds

Use the factory methods — `assetId`, `md5ext`, `dataFormat` are computed getters, not settable:

```typescript
import { Costume } from 'sb3gen';

sprite.costumes.push(Costume.blank('backdrop1'));               // white SVG
sprite.costumes.push(Costume.colored('bg', '#1e1e2e'));        // solid color SVG
sprite.costumes.push(Costume.circle('ball', '#FF6680', 60));   // circle SVG, radius 60
sprite.costumes.push(Costume.rect('box', '#4C97FF', 80, 80));  // rect SVG

// Raw bytes (PNG/SVG/etc.):
sprite.costumes.push(new Costume('costume1', uint8ArrayData));
```

## Building without saving to disk (Zipper)

```typescript
import { Zipper } from 'sb3gen';

const bytes = await new Zipper(project).buildToBytes(); // Uint8Array
const dataUri = await new Zipper(project).buildToDataURI(); // for <a download>
```

## Comments on blocks

```typescript
sprite.addScript(s => {
  s.pushCommented(WhenFlagClicked(), 'Entry point');
  s.push(Say('hello'));
});
```

## Low-level: raw Block

When no factory function exists:

```typescript
Block.create('opcode_name')
  .addInput('INPUT_NAME', InputVal.num(42))
  .addField('FIELD_NAME', 'value')
  .setMutation({ hasnext: 'false', ... })
```

## Common patterns

### Sprite that chases mouse forever
```typescript
sprite.addScript(s => {
  s.push(WhenFlagClicked());
  s.push(Forever(inner => {
    inner.push(PointTowards('_mouse_'));
    inner.push(MoveSteps(5));
  }));
});
```

### Variable counter
```typescript
const count = sprite.addVariable('count', 0);
sprite.addScript(s => {
  s.push(WhenFlagClicked());
  s.push(SetVariableTo(0, count));
  s.push(Repeat(10, inner => {
    inner.push(ChangeVariableBy(1, count));
    inner.push(Say(s.embed(count)));
    inner.push(Wait(0.5));
  }));
});
```

### Broadcast handshake
```typescript
const go = stage.addBroadcast('go');

stage.addScript(s => {
  s.push(WhenFlagClicked());
  s.push(BroadcastAndWait(go));
});

sprite.addScript(s => {
  s.push(WhenIReceive(go));
  s.push(Say('received!'));
});
```

## Gotchas

- `addVariable` / `addList` / `addBroadcast` return the ref object you pass to blocks — call them first.
- `s.embed()` queues the block for insertion — do **not** call `s.push()` on the same block.
- `GoTo`, `GlideTo`, `SwitchCostumeTo`, `SwitchBackdropTo`, `PointTowards`, `KeyPressed`, `CreateCloneOf` are overloaded: pass a `string` for a named menu option (auto-wires shadow block), pass an `InputVal` for a dynamic value.
- Data block param order: **value/item first, variable/list ref last** — `SetVariableTo(value, variable)`, `AddToList(item, list)`, etc.
- Control flow builders (`Forever`, `Repeat`, `If`, `IfElse`, `RepeatUntil`) are standalone imported functions — wrap them in `s.push(...)`.