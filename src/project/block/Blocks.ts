import { Block, Input, CompoundBlock, SubstackBlock } from './Block';
import { InputVal, Val, NumVal, VarParam, ListParam, BroadcastParam, varName, listName, broadcastName } from './InputVal';
import { ck, ckColor } from './validate';
import { getUniqueId } from '../../Utils';

const c = InputVal.coerce;

function shadow(mainOpcode: string, shadowOpcode: string, fieldName: string, fieldValue: string, inputName: string): CompoundBlock {
  return {
    main: Block.create(mainOpcode),
    slots: [{ inputName, block: Block.create(shadowOpcode).addField(fieldName, fieldValue) }],
  };
}

// ── Events ────────────────────────────────────────────────────────────────────

export function WhenFlagClicked(): Block { return Block.create('event_whenflagclicked'); }

export function WhenThisSpriteClicked(): Block { return Block.create('event_whenthisspriteclicked'); }

export function WhenKeyPressed(key: string): Block {
  ck(key, 'key');
  return Block.create('event_whenkeypressed').addField('KEY_OPTION', key);
}

export function WhenIReceive(broadcastOption: BroadcastParam): Block {
  ck(broadcastOption, 'broadcastOption');
  const name = broadcastName(broadcastOption);
  const id = typeof broadcastOption === 'string' ? null : broadcastOption.id;
  return Block.create('event_whenbroadcastreceived').addField('BROADCAST_OPTION', name, id);
}

export function Broadcast(broadcastInput: InputVal): Block {
  ck(broadcastInput, 'broadcastInput');
  return Block.create('event_broadcast').addInput('BROADCAST_INPUT', broadcastInput);
}

export function BroadcastAndWait(broadcastInput: InputVal): Block {
  ck(broadcastInput, 'broadcastInput');
  return Block.create('event_broadcastandwait').addInput('BROADCAST_INPUT', broadcastInput);
}

export function WhenBackdropSwitchesTo(backdrop: string): Block {
  ck(backdrop, 'backdrop');
  return Block.create('event_whenbackdropswitchesto').addField('BACKDROP', backdrop);
}

export function WhenGreaterThan(value: NumVal, whenGreaterThanMenu: string): Block {
  ck(value, 'value');
  ck(whenGreaterThanMenu, 'whenGreaterThanMenu');
  return Block.create('event_whengreaterthan')
    .addInput('VALUE', c(value))
    .addField('WHENGREATERTHANMENU', whenGreaterThanMenu);
}

// ── Motion ────────────────────────────────────────────────────────────────────

export function MoveSteps(steps: NumVal): Block {
  ck(steps, 'steps');
  return Block.create('motion_movesteps').addInput('STEPS', c(steps));
}

export function TurnRight(degrees: NumVal): Block {
  ck(degrees, 'degrees');
  return Block.create('motion_turnright').addInput('DEGREES', c(degrees));
}

export function TurnLeft(degrees: NumVal): Block {
  ck(degrees, 'degrees');
  return Block.create('motion_turnleft').addInput('DEGREES', c(degrees));
}

export function GoToXY(x: NumVal, y: NumVal): Block {
  ck(x, 'x'); ck(y, 'y');
  return Block.create('motion_gotoxy').addInput('X', c(x)).addInput('Y', c(y));
}

export function GlideSecsToXY(secs: NumVal, x: NumVal, y: NumVal): Block {
  ck(secs, 'secs'); ck(x, 'x'); ck(y, 'y');
  return Block.create('motion_glidesecstoxy')
    .addInput('SECS', c(secs))
    .addInput('X', c(x))
    .addInput('Y', c(y));
}

export function PointInDirection(direction: NumVal): Block {
  ck(direction, 'direction');
  return Block.create('motion_pointindirection').addInput('DIRECTION', c(direction));
}

export function SetX(x: NumVal): Block {
  ck(x, 'x');
  return Block.create('motion_setx').addInput('X', c(x));
}

export function SetY(y: NumVal): Block {
  ck(y, 'y');
  return Block.create('motion_sety').addInput('Y', c(y));
}

export function ChangeXBy(dx: NumVal): Block {
  ck(dx, 'dx');
  return Block.create('motion_changexby').addInput('DX', c(dx));
}

export function ChangeYBy(dy: NumVal): Block {
  ck(dy, 'dy');
  return Block.create('motion_changeyby').addInput('DY', c(dy));
}

export function IfOnEdgeBounce(): Block { return Block.create('motion_ifonedgebounce'); }

export function GoToMenu(to: string): Block {
  ck(to, 'to');
  return Block.create('motion_goto_menu').addField('TO', to);
}

export function GoTo(to: string): CompoundBlock;
export function GoTo(to: InputVal): Block;
export function GoTo(to: string | InputVal): Block | CompoundBlock {
  ck(to, 'to');
  if (typeof to === 'string') return shadow('motion_goto', 'motion_goto_menu', 'TO', to, 'TO');
  return Block.create('motion_goto').addInput('TO', to);
}

export function GlideToMenu(to: string): Block {
  ck(to, 'to');
  return Block.create('motion_glideto_menu').addField('TO', to);
}

export function GlideTo(secs: NumVal, to: string): CompoundBlock;
export function GlideTo(secs: NumVal, to: InputVal): Block;
export function GlideTo(secs: NumVal, to: string | InputVal): Block | CompoundBlock {
  ck(secs, 'secs'); ck(to, 'to');
  if (typeof to === 'string') {
    const compound = shadow('motion_glideto', 'motion_glideto_menu', 'TO', to, 'TO');
    compound.main.addInput('SECS', c(secs));
    return compound;
  }
  return Block.create('motion_glideto').addInput('SECS', c(secs)).addInput('TO', to);
}

export function PointTowardsMenu(towards: string): Block {
  ck(towards, 'towards');
  return Block.create('motion_pointtowards_menu').addField('TOWARDS', towards);
}

export function PointTowards(towards: string): CompoundBlock;
export function PointTowards(towards: InputVal): Block;
export function PointTowards(towards: string | InputVal): Block | CompoundBlock {
  ck(towards, 'towards');
  if (typeof towards === 'string') return shadow('motion_pointtowards', 'motion_pointtowards_menu', 'TOWARDS', towards, 'TOWARDS');
  return Block.create('motion_pointtowards').addInput('TOWARDS', towards);
}

export function SetRotationStyle(style: string): Block {
  ck(style, 'style');
  return Block.create('motion_setrotationstyle').addField('STYLE', style);
}

export function MotionXPosition(): Block { return Block.create('motion_xposition'); }

export function MotionYPosition(): Block { return Block.create('motion_yposition'); }

export function MotionDirection(): Block { return Block.create('motion_direction'); }

// ── Looks ─────────────────────────────────────────────────────────────────────

export function Say(message: Val): Block {
  ck(message, 'message');
  return Block.create('looks_say').addInput('MESSAGE', c(message));
}

export function SayForSecs(message: Val, secs: NumVal): Block {
  ck(message, 'message'); ck(secs, 'secs');
  return Block.create('looks_sayforsecs').addInput('MESSAGE', c(message)).addInput('SECS', c(secs));
}

export function Think(message: Val): Block {
  ck(message, 'message');
  return Block.create('looks_think').addInput('MESSAGE', c(message));
}

export function ThinkForSecs(message: Val, secs: NumVal): Block {
  ck(message, 'message'); ck(secs, 'secs');
  return Block.create('looks_thinkforsecs').addInput('MESSAGE', c(message)).addInput('SECS', c(secs));
}

export function Show(): Block { return Block.create('looks_show'); }

export function Hide(): Block { return Block.create('looks_hide'); }

export function SetSizeTo(size: NumVal): Block {
  ck(size, 'size');
  return Block.create('looks_setsizeto').addInput('SIZE', c(size));
}

export function ChangeSizeBy(change: NumVal): Block {
  ck(change, 'change');
  return Block.create('looks_changesizeby').addInput('CHANGE', c(change));
}

export function SetEffect(value: NumVal, effect: string): Block {
  ck(value, 'value'); ck(effect, 'effect');
  return Block.create('looks_seteffectto').addInput('VALUE', c(value)).addField('EFFECT', effect);
}

export function ChangeEffect(change: NumVal, effect: string): Block {
  ck(change, 'change'); ck(effect, 'effect');
  return Block.create('looks_changeeffectby').addInput('CHANGE', c(change)).addField('EFFECT', effect);
}

export function ClearEffects(): Block { return Block.create('looks_cleargraphiceffects'); }

export function CostumeMenu(costume: string): Block {
  ck(costume, 'costume');
  return Block.create('looks_costume').addField('COSTUME', costume);
}

export function SwitchCostumeTo(costume: string): CompoundBlock;
export function SwitchCostumeTo(costume: InputVal): Block;
export function SwitchCostumeTo(costume: string | InputVal): Block | CompoundBlock {
  ck(costume, 'costume');
  if (typeof costume === 'string') return shadow('looks_switchcostumeto', 'looks_costume', 'COSTUME', costume, 'COSTUME');
  return Block.create('looks_switchcostumeto').addInput('COSTUME', costume);
}

export function NextCostume(): Block { return Block.create('looks_nextcostume'); }

export function BackdropsMenu(backdrop: string): Block {
  ck(backdrop, 'backdrop');
  return Block.create('looks_backdrops').addField('BACKDROP', backdrop);
}

export function SwitchBackdropTo(backdrop: string): CompoundBlock;
export function SwitchBackdropTo(backdrop: InputVal): Block;
export function SwitchBackdropTo(backdrop: string | InputVal): Block | CompoundBlock {
  ck(backdrop, 'backdrop');
  if (typeof backdrop === 'string') return shadow('looks_switchbackdropto', 'looks_backdrops', 'BACKDROP', backdrop, 'BACKDROP');
  return Block.create('looks_switchbackdropto').addInput('BACKDROP', backdrop);
}

export function NextBackdrop(): Block { return Block.create('looks_nextbackdrop'); }

export function GoToFrontBack(frontBack: string): Block {
  ck(frontBack, 'frontBack');
  return Block.create('looks_gotofrontback').addField('FRONT_BACK', frontBack);
}

export function GoForwardBackwardLayers(num: NumVal, forwardBackward: string): Block {
  ck(num, 'num'); ck(forwardBackward, 'forwardBackward');
  return Block.create('looks_goforwardbackwardlayers')
    .addInput('NUM', c(num))
    .addField('FORWARD_BACKWARD', forwardBackward);
}

export function CostumeNumberName(numberName: string): Block {
  ck(numberName, 'numberName');
  return Block.create('looks_costumenumbername').addField('NUMBER_NAME', numberName);
}

export function BackdropNumberName(numberName: string): Block {
  ck(numberName, 'numberName');
  return Block.create('looks_backdropnumbername').addField('NUMBER_NAME', numberName);
}

export function LooksSize(): Block { return Block.create('looks_size'); }

// ── Sound ─────────────────────────────────────────────────────────────────────

export function PlaySoundUntilDone(soundMenu: InputVal): Block {
  ck(soundMenu, 'soundMenu');
  return Block.create('sound_playuntildone').addInput('SOUND_MENU', soundMenu);
}

export function StartSound(soundMenu: InputVal): Block {
  ck(soundMenu, 'soundMenu');
  return Block.create('sound_play').addInput('SOUND_MENU', soundMenu);
}

export function StopAllSounds(): Block { return Block.create('sound_stopallsounds'); }

export function SetVolumeTo(volume: NumVal): Block {
  ck(volume, 'volume');
  return Block.create('sound_setvolumeto').addInput('VOLUME', c(volume));
}

export function ChangeVolumeBy(volume: NumVal): Block {
  ck(volume, 'volume');
  return Block.create('sound_changevolumeby').addInput('VOLUME', c(volume));
}

export function SoundMenu(soundMenu: string): Block {
  ck(soundMenu, 'soundMenu');
  return Block.create('sound_sounds_menu').addField('SOUND_MENU', soundMenu);
}

export function ChangeSoundEffect(value: NumVal, effect: string): Block {
  ck(value, 'value'); ck(effect, 'effect');
  return Block.create('sound_changeeffectby').addInput('VALUE', c(value)).addField('EFFECT', effect);
}

export function SetSoundEffect(value: NumVal, effect: string): Block {
  ck(value, 'value'); ck(effect, 'effect');
  return Block.create('sound_seteffectto').addInput('VALUE', c(value)).addField('EFFECT', effect);
}

export function ClearSoundEffects(): Block { return Block.create('sound_cleareffects'); }

export function SoundVolume(): Block { return Block.create('sound_volume'); }

// ── Control ───────────────────────────────────────────────────────────────────

export function Wait(duration: NumVal): Block {
  ck(duration, 'duration');
  return Block.create('control_wait').addInput('DURATION', c(duration));
}

export function WaitUntil(condition: InputVal): Block {
  ck(condition, 'condition');
  return Block.create('control_wait_until').addInput('CONDITION', condition);
}

export function Stop(stopOption: string): Block {
  ck(stopOption, 'stopOption');
  return Block.create('control_stop').addField('STOP_OPTION', stopOption);
}

export function WhenIStartAsAClone(): Block { return Block.create('control_start_as_clone'); }

export function CreateCloneOfMenu(cloneOption: string): Block {
  ck(cloneOption, 'cloneOption');
  return Block.create('control_create_clone_of_menu').addField('CLONE_OPTION', cloneOption);
}

export function CreateCloneOf(cloneOption: string): CompoundBlock;
export function CreateCloneOf(cloneOption: InputVal): Block;
export function CreateCloneOf(cloneOption: string | InputVal): Block | CompoundBlock {
  ck(cloneOption, 'cloneOption');
  if (typeof cloneOption === 'string') return shadow('control_create_clone_of', 'control_create_clone_of_menu', 'CLONE_OPTION', cloneOption, 'CLONE_OPTION');
  return Block.create('control_create_clone_of').addInput('CLONE_OPTION', cloneOption);
}

export function DeleteThisClone(): Block { return Block.create('control_delete_this_clone'); }

// ── Operators ─────────────────────────────────────────────────────────────────

export function Add(num1: NumVal, num2: NumVal): Block {
  ck(num1, 'num1'); ck(num2, 'num2');
  return Block.create('operator_add').addInput('NUM1', c(num1)).addInput('NUM2', c(num2));
}

export function Subtract(num1: NumVal, num2: NumVal): Block {
  ck(num1, 'num1'); ck(num2, 'num2');
  return Block.create('operator_subtract').addInput('NUM1', c(num1)).addInput('NUM2', c(num2));
}

export function Multiply(num1: NumVal, num2: NumVal): Block {
  ck(num1, 'num1'); ck(num2, 'num2');
  return Block.create('operator_multiply').addInput('NUM1', c(num1)).addInput('NUM2', c(num2));
}

export function Divide(num1: NumVal, num2: NumVal): Block {
  ck(num1, 'num1'); ck(num2, 'num2');
  return Block.create('operator_divide').addInput('NUM1', c(num1)).addInput('NUM2', c(num2));
}

export function Random(from: NumVal, to: NumVal): Block {
  ck(from, 'from'); ck(to, 'to');
  return Block.create('operator_random').addInput('FROM', c(from)).addInput('TO', c(to));
}

export function Lt(operand1: Val, operand2: Val): Block {
  ck(operand1, 'operand1'); ck(operand2, 'operand2');
  return Block.create('operator_lt').addInput('OPERAND1', c(operand1)).addInput('OPERAND2', c(operand2));
}

export function Gt(operand1: Val, operand2: Val): Block {
  ck(operand1, 'operand1'); ck(operand2, 'operand2');
  return Block.create('operator_gt').addInput('OPERAND1', c(operand1)).addInput('OPERAND2', c(operand2));
}

export function Eq(operand1: Val, operand2: Val): Block {
  ck(operand1, 'operand1'); ck(operand2, 'operand2');
  return Block.create('operator_equals').addInput('OPERAND1', c(operand1)).addInput('OPERAND2', c(operand2));
}

export function And(operand1: InputVal, operand2: InputVal): Block {
  ck(operand1, 'operand1'); ck(operand2, 'operand2');
  return Block.create('operator_and').addInput('OPERAND1', operand1).addInput('OPERAND2', operand2);
}

export function Or(operand1: InputVal, operand2: InputVal): Block {
  ck(operand1, 'operand1'); ck(operand2, 'operand2');
  return Block.create('operator_or').addInput('OPERAND1', operand1).addInput('OPERAND2', operand2);
}

export function Not(operand: InputVal): Block {
  ck(operand, 'operand');
  return Block.create('operator_not').addInput('OPERAND', operand);
}

export function Join(string1: Val, string2: Val): Block {
  ck(string1, 'string1'); ck(string2, 'string2');
  return Block.create('operator_join').addInput('STRING1', c(string1)).addInput('STRING2', c(string2));
}

export function LetterOf(letter: NumVal, string: Val): Block {
  ck(letter, 'letter'); ck(string, 'string');
  return Block.create('operator_letter_of').addInput('LETTER', c(letter)).addInput('STRING', c(string));
}

export function LengthOf(string: Val): Block {
  ck(string, 'string');
  return Block.create('operator_length').addInput('STRING', c(string));
}

export function Contains(string1: Val, string2: Val): Block {
  ck(string1, 'string1'); ck(string2, 'string2');
  return Block.create('operator_contains').addInput('STRING1', c(string1)).addInput('STRING2', c(string2));
}

export function Mod(num1: NumVal, num2: NumVal): Block {
  ck(num1, 'num1'); ck(num2, 'num2');
  return Block.create('operator_mod').addInput('NUM1', c(num1)).addInput('NUM2', c(num2));
}

export function Round(num: NumVal): Block {
  ck(num, 'num');
  return Block.create('operator_round').addInput('NUM', c(num));
}

export function MathOp(num: NumVal, operator: string): Block {
  ck(num, 'num'); ck(operator, 'operator');
  return Block.create('operator_mathop').addInput('NUM', c(num)).addField('OPERATOR', operator);
}

// ── Sensing ───────────────────────────────────────────────────────────────────

export function AskAndWait(question: Val): Block {
  ck(question, 'question');
  return Block.create('sensing_askandwait').addInput('QUESTION', c(question));
}

export function ResetTimer(): Block { return Block.create('sensing_resettimer'); }

export function TouchingObjectMenu(touchingObjectMenu: string): Block {
  ck(touchingObjectMenu, 'touchingObjectMenu');
  return Block.create('sensing_touchingobjectmenu').addField('TOUCHINGOBJECTMENU', touchingObjectMenu);
}

export function TouchingObject(touchingObjectMenu: InputVal): Block {
  ck(touchingObjectMenu, 'touchingObjectMenu');
  return Block.create('sensing_touchingobject').addInput('TOUCHINGOBJECTMENU', touchingObjectMenu);
}

export function TouchingColor(color: InputVal): Block {
  ck(color, 'color');
  ckColor(color, 'color');
  return Block.create('sensing_touchingcolor').addInput('COLOR', color);
}

export function ColorIsTouchingColor(color: InputVal, color2: InputVal): Block {
  ck(color, 'color'); ck(color2, 'color2');
  ckColor(color, 'color'); ckColor(color2, 'color2');
  return Block.create('sensing_coloristouchingcolor')
    .addInput('COLOR', color)
    .addInput('COLOR2', color2);
}

export function DistanceToMenu(distanceToMenu: string): Block {
  ck(distanceToMenu, 'distanceToMenu');
  return Block.create('sensing_distancetomenu').addField('DISTANCETOMENU', distanceToMenu);
}

export function DistanceTo(distanceToMenu: InputVal): Block {
  ck(distanceToMenu, 'distanceToMenu');
  return Block.create('sensing_distanceto').addInput('DISTANCETOMENU', distanceToMenu);
}

export function KeyOptions(keyOption: string): Block {
  ck(keyOption, 'keyOption');
  return Block.create('sensing_keyoptions').addField('KEY_OPTION', keyOption);
}

export function KeyPressed(keyOption: string): CompoundBlock;
export function KeyPressed(keyOption: InputVal): Block;
export function KeyPressed(keyOption: string | InputVal): Block | CompoundBlock {
  ck(keyOption, 'keyOption');
  if (typeof keyOption === 'string') return shadow('sensing_keypressed', 'sensing_keyoptions', 'KEY_OPTION', keyOption, 'KEY_OPTION');
  return Block.create('sensing_keypressed').addInput('KEY_OPTION', keyOption);
}

export function MouseDown(): Block { return Block.create('sensing_mousedown'); }

export function MouseX(): Block { return Block.create('sensing_mousex'); }

export function MouseY(): Block { return Block.create('sensing_mousey'); }

export function SetDragMode(dragMode: string): Block {
  ck(dragMode, 'dragMode');
  return Block.create('sensing_setdragmode').addField('DRAG_MODE', dragMode);
}

export function Loudness(): Block { return Block.create('sensing_loudness'); }

export function SensingTimer(): Block { return Block.create('sensing_timer'); }

export function OfObjectMenu(object: string): Block {
  ck(object, 'object');
  return Block.create('sensing_of_object_menu').addField('OBJECT', object);
}

export function Of(object: InputVal, property: string): Block {
  ck(object, 'object'); ck(property, 'property');
  return Block.create('sensing_of').addInput('OBJECT', object).addField('PROPERTY', property);
}

export function SensingCurrent(currentMenu: string): Block {
  ck(currentMenu, 'currentMenu');
  return Block.create('sensing_current').addField('CURRENTMENU', currentMenu);
}

export function DaysSince2000(): Block { return Block.create('sensing_dayssince2000'); }

export function Online(): Block { return Block.create('sensing_online'); }

export function SensingUsername(): Block { return Block.create('sensing_username'); }

export function SensingAnswer(): Block { return Block.create('sensing_answer'); }

// ── Data ──────────────────────────────────────────────────────────────────────

function vid(v: VarParam): string | null { return typeof v === 'string' ? null : v.id; }
function lid(l: ListParam): string | null { return typeof l === 'string' ? null : l.id; }

export function SetVariableTo(value: Val, variable: VarParam): Block {
  ck(value, 'value'); ck(variable, 'variable');
  return Block.create('data_setvariableto').addInput('VALUE', c(value)).addField('VARIABLE', varName(variable), vid(variable));
}

export function ChangeVariableBy(value: NumVal, variable: VarParam): Block {
  ck(value, 'value'); ck(variable, 'variable');
  return Block.create('data_changevariableby').addInput('VALUE', c(value)).addField('VARIABLE', varName(variable), vid(variable));
}

export function ShowVariable(variable: VarParam): Block {
  ck(variable, 'variable');
  return Block.create('data_showvariable').addField('VARIABLE', varName(variable), vid(variable));
}

export function HideVariable(variable: VarParam): Block {
  ck(variable, 'variable');
  return Block.create('data_hidevariable').addField('VARIABLE', varName(variable), vid(variable));
}

export function AddToList(item: Val, list: ListParam): Block {
  ck(item, 'item'); ck(list, 'list');
  return Block.create('data_addtolist').addInput('ITEM', c(item)).addField('LIST', listName(list), lid(list));
}

export function DeleteOfList(index: NumVal, list: ListParam): Block {
  ck(index, 'index'); ck(list, 'list');
  return Block.create('data_deleteoflist').addInput('INDEX', c(index)).addField('LIST', listName(list), lid(list));
}

export function DeleteAllOfList(list: ListParam): Block {
  ck(list, 'list');
  return Block.create('data_deletealloflist').addField('LIST', listName(list), lid(list));
}

export function InsertAtList(item: Val, index: NumVal, list: ListParam): Block {
  ck(item, 'item'); ck(index, 'index'); ck(list, 'list');
  return Block.create('data_insertatlist')
    .addInput('ITEM', c(item))
    .addInput('INDEX', c(index))
    .addField('LIST', listName(list), lid(list));
}

export function ReplaceItemOfList(index: NumVal, item: Val, list: ListParam): Block {
  ck(index, 'index'); ck(item, 'item'); ck(list, 'list');
  return Block.create('data_replaceitemoflist')
    .addInput('INDEX', c(index))
    .addInput('ITEM', c(item))
    .addField('LIST', listName(list), lid(list));
}

export function ItemOfList(index: NumVal, list: ListParam): Block {
  ck(index, 'index'); ck(list, 'list');
  return Block.create('data_itemoflist').addInput('INDEX', c(index)).addField('LIST', listName(list), lid(list));
}

export function ItemNumOfList(item: Val, list: ListParam): Block {
  ck(item, 'item'); ck(list, 'list');
  return Block.create('data_itemnumoflist').addInput('ITEM', c(item)).addField('LIST', listName(list), lid(list));
}

export function LengthOfList(list: ListParam): Block {
  ck(list, 'list');
  return Block.create('data_lengthoflist').addField('LIST', listName(list), lid(list));
}

export function ListContainsItem(item: Val, list: ListParam): Block {
  ck(item, 'item'); ck(list, 'list');
  return Block.create('data_listcontainsitem').addInput('ITEM', c(item)).addField('LIST', listName(list), lid(list));
}

export function ShowList(list: ListParam): Block {
  ck(list, 'list');
  return Block.create('data_showlist').addField('LIST', listName(list), lid(list));
}

export function HideList(list: ListParam): Block {
  ck(list, 'list');
  return Block.create('data_hidelist').addField('LIST', listName(list), lid(list));
}

// ── Procedures ────────────────────────────────────────────────────────────────

export function ArgumentReporterStringNumber(value: string): Block {
  ck(value, 'value');
  return Block.create('argument_reporter_string_number').addField('VALUE', value);
}

export function ArgumentReporterBoolean(value: string): Block {
  ck(value, 'value');
  return Block.create('argument_reporter_boolean').addField('VALUE', value);
}

export interface ProcParam {
  name: string;
  type: 'string_number' | 'boolean';
}

export interface ProcedureSpec {
  readonly proccode: string;
  readonly params: ReadonlyArray<{ id: string; name: string; type: 'string_number' | 'boolean' }>;
  readonly warp: boolean;
}

export function procedure(proccode: string, params: ProcParam[] = [], warp = false): ProcedureSpec {
  return {
    proccode,
    params: params.map(p => ({ ...p, id: getUniqueId() })),
    warp,
  };
}

export function DefineBlock(spec: ProcedureSpec): SubstackBlock {
  const protoId = getUniqueId();
  const proto = Block.shadow('procedures_prototype');
  const record: Record<string, Block> = { [protoId]: proto };

  for (const param of spec.params) {
    const reporterId = getUniqueId();
    const reporter = param.type === 'boolean'
      ? Block.shadow('argument_reporter_boolean').addField('VALUE', param.name)
      : Block.shadow('argument_reporter_string_number').addField('VALUE', param.name);
    reporter.parent = protoId;
    proto.inputs[param.id] = Input.value(InputVal.block(reporterId));
    record[reporterId] = reporter;
  }

  proto.setMutation({
    tagName: 'mutation',
    children: [],
    proccode: spec.proccode,
    argumentids: JSON.stringify(spec.params.map(p => p.id)),
    argumentnames: JSON.stringify(spec.params.map(p => p.name)),
    argumentdefaults: JSON.stringify(spec.params.map(p => p.type === 'boolean' ? 'false' : '')),
    warp: spec.warp ? 'true' : 'false',
  });

  const main = Block.create('procedures_definition')
    .addInput('custom_block', InputVal.block(protoId));

  return { main, substacks: [{ firstId: protoId, record }] };
}

export function CallBlock(spec: ProcedureSpec, args: InputVal[] = []): Block {
  const block = Block.create('procedures_call');

  spec.params.forEach((param, i) => {
    const val = args[i] ?? InputVal.str('');
    const mode = param.type === 'boolean' ? 2 : 1;
    block.inputs[param.id] = Input.value(val, mode);
  });

  return block.setMutation({
    tagName: 'mutation',
    children: [],
    proccode: spec.proccode,
    argumentids: JSON.stringify(spec.params.map(p => p.id)),
    warp: spec.warp ? 'true' : 'false',
  });
}
