export const config = {
  frontendPort: 4200,
  backendPort: 8000,
  url: 'http://localhost',
  apiRoot: 'api',
  userConfigPath: 'src/config/user-config.json',
  projectsPath: 'projects',
  trackPresetsPath: 'presets',
  resourcesPath: 'resources',
  projectDataFileName: '_project.json',
  presetDataFileName: '_preset.json',
  entities: {
    firstNum: 1,
    maxNum: 1000,
  },
  routes: {
    file: 'file',
    project: 'project',
    resource: 'resource',
    configuration: 'configuration',
    tracksPreset: 'tracks-preset',
    explorer: 'explorer',
    upload: 'upload',
  },
  sequencer: {
    ticksByBeat: 12,
    timeSignature: {
      step: {
        min: 3,
        max: 4,
      },
      beat: {
        min: 1,
        max: 16,
      },
      measure: {
        min: 1,
        max: 16,
      },
    },
  },
  uploadId: 'upload',
  uploadFolder: 'uploads', // TODO: keep?
  recording: {
    audioExtension: 'wav',
  },
};
