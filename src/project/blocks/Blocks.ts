import { Block } from '../block/Block';
import { InputVal } from '../block/InputVal';

// ── Events ────────────────────────────────────────────────────────────────────

export class WhenFlagClicked {
  build(): Block { return Block.create('event_whenflagclicked'); }
}

export class WhenThisSpriteClicked {
  build(): Block { return Block.create('event_whenthisspriteclicked'); }
}

export class WhenKeyPressed {
  constructor(public key: string) {}
  build(): Block { return Block.create('event_whenkeypressed').withField('KEY_OPTION', this.key); }
}

export class WhenIReceive {
  constructor(public broadcastOption: string) {}
  build(): Block { return Block.create('event_whenbroadcastreceived').withField('BROADCAST_OPTION', this.broadcastOption); }
}

export class Broadcast {
  constructor(public broadcastInput: InputVal) {}
  build(): Block { return Block.create('event_broadcast').withInput('BROADCAST_INPUT', this.broadcastInput); }
}

export class BroadcastAndWait {
  constructor(public broadcastInput: InputVal) {}
  build(): Block { return Block.create('event_broadcastandwait').withInput('BROADCAST_INPUT', this.broadcastInput); }
}

export class WhenBackdropSwitchesTo {
  constructor(public backdrop: string) {}
  build(): Block { return Block.create('event_whenbackdropswitchesto').withField('BACKDROP', this.backdrop); }
}

export class WhenGreaterThan {
  constructor(public value: InputVal, public whenGreaterThanMenu: string) {}
  build(): Block {
    return Block.create('event_whengreaterthan')
      .withInput('VALUE', this.value)
      .withField('WHENGREATERTHANMENU', this.whenGreaterThanMenu);
  }
}

// ── Motion ────────────────────────────────────────────────────────────────────

export class MoveSteps {
  constructor(public steps: InputVal) {}
  build(): Block { return Block.create('motion_movesteps').withInput('STEPS', this.steps); }
}

export class TurnRight {
  constructor(public degrees: InputVal) {}
  build(): Block { return Block.create('motion_turnright').withInput('DEGREES', this.degrees); }
}

export class TurnLeft {
  constructor(public degrees: InputVal) {}
  build(): Block { return Block.create('motion_turnleft').withInput('DEGREES', this.degrees); }
}

export class GoToXY {
  constructor(public x: InputVal, public y: InputVal) {}
  build(): Block {
    return Block.create('motion_gotoxy').withInput('X', this.x).withInput('Y', this.y);
  }
}

export class GlideSecsToXY {
  constructor(public secs: InputVal, public x: InputVal, public y: InputVal) {}
  build(): Block {
    return Block.create('motion_glidesecstoxy')
      .withInput('SECS', this.secs)
      .withInput('X', this.x)
      .withInput('Y', this.y);
  }
}

export class PointInDirection {
  constructor(public direction: InputVal) {}
  build(): Block { return Block.create('motion_pointindirection').withInput('DIRECTION', this.direction); }
}

export class SetX {
  constructor(public x: InputVal) {}
  build(): Block { return Block.create('motion_setx').withInput('X', this.x); }
}

export class SetY {
  constructor(public y: InputVal) {}
  build(): Block { return Block.create('motion_sety').withInput('Y', this.y); }
}

export class ChangeXBy {
  constructor(public dx: InputVal) {}
  build(): Block { return Block.create('motion_changexby').withInput('DX', this.dx); }
}

export class ChangeYBy {
  constructor(public dy: InputVal) {}
  build(): Block { return Block.create('motion_changeyby').withInput('DY', this.dy); }
}

export class IfOnEdgeBounce {
  build(): Block { return Block.create('motion_ifonedgebounce'); }
}

export class GoToMenu {
  constructor(public to: string) {}
  build(): Block { return Block.create('motion_goto_menu').withField('TO', this.to); }
}

export class GoTo {
  constructor(public to: InputVal) {}
  build(): Block { return Block.create('motion_goto').withInput('TO', this.to); }
}

export class GlideToMenu {
  constructor(public to: string) {}
  build(): Block { return Block.create('motion_glideto_menu').withField('TO', this.to); }
}

export class GlideTo {
  constructor(public secs: InputVal, public to: InputVal) {}
  build(): Block {
    return Block.create('motion_glideto').withInput('SECS', this.secs).withInput('TO', this.to);
  }
}

export class PointTowardsMenu {
  constructor(public towards: string) {}
  build(): Block { return Block.create('motion_pointtowards_menu').withField('TOWARDS', this.towards); }
}

export class PointTowards {
  constructor(public towards: InputVal) {}
  build(): Block { return Block.create('motion_pointtowards').withInput('TOWARDS', this.towards); }
}

export class SetRotationStyle {
  constructor(public style: string) {}
  build(): Block { return Block.create('motion_setrotationstyle').withField('STYLE', this.style); }
}

export class MotionXPosition {
  build(): Block { return Block.create('motion_xposition'); }
}

export class MotionYPosition {
  build(): Block { return Block.create('motion_yposition'); }
}

export class MotionDirection {
  build(): Block { return Block.create('motion_direction'); }
}

// ── Looks ─────────────────────────────────────────────────────────────────────

export class Say {
  constructor(public message: InputVal) {}
  build(): Block { return Block.create('looks_say').withInput('MESSAGE', this.message); }
}

export class SayForSecs {
  constructor(public message: InputVal, public secs: InputVal) {}
  build(): Block {
    return Block.create('looks_sayforsecs').withInput('MESSAGE', this.message).withInput('SECS', this.secs);
  }
}

export class Think {
  constructor(public message: InputVal) {}
  build(): Block { return Block.create('looks_think').withInput('MESSAGE', this.message); }
}

export class ThinkForSecs {
  constructor(public message: InputVal, public secs: InputVal) {}
  build(): Block {
    return Block.create('looks_thinkforsecs').withInput('MESSAGE', this.message).withInput('SECS', this.secs);
  }
}

export class Show {
  build(): Block { return Block.create('looks_show'); }
}

export class Hide {
  build(): Block { return Block.create('looks_hide'); }
}

export class SetSizeTo {
  constructor(public size: InputVal) {}
  build(): Block { return Block.create('looks_setsizeto').withInput('SIZE', this.size); }
}

export class ChangeSizeBy {
  constructor(public change: InputVal) {}
  build(): Block { return Block.create('looks_changesizeby').withInput('CHANGE', this.change); }
}

export class SetEffect {
  constructor(public value: InputVal, public effect: string) {}
  build(): Block {
    return Block.create('looks_seteffectto').withInput('VALUE', this.value).withField('EFFECT', this.effect);
  }
}

export class ChangeEffect {
  constructor(public change: InputVal, public effect: string) {}
  build(): Block {
    return Block.create('looks_changeeffectby').withInput('CHANGE', this.change).withField('EFFECT', this.effect);
  }
}

export class ClearEffects {
  build(): Block { return Block.create('looks_cleargraphiceffects'); }
}

export class CostumeMenu {
  constructor(public costume: string) {}
  build(): Block { return Block.create('looks_costume').withField('COSTUME', this.costume); }
}

export class SwitchCostumeTo {
  constructor(public costume: InputVal) {}
  build(): Block { return Block.create('looks_switchcostumeto').withInput('COSTUME', this.costume); }
}

export class NextCostume {
  build(): Block { return Block.create('looks_nextcostume'); }
}

export class BackdropsMenu {
  constructor(public backdrop: string) {}
  build(): Block { return Block.create('looks_backdrops').withField('BACKDROP', this.backdrop); }
}

export class SwitchBackdropTo {
  constructor(public backdrop: InputVal) {}
  build(): Block { return Block.create('looks_switchbackdropto').withInput('BACKDROP', this.backdrop); }
}

export class NextBackdrop {
  build(): Block { return Block.create('looks_nextbackdrop'); }
}

export class GoToFrontBack {
  constructor(public frontBack: string) {}
  build(): Block { return Block.create('looks_gotofrontback').withField('FRONT_BACK', this.frontBack); }
}

export class GoForwardBackwardLayers {
  constructor(public num: InputVal, public forwardBackward: string) {}
  build(): Block {
    return Block.create('looks_goforwardbackwardlayers')
      .withInput('NUM', this.num)
      .withField('FORWARD_BACKWARD', this.forwardBackward);
  }
}

export class CostumeNumberName {
  constructor(public numberName: string) {}
  build(): Block { return Block.create('looks_costumenumbername').withField('NUMBER_NAME', this.numberName); }
}

export class BackdropNumberName {
  constructor(public numberName: string) {}
  build(): Block { return Block.create('looks_backdropnumbername').withField('NUMBER_NAME', this.numberName); }
}

export class LooksSize {
  build(): Block { return Block.create('looks_size'); }
}

// ── Sound ─────────────────────────────────────────────────────────────────────

export class PlaySoundUntilDone {
  constructor(public soundMenu: InputVal) {}
  build(): Block { return Block.create('sound_playuntildone').withInput('SOUND_MENU', this.soundMenu); }
}

export class StartSound {
  constructor(public soundMenu: InputVal) {}
  build(): Block { return Block.create('sound_play').withInput('SOUND_MENU', this.soundMenu); }
}

export class StopAllSounds {
  build(): Block { return Block.create('sound_stopallsounds'); }
}

export class SetVolumeTo {
  constructor(public volume: InputVal) {}
  build(): Block { return Block.create('sound_setvolumeto').withInput('VOLUME', this.volume); }
}

export class ChangeVolumeBy {
  constructor(public volume: InputVal) {}
  build(): Block { return Block.create('sound_changevolumeby').withInput('VOLUME', this.volume); }
}

export class SoundMenu {
  constructor(public soundMenu: string) {}
  build(): Block { return Block.create('sound_sounds_menu').withField('SOUND_MENU', this.soundMenu); }
}

export class ChangeSoundEffect {
  constructor(public value: InputVal, public effect: string) {}
  build(): Block {
    return Block.create('sound_changeeffectby').withInput('VALUE', this.value).withField('EFFECT', this.effect);
  }
}

export class SetSoundEffect {
  constructor(public value: InputVal, public effect: string) {}
  build(): Block {
    return Block.create('sound_seteffectto').withInput('VALUE', this.value).withField('EFFECT', this.effect);
  }
}

export class ClearSoundEffects {
  build(): Block { return Block.create('sound_cleareffects'); }
}

export class SoundVolume {
  build(): Block { return Block.create('sound_volume'); }
}

// ── Control ───────────────────────────────────────────────────────────────────

export class Wait {
  constructor(public duration: InputVal) {}
  build(): Block { return Block.create('control_wait').withInput('DURATION', this.duration); }
}

export class Repeat {
  constructor(public times: InputVal, public substack: InputVal) {}
  build(): Block {
    return Block.create('control_repeat').withInput('TIMES', this.times).withInput('SUBSTACK', this.substack);
  }
}

export class Forever {
  constructor(public substack: InputVal) {}
  build(): Block { return Block.create('control_forever').withInput('SUBSTACK', this.substack); }
}

export class If {
  constructor(public condition: InputVal, public substack: InputVal) {}
  build(): Block {
    return Block.create('control_if').withInput('CONDITION', this.condition).withInput('SUBSTACK', this.substack);
  }
}

export class IfElse {
  constructor(public condition: InputVal, public substack: InputVal, public substack2: InputVal) {}
  build(): Block {
    return Block.create('control_if_else')
      .withInput('CONDITION', this.condition)
      .withInput('SUBSTACK', this.substack)
      .withInput('SUBSTACK2', this.substack2);
  }
}

export class WaitUntil {
  constructor(public condition: InputVal) {}
  build(): Block { return Block.create('control_wait_until').withInput('CONDITION', this.condition); }
}

export class RepeatUntil {
  constructor(public condition: InputVal, public substack: InputVal) {}
  build(): Block {
    return Block.create('control_repeat_until')
      .withInput('CONDITION', this.condition)
      .withInput('SUBSTACK', this.substack);
  }
}

export class Stop {
  constructor(public stopOption: string) {}
  build(): Block { return Block.create('control_stop').withField('STOP_OPTION', this.stopOption); }
}

export class WhenIStartAsAClone {
  build(): Block { return Block.create('control_start_as_clone'); }
}

export class CreateCloneOfMenu {
  constructor(public cloneOption: string) {}
  build(): Block { return Block.create('control_create_clone_of_menu').withField('CLONE_OPTION', this.cloneOption); }
}

export class CreateCloneOf {
  constructor(public cloneOption: InputVal) {}
  build(): Block { return Block.create('control_create_clone_of').withInput('CLONE_OPTION', this.cloneOption); }
}

export class DeleteThisClone {
  build(): Block { return Block.create('control_delete_this_clone'); }
}

// ── Operators ─────────────────────────────────────────────────────────────────

export class Add {
  constructor(public num1: InputVal, public num2: InputVal) {}
  build(): Block {
    return Block.create('operator_add').withInput('NUM1', this.num1).withInput('NUM2', this.num2);
  }
}

export class Subtract {
  constructor(public num1: InputVal, public num2: InputVal) {}
  build(): Block {
    return Block.create('operator_subtract').withInput('NUM1', this.num1).withInput('NUM2', this.num2);
  }
}

export class Multiply {
  constructor(public num1: InputVal, public num2: InputVal) {}
  build(): Block {
    return Block.create('operator_multiply').withInput('NUM1', this.num1).withInput('NUM2', this.num2);
  }
}

export class Divide {
  constructor(public num1: InputVal, public num2: InputVal) {}
  build(): Block {
    return Block.create('operator_divide').withInput('NUM1', this.num1).withInput('NUM2', this.num2);
  }
}

export class Random {
  constructor(public from: InputVal, public to: InputVal) {}
  build(): Block {
    return Block.create('operator_random').withInput('FROM', this.from).withInput('TO', this.to);
  }
}

export class Lt {
  constructor(public operand1: InputVal, public operand2: InputVal) {}
  build(): Block {
    return Block.create('operator_lt').withInput('OPERAND1', this.operand1).withInput('OPERAND2', this.operand2);
  }
}

export class Gt {
  constructor(public operand1: InputVal, public operand2: InputVal) {}
  build(): Block {
    return Block.create('operator_gt').withInput('OPERAND1', this.operand1).withInput('OPERAND2', this.operand2);
  }
}

export class Eq {
  constructor(public operand1: InputVal, public operand2: InputVal) {}
  build(): Block {
    return Block.create('operator_equals').withInput('OPERAND1', this.operand1).withInput('OPERAND2', this.operand2);
  }
}

export class And {
  constructor(public operand1: InputVal, public operand2: InputVal) {}
  build(): Block {
    return Block.create('operator_and').withInput('OPERAND1', this.operand1).withInput('OPERAND2', this.operand2);
  }
}

export class Or {
  constructor(public operand1: InputVal, public operand2: InputVal) {}
  build(): Block {
    return Block.create('operator_or').withInput('OPERAND1', this.operand1).withInput('OPERAND2', this.operand2);
  }
}

export class Not {
  constructor(public operand: InputVal) {}
  build(): Block { return Block.create('operator_not').withInput('OPERAND', this.operand); }
}

export class Join {
  constructor(public string1: InputVal, public string2: InputVal) {}
  build(): Block {
    return Block.create('operator_join').withInput('STRING1', this.string1).withInput('STRING2', this.string2);
  }
}

export class LetterOf {
  constructor(public letter: InputVal, public string: InputVal) {}
  build(): Block {
    return Block.create('operator_letter_of').withInput('LETTER', this.letter).withInput('STRING', this.string);
  }
}

export class LengthOf {
  constructor(public string: InputVal) {}
  build(): Block { return Block.create('operator_length').withInput('STRING', this.string); }
}

export class Contains {
  constructor(public string1: InputVal, public string2: InputVal) {}
  build(): Block {
    return Block.create('operator_contains').withInput('STRING1', this.string1).withInput('STRING2', this.string2);
  }
}

export class Mod {
  constructor(public num1: InputVal, public num2: InputVal) {}
  build(): Block {
    return Block.create('operator_mod').withInput('NUM1', this.num1).withInput('NUM2', this.num2);
  }
}

export class Round {
  constructor(public num: InputVal) {}
  build(): Block { return Block.create('operator_round').withInput('NUM', this.num); }
}

export class MathOp {
  constructor(public num: InputVal, public operator: string) {}
  build(): Block {
    return Block.create('operator_mathop').withInput('NUM', this.num).withField('OPERATOR', this.operator);
  }
}

// ── Sensing ───────────────────────────────────────────────────────────────────

export class AskAndWait {
  constructor(public question: InputVal) {}
  build(): Block { return Block.create('sensing_askandwait').withInput('QUESTION', this.question); }
}

export class ResetTimer {
  build(): Block { return Block.create('sensing_resettimer'); }
}

export class TouchingObjectMenu {
  constructor(public touchingObjectMenu: string) {}
  build(): Block {
    return Block.create('sensing_touchingobjectmenu').withField('TOUCHINGOBJECTMENU', this.touchingObjectMenu);
  }
}

export class TouchingObject {
  constructor(public touchingObjectMenu: InputVal) {}
  build(): Block {
    return Block.create('sensing_touchingobject').withInput('TOUCHINGOBJECTMENU', this.touchingObjectMenu);
  }
}

export class TouchingColor {
  constructor(public color: InputVal) {}
  build(): Block { return Block.create('sensing_touchingcolor').withInput('COLOR', this.color); }
}

export class ColorIsTouchingColor {
  constructor(public color: InputVal, public color2: InputVal) {}
  build(): Block {
    return Block.create('sensing_coloristouchingcolor')
      .withInput('COLOR', this.color)
      .withInput('COLOR2', this.color2);
  }
}

export class DistanceToMenu {
  constructor(public distanceToMenu: string) {}
  build(): Block {
    return Block.create('sensing_distancetomenu').withField('DISTANCETOMENU', this.distanceToMenu);
  }
}

export class DistanceTo {
  constructor(public distanceToMenu: InputVal) {}
  build(): Block { return Block.create('sensing_distanceto').withInput('DISTANCETOMENU', this.distanceToMenu); }
}

export class KeyOptions {
  constructor(public keyOption: string) {}
  build(): Block { return Block.create('sensing_keyoptions').withField('KEY_OPTION', this.keyOption); }
}

export class KeyPressed {
  constructor(public keyOption: InputVal) {}
  build(): Block { return Block.create('sensing_keypressed').withInput('KEY_OPTION', this.keyOption); }
}

export class MouseDown {
  build(): Block { return Block.create('sensing_mousedown'); }
}

export class MouseX {
  build(): Block { return Block.create('sensing_mousex'); }
}

export class MouseY {
  build(): Block { return Block.create('sensing_mousey'); }
}

export class SetDragMode {
  constructor(public dragMode: string) {}
  build(): Block { return Block.create('sensing_setdragmode').withField('DRAG_MODE', this.dragMode); }
}

export class Loudness {
  build(): Block { return Block.create('sensing_loudness'); }
}

export class SensingTimer {
  build(): Block { return Block.create('sensing_timer'); }
}

export class OfObjectMenu {
  constructor(public object: string) {}
  build(): Block { return Block.create('sensing_of_object_menu').withField('OBJECT', this.object); }
}

export class Of {
  constructor(public object: InputVal, public property: string) {}
  build(): Block {
    return Block.create('sensing_of').withInput('OBJECT', this.object).withField('PROPERTY', this.property);
  }
}

export class SensingCurrent {
  constructor(public currentMenu: string) {}
  build(): Block { return Block.create('sensing_current').withField('CURRENTMENU', this.currentMenu); }
}

export class DaysSince2000 {
  build(): Block { return Block.create('sensing_dayssince2000'); }
}

export class Online {
  build(): Block { return Block.create('sensing_online'); }
}

export class SensingUsername {
  build(): Block { return Block.create('sensing_username'); }
}

export class SensingAnswer {
  build(): Block { return Block.create('sensing_answer'); }
}

// ── Data ──────────────────────────────────────────────────────────────────────

export class SetVariableTo {
  constructor(public value: InputVal, public variable: string) {}
  build(): Block {
    return Block.create('data_setvariableto').withInput('VALUE', this.value).withField('VARIABLE', this.variable);
  }
}

export class ChangeVariableBy {
  constructor(public value: InputVal, public variable: string) {}
  build(): Block {
    return Block.create('data_changevariableby').withInput('VALUE', this.value).withField('VARIABLE', this.variable);
  }
}

export class ShowVariable {
  constructor(public variable: string) {}
  build(): Block { return Block.create('data_showvariable').withField('VARIABLE', this.variable); }
}

export class HideVariable {
  constructor(public variable: string) {}
  build(): Block { return Block.create('data_hidevariable').withField('VARIABLE', this.variable); }
}

export class AddToList {
  constructor(public item: InputVal, public list: string) {}
  build(): Block {
    return Block.create('data_addtolist').withInput('ITEM', this.item).withField('LIST', this.list);
  }
}

export class DeleteOfList {
  constructor(public index: InputVal, public list: string) {}
  build(): Block {
    return Block.create('data_deleteoflist').withInput('INDEX', this.index).withField('LIST', this.list);
  }
}

export class DeleteAllOfList {
  constructor(public list: string) {}
  build(): Block { return Block.create('data_deletealloflist').withField('LIST', this.list); }
}

export class InsertAtList {
  constructor(public item: InputVal, public index: InputVal, public list: string) {}
  build(): Block {
    return Block.create('data_insertatlist')
      .withInput('ITEM', this.item)
      .withInput('INDEX', this.index)
      .withField('LIST', this.list);
  }
}

export class ReplaceItemOfList {
  constructor(public index: InputVal, public item: InputVal, public list: string) {}
  build(): Block {
    return Block.create('data_replaceitemoflist')
      .withInput('INDEX', this.index)
      .withInput('ITEM', this.item)
      .withField('LIST', this.list);
  }
}

export class ItemOfList {
  constructor(public index: InputVal, public list: string) {}
  build(): Block {
    return Block.create('data_itemoflist').withInput('INDEX', this.index).withField('LIST', this.list);
  }
}

export class ItemNumOfList {
  constructor(public item: InputVal, public list: string) {}
  build(): Block {
    return Block.create('data_itemnumoflist').withInput('ITEM', this.item).withField('LIST', this.list);
  }
}

export class LengthOfList {
  constructor(public list: string) {}
  build(): Block { return Block.create('data_lengthoflist').withField('LIST', this.list); }
}

export class ListContainsItem {
  constructor(public item: InputVal, public list: string) {}
  build(): Block {
    return Block.create('data_listcontainsitem').withInput('ITEM', this.item).withField('LIST', this.list);
  }
}

export class ShowList {
  constructor(public list: string) {}
  build(): Block { return Block.create('data_showlist').withField('LIST', this.list); }
}

export class HideList {
  constructor(public list: string) {}
  build(): Block { return Block.create('data_hidelist').withField('LIST', this.list); }
}

// ── Procedures ────────────────────────────────────────────────────────────────

export class ArgumentReporterStringNumber {
  constructor(public value: string) {}
  build(): Block { return Block.create('argument_reporter_string_number').withField('VALUE', this.value); }
}

export class ArgumentReporterBoolean {
  constructor(public value: string) {}
  build(): Block { return Block.create('argument_reporter_boolean').withField('VALUE', this.value); }
}
