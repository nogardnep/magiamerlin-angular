import { Entity } from './Entity.model';


export enum ResourceType {
  Audio = 'audio',
  Image = 'image',
  Video = 'video',
}

export interface Resource extends Entity {
  path: string;
  local: boolean;
}
