import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export default class Meta {
  @Expose()
  @IsString()
  public semver: string = '3.0.0';

  @Expose()
  @IsString()
  public vm: string = '14.1.0';

  @Expose()
  @IsString()
  public agent: string = 'sb3gen';

  constructor(opts: { semver?: string; vm?: string; agent?: string } = {}) {
    if (opts.semver !== undefined) this.semver = opts.semver;
    if (opts.vm !== undefined) this.vm = opts.vm;
    if (opts.agent !== undefined) this.agent = opts.agent;
  }

  static spoof(): Meta {
    return new Meta({
      agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36',
    });
  }

  static useBrowserUseragent(): Meta {
    try {
      return new Meta({ agent: (window as any).navigator.userAgent });
    } catch {
      throw new Error('window.navigator.userAgent does not exist in the current context');
    }
  }
}
