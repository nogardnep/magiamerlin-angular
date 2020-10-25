import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MidiService {
  midi: any;
  inputs: any[];
  outputs: any[];

  constructor() {}

  connect(callback: () => void): void {
    navigator['requestMIDIAccess']().then(
      (midi) => {
        midi.addEventListener('statechange', (event) =>
          this.initDevices(event.target, callback)
        );

        this.initDevices(midi, callback);
      },
      (err) => console.log('Something went wrong', err)
    );
  }

  private initDevices(midi, callback): void {
    // Reset.
    this.inputs = [];
    this.outputs = [];

    const inputsIterator = midi.inputs.values();
    console.log(inputsIterator);
    for (
      let input = inputsIterator.next();
      input && !input.done;
      input = inputsIterator.next()
    ) {
      this.inputs.push(input['value']);
    }

    const outputsIterator = midi.outputs.values();
    for (
      let output = outputsIterator.next();
      output && !output.done;
      output = outputsIterator.next()
    ) {
      this.outputs.push(output.value);
    }

    callback();
  }

  getInputs(): any[] {
    return this.inputs;
  }

  private midiMessageReceived(event): void {
    console.log(event);
  }
}
