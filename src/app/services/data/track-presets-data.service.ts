import { ServerService } from 'src/app/services/data/server.service';
import { HttpClient } from '@angular/common/http';
import { TrackPreset } from 'src/models/entity/TrackPreset.mode';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrackPresetsDataService {
  constructor(
    private httpClient: HttpClient,
    private serverService: ServerService
  ) {}

  load(): Promise<TrackPreset[]> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<TrackPreset[]>(this.getTracksPresetsPath())
        .subscribe(
          (response) => {
            const tracksPresets = [];

            response.map((data: object) => {
              tracksPresets.push(this.makeTracksPreset(data));
            });

            resolve(tracksPresets);
          },
          (error) => {
            this.serverService.printError(
              'error when loading tracks presets : ' + error
            );
            reject(error);
          }
        );
    });
  }

  add(data: object): Promise<TrackPreset> {
    return new Promise((resolve, reject) => {
      this.httpClient.post<object>(this.getTracksPresetsPath(), data).subscribe(
        (receivedData) => {
          const newPreset = this.makeTracksPreset(receivedData);
          resolve(newPreset);
        },
        (error) => {
          this.serverService.printError('error when adding preset: ' + error);
          reject(error);
        }
      );
    });
  }

  delete(preset: TrackPreset): Promise<object> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete(this.getTracksPresetsPath() + '/' + preset.name)
        .subscribe(
          (response) => {
            resolve();
          },
          (error) => {
            this.serverService.printError(
              'error when deleting preset: ' + error
            );
            reject(error);
          }
        );
    });
  }

  private getTracksPresetsPath(): string {
    return this.serverService.getRootForTracksPresets();
  }

  private makeTracksPreset(data: object): TrackPreset {
    return data as TrackPreset;
  }
}
