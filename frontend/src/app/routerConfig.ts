import { ConfigurationPageComponent } from './components/page/configuration-page/configuration-page.component';
import { IndexPageComponent } from './components/page/index-page/index-page.component';
import { TrackAudioLoaderPageComponent } from './components/page/track-audio-loader-page/track-audio-loader-page.component';
import { TrackVideoLoaderPageComponent } from './components/page/track-video-loader-page/track-video-loader-page.component';
import { ProjectPageComponent } from './components/page/project-page/project-page.component';
import { ProjectLoaderPageComponent } from './components/page/project-loader-page/project-loader-page.component';
import { TracksPresetExplorerComponent } from './components/page/tracks-preset-explorer/tracks-preset-explorer.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'project',
    component: ProjectPageComponent,
  },
  {
    path: 'configuration',
    component: ConfigurationPageComponent,
  },
  {
    path: 'project-loader',
    component: ProjectLoaderPageComponent,
  },
  {
    path: 'track-audio-loader',
    component: TrackAudioLoaderPageComponent,
  },
  {
    path: 'track-video-loader',
    component: TrackVideoLoaderPageComponent,
  },
  {
    path: 'tracks-preset-loader',
    component: TracksPresetExplorerComponent,
  },
  {
    path: '',
    component: IndexPageComponent,
  },
];
