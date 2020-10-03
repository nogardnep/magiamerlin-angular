import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SelectionControlComponent } from './components/control/selection-control/selection-control.component';
import { PatternEventComponent } from './components/edition/pattern-event/pattern-event.component';
import { PatternComponent } from './components/edition/pattern/pattern.component';
import { SequenceComponent } from './components/edition/sequence/sequence.component';
import { TrackComponent } from './components/edition/track/track.component';
import { IndexPageComponent } from './components/page/index-page/index-page.component';
import { LoadingComponent } from './components/control/loading/loading.component';
import { PatternListComponent } from './components/list/pattern-list/pattern-list.component';
import { PatternBeatComponent } from './components/pattern-sheet/pattern-beat/pattern-beat.component';
import { PatternMesureComponent } from './components/pattern-sheet/pattern-mesure/pattern-mesure.component';
import { PatternStepComponent } from './components/pattern-sheet/pattern-step/pattern-step.component';
import { ProjectLoaderPageComponent } from './components/page/project-loader-page/project-loader-page.component';
import { ProjectPageComponent } from './components/page/project-page/project-page.component';
import { ProjectComponent } from './components/edition/project/project.component';
import { ProjectsControlComponent } from './components/control/projects-control/projects-control.component';
import { AudioSamplerComponent } from './components/sampler/audio-sampler/audio-sampler.component';
import { SequenceListComponent } from './components/list/sequence-list/sequence-list.component';
import { SequencerComponent } from './components/sequencer/sequencer.component';
import { TrackListComponent } from './components/list/track-list/track-list.component';
import { TrackAudioLoaderPageComponent } from './components/page/track-audio-loader-page/track-audio-loader-page.component';
import { TimeSignatureComponent } from './components/utils/time-signature/time-signature.component';
import { appRoutes } from './routerConfig';
import { TracksPresetExplorerComponent } from './components/page/tracks-preset-explorer/tracks-preset-explorer.component';
import { TracksPresetsControlComponent } from './components/control/tracks-presets-control/tracks-presets-control.component';
import { ConfigurationPageComponent } from './components/page/configuration-page/configuration-page.component';
import { ResourceLoaderComponent } from './components/loader/resource-loader/resource-loader.component';
import { AudioTrackLoaderComponent } from './components/loader/track-audio-loader/track-audio-loader.component';
import { FilenamePipe } from './pipes/filename.pipe';
import { SequencesComponent } from './components/edition/sequences/sequences.component';
import { SongPartsComponent } from './components/edition/song-parts/song-parts.component';
import { PatternPlayerComponent } from './components/edition/pattern-player/pattern-player.component';
import { SongPartComponent } from './components/edition/song-part/song-part.component';
import { TrackAudioComponent } from './components/edition/track-audio/track-audio.component';
import { TrackVideoComponent } from './components/edition/track-video/track-video.component';
import { TrackVideoLoaderComponent } from './components/loader/track-video-loader/track-video-loader.component';
import { TrackMidiComponent } from './components/edition/track-midi/track-midi.component';
import { TrackVideoLoaderPageComponent } from './components/page/track-video-loader-page/track-video-loader-page.component';
import { ParametersEditorComponent } from './components/parameters/parameters-editor/parameters-editor.component';
import { ParameterEditorComponent } from './components/parameters/parameter-editor/parameter-editor.component';
import { ParameterViewerComponent } from './components/parameters/parameter-viewer/parameter-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    PatternListComponent,
    SequenceListComponent,
    PatternComponent,
    SequenceComponent,
    TimeSignatureComponent,
    TrackComponent,
    TrackListComponent,
    SelectionControlComponent,
    SequencerComponent,
    ParameterEditorComponent,
    PatternMesureComponent,
    PatternBeatComponent,
    PatternStepComponent,
    PatternEventComponent,
    ProjectLoaderPageComponent,
    LoadingComponent,
    ProjectPageComponent,
    ProjectsControlComponent,
    TrackAudioLoaderPageComponent,
    IndexPageComponent,
    AudioSamplerComponent,
    TracksPresetExplorerComponent,
    TracksPresetsControlComponent,
    ConfigurationPageComponent,
    ResourceLoaderComponent,
    TrackAudioLoaderPageComponent,
    AudioTrackLoaderComponent,
    FilenamePipe,
    SequencesComponent,
    SongPartsComponent,
    PatternPlayerComponent,
    SongPartComponent,
    TrackAudioComponent,
    TrackVideoComponent,
    TrackVideoLoaderComponent,
    TrackMidiComponent,
    TrackVideoLoaderPageComponent,
    ParametersEditorComponent,
    ParameterViewerComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
