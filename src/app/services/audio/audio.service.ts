import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  audioContext: AudioContext;

  constructor() {
    this.audioContext = new AudioContext();
  }

  load(url: string, callback: (buffer: AudioBuffer) => void): void {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      const undecodedAudio = request.response;
      this.audioContext.decodeAudioData(undecodedAudio, (buffer) => {
        callback(buffer);
      });
    };
    request.send();
  }

  play(buffer: AudioBuffer): void {
    const source = this.getSourceFor(buffer);
    source.start();
  }

  getSourceFor(buffer: AudioBuffer): AudioBufferSourceNode {
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    return source;
  }

  getAudioContext(): AudioContext {
    return this.audioContext;
  }
}
