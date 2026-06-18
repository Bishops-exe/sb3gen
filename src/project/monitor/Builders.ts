import { ListMonitorClass, ScalarMonitorClass, ScalarMonitorOpcode, VariableValue } from './Monitor';
import ScalarBuilder from './ScalarBuilder';

export enum NumberName {
  Number = 'number',
  Name = 'name',
}

export enum CurrentMenu {
  Year = 'YEAR',
  Month = 'MONTH',
  Date = 'DATE',
  DayOfWeek = 'DAYOFWEEK',
  Hour = 'HOUR',
  Minute = 'MINUTE',
  Second = 'SECOND',
}

// ── Motion ────────────────────────────────────────────────────────────────────

export class XPosition extends ScalarBuilder {
  build(): ScalarMonitorClass { return this.buildScalar(ScalarMonitorOpcode.motionXposition); }
}

export class YPosition extends ScalarBuilder {
  build(): ScalarMonitorClass { return this.buildScalar(ScalarMonitorOpcode.motionYposition); }
}

export class Direction extends ScalarBuilder {
  build(): ScalarMonitorClass { return this.buildScalar(ScalarMonitorOpcode.motionDirection); }
}

// ── Looks ─────────────────────────────────────────────────────────────────────

export class CostumeNumberName extends ScalarBuilder {
  constructor(id: string, public numberName: NumberName) { super(id); }
  build(): ScalarMonitorClass {
    return this.buildScalar(ScalarMonitorOpcode.looksCostumenumbername, { NUMBER_NAME: this.numberName });
  }
}

export class BackdropNumberName extends ScalarBuilder {
  constructor(id: string, public numberName: NumberName) { super(id); }
  build(): ScalarMonitorClass {
    return this.buildScalar(ScalarMonitorOpcode.looksBackdropnumbername, { NUMBER_NAME: this.numberName });
  }
}

export class Size extends ScalarBuilder {
  build(): ScalarMonitorClass { return this.buildScalar(ScalarMonitorOpcode.looksSize); }
}

// ── Sound ─────────────────────────────────────────────────────────────────────

export class Volume extends ScalarBuilder {
  build(): ScalarMonitorClass { return this.buildScalar(ScalarMonitorOpcode.soundVolume); }
}

// ── Sensing ───────────────────────────────────────────────────────────────────

export class Answer extends ScalarBuilder {
  build(): ScalarMonitorClass { return this.buildScalar(ScalarMonitorOpcode.sensingAnswer); }
}

export class Loudness extends ScalarBuilder {
  build(): ScalarMonitorClass { return this.buildScalar(ScalarMonitorOpcode.sensingLoudness); }
}

export class Timer extends ScalarBuilder {
  build(): ScalarMonitorClass { return this.buildScalar(ScalarMonitorOpcode.sensingTimer); }
}

export class Online extends ScalarBuilder {
  build(): ScalarMonitorClass { return this.buildScalar(ScalarMonitorOpcode.sensingOnline); }
}

export class Username extends ScalarBuilder {
  build(): ScalarMonitorClass { return this.buildScalar(ScalarMonitorOpcode.sensingUsername); }
}

export class Current extends ScalarBuilder {
  constructor(id: string, public currentMenu: CurrentMenu) { super(id); }
  build(): ScalarMonitorClass {
    return this.buildScalar(ScalarMonitorOpcode.sensingCurrent, { CURRENTMENU: this.currentMenu });
  }
}

// ── Data ──────────────────────────────────────────────────────────────────────

export class Variable extends ScalarBuilder {
  constructor(id: string, public variable: string) { super(id); }
  build(): ScalarMonitorClass {
    return this.buildScalar(ScalarMonitorOpcode.dataVariable, { VARIABLE: this.variable });
  }
}

export class ListContents {
  spriteName: string | null = null;
  value: VariableValue[] = [];
  x = 0;
  y = 0;
  visible = true;
  width = 0;
  height = 0;

  constructor(public readonly id: string, public list: string) {}

  build(): ListMonitorClass {
    const m = new ListMonitorClass();
    m.id = this.id;
    m.mode = 'list';
    m.opcode = 'data_listcontents';
    m.params = { LIST: this.list };
    m.spriteName = this.spriteName;
    m.value = this.value;
    m.width = this.width;
    m.height = this.height;
    m.x = this.x;
    m.y = this.y;
    m.visible = this.visible;
    return m;
  }
}
