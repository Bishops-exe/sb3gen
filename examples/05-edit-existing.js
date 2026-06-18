/**
 * Edit an existing .sb3 file:
 *  1. Decode it with Zipper.decode()
 *  2. Find and mutate targets/blocks
 *  3. Re-encode with Zipper.buildToBytes()
 *
 * Run against any .sb3:
 *   bun run examples/05-edit-existing.ts input.sb3
 */
import 'reflect-metadata';
import { readFileSync, writeFileSync } from 'fs';
import {
  Project, Sprite, Stage,
  BlocksMap, Script, InputVal,
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
  const blockCount = Object.keys(target.blocks).length;
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
  const bm = new BlocksMap();
  const script = new Script();
  // Position the new script below any existing ones
  script.xy(600, 0);
  script.push(new WhenFlagClicked().build());
  script.push(new Say(InputVal.str('I was injected!')).build());
  bm.addScript(script);

  // Merge new blocks with existing ones (don't replace them)
  const newBlocks = bm.toRecord();
  for (const [id, block] of Object.entries(newBlocks)) {
    sprite.blocks[id] = block;
  }
}

// ── Edit 3: change a stage variable's initial value ────────────────────────────

const stage = project.targets.find((t) => t.isStage);
if (stage) {
  for (const [id, info] of Object.entries(stage.variables)) {
    console.log(`\nStage variable "${info[0]}" = ${info[1]}`);
    // Reset every numeric variable to 0
    if (typeof info[1] === 'number') {
      console.log(`  → resetting to 0`);
      stage.variables[id] = [info[0], 0];
    }
  }
}

// ── Edit 4: remove all blocks with a specific opcode ──────────────────────────

const OPCODE_TO_STRIP = 'looks_sayforsecs'; // strip "say X for Y secs" blocks

let stripped = 0;
for (const target of project.targets) {
  for (const [id, block] of Object.entries(target.blocks)) {
    if (block.opcode === OPCODE_TO_STRIP) {
      delete target.blocks[id];
      stripped++;
    }
  }
}
if (stripped) console.log(`\nStripped ${stripped} "${OPCODE_TO_STRIP}" block(s)`);

// ── Write ──────────────────────────────────────────────────────────────────────

const outPath = inputPath.replace(/\.sb3$/, '') + '-edited.sb3';
const bytes = await new Zipper(project).buildToBytes();
writeFileSync(outPath, bytes);
console.log(`\nWritten ${outPath}`);
