/**
 * Edit an existing .sb3 file:
 *  1. Decode it with Zipper.decode()
 *  2. Find and mutate targets/blocks
 *  3. Re-encode with project.save()
 *
 * Run against any .sb3:
 *   bun run examples/05-edit-existing.ts input.sb3
 */
import { readFileSync } from 'fs';
import {
  Project, Sprite, Stage,
  WhenFlagClicked, Say,
  Zipper,
} from '../src';

const inputPath = process.argv[2];
if (!inputPath) {
  console.error('Usage: bun run examples/05-edit-existing.ts <file.sb3>');
  process.exit(1);
}

const project = await Zipper.decode(readFileSync(inputPath));

// ── Inspect ────────────────────────────────────────────────────────────────────

console.log('Targets:');
for (const target of project.targets) {
  const kind = target.isStage ? 'Stage' : 'Sprite';
  const blockCount = Object.keys(target.blocks.toRecord()).length;
  console.log(`  [${kind}] "${target.name}"  blocks=${blockCount}`);
}

// ── Edit 1: rename the first non-stage sprite ──────────────────────────────────

const sprite = project.targets.find((t) => !t.isStage);
if (sprite) {
  console.log(`\nRenaming "${sprite.name}" → "EditedSprite"`);
  sprite.name = 'EditedSprite';
}

// ── Edit 2: inject a new script into that sprite ───────────────────────────────

if (sprite) {
  sprite.addScript(s => {
    s.xy(600, 0);
    s.push(WhenFlagClicked);
    s.push(Say('I was injected!'));
  });
}

// ── Edit 3: change a stage variable's initial value ────────────────────────────

const stage = project.targets.find((t) => t.isStage);
if (stage) {
  for (const [id, info] of Object.entries(stage.variables)) {
    console.log(`\nStage variable "${info[0]}" = ${info[1]}`);
    if (typeof info[1] === 'number') {
      console.log(`  → resetting to 0`);
      stage.variables[id] = [info[0], 0];
    }
  }
}

// ── Edit 4: remove all blocks with a specific opcode ──────────────────────────

const OPCODE_TO_STRIP = 'looks_sayforsecs';

let stripped = 0;
for (const target of project.targets) {
  for (const [id, block] of Object.entries(target.blocks.toRecord())) {
    if (block.opcode === OPCODE_TO_STRIP) {
      target.blocks.deleteBlock(id);
      stripped++;
    }
  }
}
if (stripped) console.log(`\nStripped ${stripped} "${OPCODE_TO_STRIP}" block(s)`);

// ── Write ──────────────────────────────────────────────────────────────────────

const outPath = inputPath.replace(/\.sb3$/, '') + '-edited.sb3';
await project.save(outPath);
console.log(`\nWritten ${outPath}`);