import { ScalarMonitorClass, ScalarMonitorMode, ScalarMonitorOpcode, VariableValue } from './Monitor';

export default abstract class ScalarBuilder {
  spriteName: string | null = null;
  mode: ScalarMonitorMode = ScalarMonitorMode.default;
  value: VariableValue = 0;
  x = 0;
  y = 0;
  visible = true;
  width = 0;
  height = 0;
  sliderMin = 0;
  sliderMax = 100;
  isDiscrete = true;

  constructor(public readonly id: string) {}

  protected buildScalar(opcode: ScalarMonitorOpcode, params: Record<string, string> = {}): ScalarMonitorClass {
    const m = new ScalarMonitorClass();
    m.id = this.id;
    m.mode = this.mode;
    m.opcode = opcode;
    m.params = params;
    m.spriteName = this.spriteName;
    m.value = this.value;
    m.width = this.width;
    m.height = this.height;
    m.x = this.x;
    m.y = this.y;
    m.visible = this.visible;
    m.sliderMin = this.sliderMin;
    m.sliderMax = this.sliderMax;
    m.isDiscrete = this.isDiscrete;
    return m;
  }

  abstract build(): ScalarMonitorClass;
}
