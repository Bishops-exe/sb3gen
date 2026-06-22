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
Always import from `sb3gen`. You can run this skill everywhere, even in the web. 
Note: the `Project.save();` function will not work, use `await new Zipper().buildToBytes(); // Uint8Array`

## Core imports

```typescript
import {
  Project, Stage, Sprite, Script, Block, BlocksMap,
  InputVal, Zipper, Costume, Sound, Comment,
  WhenFlagClicked, WhenThisSpriteClicked, WhenKeyPressed,
  // ...any block factory functions needed
} from 'sb3gen';
import * as pen from 'sb3gen/pen';   // extension namespaces
import * as music from 'sb3gen/music';
```

## Project structure

```typescript
const project = new Project();
const stage = project.addStage();   // returns Stage
const sprite = project.addSprite('Cat');  // returns Sprite

await project.save('output.sb3');   // writes the .sb3 file
```

## Adding scripts to a target

```typescript
sprite.addScript(s => {
  s.push(WhenFlagClicked());
  s.push(MoveSteps(10));
  s.push(Say('Hello!'));
});
```

## Control flow helpers on Script

```typescript
s.forever(inner => {
  inner.push(MoveSteps(10));
  inner.push(Wait(0.1));
});

s.repeat(10, inner => {
  inner.push(TurnRight(36));
});

s.if(condition, inner => {
  inner.push(Say('yes'));
});

s.ifElse(condition,
  inner => inner.push(Say('yes')),
  inner => inner.push(Say('no'))
);

s.repeatUntil(condition, inner => {
  inner.push(MoveSteps(5));
});
```

## Embedding reporter blocks as inputs

Use `s.embed()` to nest a reporter block inside another block's input:

```typescript
s.push(Say(s.embed(XPosition())));        // embed reporter
s.push(Say(s.embed(myVar)));              // embed variable ref
s.push(SetXTo(s.embed(Add(1, 2))));       // embed operator
```

## Variables, lists, broadcasts

Declare on the target before use. Returns a typed ref (`VarInputVal`, `ListInputVal`, `BroadcastInputVal`):

```typescript
const score = sprite.addVariable('score', 0);   // initial value optional
const items = sprite.addList('items', []);
const msg   = stage.addBroadcast('start');

// Use the ref as an InputVal:
s.push(SetVariableTo(score, 100));
s.push(AddToList(items, 'apple'));
s.push(Broadcast(InputVal.broadcast(msg.name, msg.id)));

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

## Block factory functions (from Blocks.ts)

### Events
`WhenFlagClicked()`, `WhenThisSpriteClicked()`, `WhenKeyPressed(key)`,
`WhenIReceive(broadcastParam)`, `Broadcast(inputVal)`, `BroadcastAndWait(inputVal)`,
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
`PlaySound(name | inputVal)`, `PlaySoundUntilDone(name | inputVal)`,
`StopAllSounds()`, `SetVolumeTo(n)`, `ChangeVolumeBy(n)`

### Control
`Wait(secs)`, `StopAll()` / `StopThisScript()` / `StopOtherScripts()`,
`WhenIStartAsClone()`, `CreateCloneOf(target)`, `DeleteThisClone()`

### Sensing
`Touching(target)`, `TouchingColor(color)`, `ColorIsTouchingColor(c1, c2)`,
`DistanceTo(target)`, `AskAndWait(question)`, `Answer()`,
`KeyPressed(key)`, `MouseDown()`, `MouseX()`, `MouseY()`,
`SetDragMode(mode)`, `Timer()`, `ResetTimer()`, `Current(field)`

### Operators
`Add(a, b)`, `Subtract(a, b)`, `Multiply(a, b)`, `Divide(a, b)`,
`Random(from, to)`, `GreaterThan(a, b)`, `LessThan(a, b)`, `Equals(a, b)`,
`And(a, b)`, `Or(a, b)`, `Not(a)`,
`Join(s1, s2)`, `LetterOf(n, str)`, `LengthOf(str)`, `Contains(str, substr)`,
`Mod(a, b)`, `Round(n)`, `MathOp(op, n)` (op: 'abs','floor','ceiling','sqrt', etc.)

### Data (variables & lists)
`SetVariableTo(varParam, val)`, `ChangeVariableBy(varParam, val)`,
`ShowVariable(varParam)`, `HideVariable(varParam)`,
`AddToList(listParam, item)`, `DeleteFromList(listParam, index)`,
`DeleteAllOfList(listParam)`, `InsertAtList(listParam, index, item)`,
`ReplaceItemOfList(listParam, index, item)`, `ItemOfList(listParam, index)`,
`ItemNumOfList(listParam, item)`, `LengthOfList(listParam)`,
`ListContains(listParam, item)`, `ShowList(listParam)`, `HideList(listParam)`

## Extensions

```typescript
import * as pen from 'sb3gen';   // pen.* music.* etc. are re-exported
// or use the namespace imports:

s.push(pen.PenDown());
s.push(pen.SetPenColorToColor('#ff0000'));
s.push(pen.ChangePenSizeBy(1));
s.push(music.PlayDrumForBeats(1, 0.25));
```

Extensions auto-register in `project.extensions` when `project.serialize()` / `project.save()` is called.

## Costumes & sounds

```typescript
import { Costume } from 'sb3gen';

const c = new Costume();
c.name = 'costume1';
c.dataFormat = 'svg';
c.assetId = '<md5>';        // MD5 of the asset file
c.md5ext = '<md5>.svg';
c.rotationCenterX = 0;
c.rotationCenterY = 0;

sprite.costumes.push(c);
sprite.currentCostume = 0;
```

For actual asset bytes use `Zipper` directly and call `zipper.addFile(name, bytes)`.

## Building without saving to disk (Zipper)

```typescript
import { Zipper } from 'sb3gen';

const bytes = await new Zipper(project).buildToBytes(); // Uint8Array
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
  .withInput('INPUT_NAME', InputVal.num(42))
  .withField('FIELD_NAME', 'value')
  .withMutation({ hasnext: 'false', ... })
```

## Common patterns

### Sprite that chases mouse forever
```typescript
sprite.addScript(s => {
  s.push(WhenFlagClicked());
  s.forever(inner => {
    inner.push(PointTowards('_mouse_'));
    inner.push(MoveSteps(5));
  });
});
```

### Variable counter
```typescript
const count = sprite.addVariable('count', 0);
sprite.addScript(s => {
  s.push(WhenFlagClicked());
  s.push(SetVariableTo(count, 0));
  s.repeat(10, inner => {
    inner.push(ChangeVariableBy(count, 1));
    inner.push(Say(s.embed(count)));
    inner.push(Wait(0.5));
  });
});
```

### Broadcast handshake
```typescript
const go = stage.addBroadcast('go');

stage.addScript(s => {
  s.push(WhenFlagClicked());
  s.push(BroadcastAndWait(InputVal.broadcast(go.name, go.id)));
});

sprite.addScript(s => {
  s.push(WhenIReceive(go));
  s.push(Say('received!'));
});
```

## Gotchas

- `addVariable` / `addList` / `addBroadcast` return the ref object you pass to blocks — call them first so you have the ref.
- `s.embed()` queues the block for insertion — do **not** call `s.push()` on the same block.
- `GoTo`, `GlideTo`, `SwitchCostumeTo`, `SwitchBackdropTo`, `PointTowards` are overloaded: pass a `string` for a named menu option (creates shadow block), pass an `InputVal` for a dynamic value.