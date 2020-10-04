import { configuration } from 'src/app/config/config';
import { TrackAudio } from 'src/app/models/entity/TrackAudio.model';
import { TrackVideo } from 'src/app/models/entity/TrackVideo.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Pattern } from 'src/app/models/entity/Pattern.model';
import { Project } from 'src/app/models/entity/Project.model';
import { Sequence } from 'src/app/models/entity/Sequence.model';
import { SongPart } from 'src/app/models/entity/SongPart.model';
import { TimeSignature } from 'src/app/models/entity/TimeSignature.model';
import { Track } from 'src/app/models/entity/Track.model';
import { SelectionService } from 'src/app/services/control/selection.service';
import { ProjectsDataService } from 'src/app/services/data/projects-data.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsManagerService {
  constructor(
    private router: Router,
    private selectionService: SelectionService,
    private projectsDataService: ProjectsDataService
  ) {}

  loadProject(): void {
    this.router.navigate(['/project-loader']); // TODO: do not use string
  }

  createProject(name: string): void {
    this.projectsDataService
      .addProject(this.makeNewProject(name))
      .then((createdProject: Project) => {
        this.selectionService.selectProject(createdProject);
        this.router.navigate(['/project']); // TODO: do not use string
      })
      .catch((error) => {
        alert(error.error);
      });
  }

  deleteProject(project: Project): void {
    this.projectsDataService.deleteProject(project).then(() => {
      this.selectionService.selectProject(null);
      this.router.navigate(['/']); // TODO: do not use string
    });
  }

  saveProject(project: Project): void {
    this.projectsDataService.updateProject(project);
  }

  private makeNewProject(name: string): Project {
    name = name.replace(' ', '_');

    const songParts: SongPart[] = [];
    const sequences: Sequence[] = [];
    const patterns: Pattern[] = [];
    const tracks: Track[] = [];

    for (
      let num = configuration.entities.firstNum;
      num <= configuration.entities.songPartNumber;
      num++
    ) {
      const newSongPart = {
        num,
        sequenceNum: num,
        repetitions: 1,
      } as SongPart;

      songParts.push(newSongPart);
    }

    for (
      let num = configuration.entities.firstNum;
      num <= configuration.entities.sequenceNumber;
      num++
    ) {
      const newSequence = {
        num,
        timeSignature: {
          step: 4,
          beat: 4,
          mesure: 1,
        } as TimeSignature,
      } as Sequence;

      sequences.push(newSequence);
    }

    for (
      let bank = configuration.entities.firstNum;
      bank <= configuration.entities.bankNumber;
      bank++
    ) {
      for (
        let num = configuration.entities.firstNum;
        num <= configuration.entities.patternNumber;
        num++
      ) {
        const newPattern = {
          num,
          bank,
          events: [],
          timeSignature: {
            step: 4,
            beat: 4,
            mesure: 1,
          } as TimeSignature,
        } as Pattern;

        patterns.push(newPattern);
      }
    }

    for (
      let bank = configuration.entities.firstNum;
      bank <= configuration.entities.bankNumber;
      bank++
    ) {
      for (
        let num = configuration.entities.firstNum;
        num <= configuration.entities.trackNumber;
        num++
      ) {
        const newTrack = {
          num,
          bank,
          audio: {
            resource: null,
          } as TrackAudio,
          video: {
            resource: null,
          } as TrackVideo,
        } as Track;

        tracks.push(newTrack);
      }
    }

    return {
      name,
      songParts,
      patterns,
      sequences,
      tracks,
    } as Project;
  }
}
