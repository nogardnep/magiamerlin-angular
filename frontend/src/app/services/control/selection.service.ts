import { SongPart } from 'src/app/models/entity/SongPart.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Event } from 'src/app/models/entity/Event.model';
import { Pattern } from 'src/app/models/entity/Pattern.model';
import { Project } from 'src/app/models/entity/Project.model';
import { Resource } from 'src/app/models/entity/Resource.model';
import { Sequence } from 'src/app/models/entity/Sequence.model';
import { Track } from 'src/app/models/entity/Track.model';
import { ControlMode } from 'src/app/models/system/control/ControlMode.model';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { AudioSamplerService } from 'src/app/services/sampler/audio-sampler.service';
import { PatternsService } from 'src/app/services/sequencer/patterns.service';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  private selectedProject: Project = null;
  private selectedPattern: Pattern = null;
  private selectedSequence: Sequence = null;
  private selectedTrack: Track = null;
  private selectedMode: ControlMode = null;
  private selectedEvent: Event = null;
  private selectedBank: number = null;
  private selectedSongPart: SongPart = null;
  private loading = false;

  selectedProjectSubject = new Subject<Project>();
  selectedPatternSubject = new Subject<Pattern>();
  selectedSequenceSubject = new Subject<Sequence>();
  selectedTrackSubject = new Subject<Track>();
  selectedModeSubject = new Subject<ControlMode>();
  selectedEventSubject = new Subject<Event>();
  selectedBankSubject = new Subject<number>();
  selectedSongPartSubject = new Subject<SongPart>();
  loadingSubject = new Subject<boolean>();

  constructor(
    private audioSamplerService: AudioSamplerService,
    private patternsService: PatternsService,
    private configurationService: ConfigurationService
  ) {}

  selectProject(project: Project): void {
    this.unselectAll();
    this.selectedProject = project;
    this.emitSelectedProject();

    if (this.selectedProject !== null) {
      this.selectDefault();

      this.audioSamplerService.initTracks(this.selectedProject.tracks);

      this.patternsService.initPatterns(this.selectedProject.patterns);
    }
  }

  selectMode(mode: ControlMode): void {
    this.selectedMode = mode;
    this.emitSelectedMode();
  }

  selectEvent(event: Event): void {
    this.selectedEvent = event;
    this.emitSelectedEvent();
  }

  selectBank(bank: number): void {
    this.selectedBank = bank;
    this.emitSelectedBank();
  }

  private selectDefault(): void {
    if (this.selectedProject.songParts.length > 0) {
      this.selectSongPart(this.selectedProject.songParts[0]);
    }

    if (this.selectedProject.patterns.length > 0) {
      this.selectPattern(this.selectedProject.patterns[0]);
    }

    if (this.selectedProject.sequences.length > 0) {
      this.selectSequence(this.selectedProject.sequences[0]);
    }

    if (this.selectedProject.tracks.length > 0) {
      this.selectTrack(this.selectedProject.tracks[0]);
    }

    this.selectBank(this.configurationService.getConfigurations().firstNum);
  }

  private unselectAll(): void {
    this.selectSongPart(null);
    this.selectSequence(null);
    this.selectPattern(null);
    this.selectTrack(null);
  }

  selectSongPart(songPart: SongPart): void {
    this.selectedSongPart = songPart;
    this.emitSelectedSongPart();
  }

  selectSequence(sequence: Sequence): void {
    this.selectedSequence = sequence;
    this.emitSelectedSequence();
  }

  selectPattern(pattern: Pattern): void {
    this.selectedPattern = pattern;
    this.emitSelectedPattern();
  }

  selectTrack(track: Track): void {
    this.selectedTrack = track;
    this.emitSelectedTrack();
  }

  selectSequenceByNum(num: number): void {
    let found: Sequence = null;

    if (this.selectedProject !== null) {
      this.selectedProject.sequences.forEach((sequence: Sequence) => {
        if (sequence.num === +num) {
          found = sequence;
        }
      });
    }

    this.selectSequence(found);
  }

  selectPatternByNum(num: number, bank: number): void {
    let found: Pattern = null;

    if (this.selectedProject !== null) {
      this.selectedProject.patterns.forEach((pattern: Pattern) => {
        if (pattern.num === +num && pattern.bank === +bank) {
          found = pattern;
        }
      });
    }

    this.selectPattern(found);
  }

  selectTrackByNum(num: number, bank: number): void {
    let found: Track = null;

    if (this.selectedProject !== null) {
      this.selectedProject.tracks.forEach((track: Track) => {
        if (track.num === +num && track.bank === +bank) {
          found = track;
        }
      });
    }

    this.selectTrack(found);
  }

  setTrackSound(track: Track, resource: Resource): void {
    track.audio.resource = resource;
    this.audioSamplerService.updateTrack(track);
  }

  setTrackVideo(track: Track, resource: Resource): void {
    track.video.resource = resource;
    // TODO: update for video sampler
  }

  getSelectedProject(): Project {
    return this.selectedProject;
  }

  getSelectedSongPart(): SongPart {
    return this.selectedSongPart;
  }

  getSelectedSequence(): Sequence {
    return this.selectedSequence;
  }

  getSelectedPattern(): Pattern {
    return this.selectedPattern;
  }

  getSelectedTrack(): Track {
    return this.selectedTrack;
  }

  getSelectedMode(): ControlMode {
    return this.selectedMode;
  }

  getSelectedBank(): number {
    return this.selectedBank;
  }

  emitSelectedProject(): void {
    this.selectedProjectSubject.next(this.selectedProject);
  }

  emitSelectedSongPart(): void {
    this.selectedSongPartSubject.next(this.selectedSongPart);
  }

  emitSelectedSequence(): void {
    this.selectedSequenceSubject.next(this.selectedSequence);
  }

  emitSelectedPattern(): void {
    this.selectedPatternSubject.next(this.selectedPattern);
  }

  emitSelectedTrack(): void {
    this.selectedTrackSubject.next(this.selectedTrack);
  }

  emitSelectedMode(): void {
    this.selectedModeSubject.next(this.selectedMode);
  }

  emitSelectedEvent(): void {
    this.selectedEventSubject.next(this.selectedEvent);
  }

  emitSelectedBank(): void {
    this.selectedBankSubject.next(this.selectedBank);
  }

  emitLoading(): void {
    this.loadingSubject.next(this.loading);
  }
}
