import { Entity } from './Entity.model';
import { Resource } from './Resource.model';

export interface TrackVideo extends Entity {
  resource: Resource;
  parameters: {};
}
