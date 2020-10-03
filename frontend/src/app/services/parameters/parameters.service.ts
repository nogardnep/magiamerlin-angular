import { Entity } from 'src/app/models/entity/Entity.model';
import { ParameterModel, ParameterLabel, ParametersModel } from 'src/app/models/Parameter';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ParametersService {
  constructor() {}

  checkParameter(
    entity: Entity,
    parametersModel: ParametersModel,
    key: string
  ): void {
    if (entity.parameters === undefined) {
      entity.parameters = {};
    }

    if (entity.parameters[key] === undefined) {
      entity.parameters[key] = parametersModel[key].default;
    }
  }

  getLabelFor(value: number, parameterModel: ParameterModel): ParameterLabel {
    let foundLabel = null;
    const labels = parameterModel.labels;

    if (labels !== undefined) {
      labels.forEach((label: ParameterLabel) => {
        if (label.value === value) {
          foundLabel = label;
        }
      });
    }

    return foundLabel;
  }
}
