import { Resource } from './Resource.model';
import { Entity } from './Entity.model';

export interface EntityWithResource extends Entity {
  resource: Resource;
}
