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
import { ProjectLoaderPageComponent } from './components/page/project-loader-page/project-loader-page.component';
import { ProjectPageComponent } from './components/page/project-page/project-page.component';
import { ProjectComponent } from './components/edition/project/project.component';
import { ProjectsControlComponent } from './components/control/projects-control/projects-control.component';
import { TrackPlayerComponent } from './components/player/track-player/track-player.component';
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
import { SongPartPlayerComponent } from './components/player/song-part-player/song-part-player.component';
import { PatternPlayerComponent } from './components/player/pattern-player/pattern-player.component';
import { SongPartComponent } from './components/edition/song-part/song-part.component';
import { TrackAudioComponent } from './components/edition/track-audio/track-audio.component';
import { TrackVideoComponent } from './components/edition/track-video/track-video.component';
import { TrackVideoLoaderComponent } from './components/loader/track-video-loader/track-video-loader.component';
import { TrackMidiComponent } from './components/edition/track-midi/track-midi.component';
import { TrackVideoLoaderPageComponent } from './components/page/track-video-loader-page/track-video-loader-page.component';
import { ParametersEditorComponent } from './components/parameters/parameters-editor/parameters-editor.component';
import { ParameterEditorComponent } from './components/parameters/parameter-editor/parameter-editor.component';
import { ParameterViewerComponent } from './components/parameters/parameter-viewer/parameter-viewer.component';
import { SequencePlayerComponent } from './components/player/sequence-player/sequence-player.component';
import { PatternSheetEventComponent } from './components/sheet/pattern-sheet-event/pattern-sheet-event.component';
import { PatternSheetComponent } from './components/sheet/pattern-sheet/pattern-sheet.component';
import { PatternPlayerTriggerComponent } from './components/player/pattern-player-trigger/pattern-player-trigger.component';
import { PositionComponent } from './components/utils/position/position.component';
import { SpecialActionsControlComponent } from './components/control/special-actions-control/special-actions-control.component';

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
    PatternEventComponent,
    ProjectLoaderPageComponent,
    LoadingComponent,
    ProjectPageComponent,
    ProjectsControlComponent,
    TrackAudioLoaderPageComponent,
    IndexPageComponent,
    TrackPlayerComponent,
    TracksPresetExplorerComponent,
    TracksPresetsControlComponent,
    ConfigurationPageComponent,
    ResourceLoaderComponent,
    TrackAudioLoaderPageComponent,
    AudioTrackLoaderComponent,
    FilenamePipe,
    SequencePlayerComponent,
    SongPartPlayerComponent,
    PatternPlayerComponent,
    SongPartComponent,
    TrackAudioComponent,
    TrackVideoComponent,
    TrackVideoLoaderComponent,
    TrackMidiComponent,
    TrackVideoLoaderPageComponent,
    ParametersEditorComponent,
    ParameterViewerComponent,
    SequencePlayerComponent,
    PatternSheetEventComponent,
    PatternSheetComponent,
    PatternPlayerTriggerComponent,
    PositionComponent,
    SpecialActionsControlComponent,
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
