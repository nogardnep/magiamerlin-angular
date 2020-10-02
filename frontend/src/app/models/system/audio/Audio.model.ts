export class Audio {
  private name: string;
  private volume: number;
  private extensions: string[];

  constructor(name: string, extension: string[], volume?: number) {
    this.name = name;
    this.extensions = extension;

    if (volume != null) {
      this.volume = volume;
    } else {
      this.volume = 1;
    }
  }

  getExtensions(): string[] {
    return this.extensions;
  }

  getName(): string {
    return this.name;
  }

  getVolume(): number {
    return this.volume;
  }
}
