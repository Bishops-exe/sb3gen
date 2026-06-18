import 'reflect-metadata';
import { Expose, Transform, Type, instanceToPlain, plainToInstance } from 'class-transformer';
import { IsArray, IsEnum, ValidateNested } from 'class-validator';
import Meta from './Meta';
import Extension from './Extensions';
import { ScalarMonitorClass, ListMonitorClass } from './monitor/Monitor';
import type { Monitor } from './monitor/Monitor';
import { Stage, Sprite } from './Target';

export default class Project {
  @Expose()
  @Transform(({ value }) => {
    if (!Array.isArray(value)) return [];
    return (value as (Stage | Sprite)[]).map(t =>
      instanceToPlain(t, { excludeExtraneousValues: true })
    );
  }, { toPlainOnly: true })
  @Transform(({ value }) => {
    if (!Array.isArray(value)) return [];
    return (value as Record<string, unknown>[]).map(t =>
      t['isStage']
        ? plainToInstance(Stage, t, { excludeExtraneousValues: true })
        : plainToInstance(Sprite, t, { excludeExtraneousValues: true })
    );
  }, { toClassOnly: true })
  targets: (Stage | Sprite)[] = [];

  @Expose()
  @Transform(({ value }) => {
    if (!Array.isArray(value)) return [];
    return (value as Monitor[]).map(m =>
      instanceToPlain(m, { excludeExtraneousValues: true })
    );
  }, { toPlainOnly: true })
  @Transform(({ value }) => {
    if (!Array.isArray(value)) return [];
    return (value as Record<string, unknown>[]).map(m =>
      m['mode'] === 'list'
        ? plainToInstance(ListMonitorClass, m, {excludeExtraneousValues: true })
        : plainToInstance(ScalarMonitorClass, m, { excludeExtraneousValues: true })
    );
  }, { toClassOnly: true })
  monitors: Monitor[] = [];

  @Expose()
  @Transform(({ value }) => {
    if (value instanceof Set) return Array.from(value as Set<Extension>);
    return Array.isArray(value) ? value : [];
  }, { toPlainOnly: true })
  @Transform(({ value }) => new Set<Extension>(Array.isArray(value) ? value : []), { toClassOnly: true })
  extensions: Set<Extension> = new Set();

  @Expose()
  @Type(() => Meta)
  @ValidateNested()
  meta: Meta = new Meta();

  static parse(source: string): Project {
    return plainToInstance(Project, JSON.parse(source) as object, { excludeExtraneousValues: true });
  }

  serialize(): string {
    return JSON.stringify(instanceToPlain(this, { excludeExtraneousValues: true }));
  }

  addStage(stage: Stage): this {
    this.targets.push(stage);
    return this;
  }

  addSprite(sprite: Sprite): this {
    this.targets.push(sprite);
    return this;
  }

  addMonitor(monitor: Monitor): this {
    this.monitors.push(monitor);
    return this;
  }

  addExtension(extension: Extension): this {
    this.extensions.add(extension);
    return this;
  }
}
