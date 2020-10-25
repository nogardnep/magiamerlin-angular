import { ParametersModel } from './../Parameter';
import { Entity } from './../entity/Entity.model';

export class ParameterWrapper {
  constructor(
    private entity: Entity,
    private parametersModel: ParametersModel,
    private key: string
  ) {}

  getEntity(): Entity {
    return this.entity;
  }

  getParameterModel(): ParametersModel {
    return this.parametersModel;
  }

  getKey(): string {
    return this.key;
  }
}
