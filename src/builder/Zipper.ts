import Project  from '../project/Project';
import Costume from '../project/asset/Costume';
import Sound from '../project/asset/Sound';
import JSZip from 'jszip';

export default class Zipper {
  constructor(private project: Project) {}

  async buildToBytes(): Promise<Uint8Array> {
    const zip = new JSZip();
    zip.file('project.json', this.project.serialize());

    const seen = new Set<string>();
    for (const target of this.project.targets) {
      for (const costume of target.costumes) {
        if (costume.data && !seen.has(costume.md5ext)) {
          zip.file(costume.md5ext, costume.data);
          seen.add(costume.md5ext);
        }
      }
      for (const sound of target.sounds) {
        if (sound.data && !seen.has(sound.md5ext)) {
          zip.file(sound.md5ext, sound.data);
          seen.add(sound.md5ext);
        }
      }
    }

    return zip.generateAsync({ type: 'uint8array' });
  }

  async buildToDataURI(): Promise<string> {
    const bytes = await this.buildToBytes();
    return new Promise((resolve, reject) => {
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/x.scratch.sb3' });
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(blob);
    });
  }

  static async decode(data: Uint8Array): Promise<Project> {
    const zip = await JSZip.loadAsync(data);

    const projectFile = zip.file('project.json');
    if (!projectFile) throw new Error('Invalid sb3: missing project.json');
    const project = Project.parse(await projectFile.async('string'));

    await Promise.all(
      project.targets.flatMap(target => [
        ...target.costumes.map(async (costume: Costume) => {
          const file = zip.file(costume.md5ext);
          if (file) costume.data = await file.async('uint8array');
        }),
        ...target.sounds.map(async (sound: Sound) => {
          const file = zip.file(sound.md5ext);
          if (file) sound.data = await file.async('uint8array');
        }),
      ])
    );

    return project;
  }
}
