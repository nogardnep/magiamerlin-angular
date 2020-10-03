import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Entity } from 'src/app/models/entity/Entity.model';
import {
  ParameterLabel,
  ParametersModel,
  ParameterValue,
} from 'src/app/models/Parameter';
import { ParametersService } from 'src/app/services/parameters/parameters.service';

type SelectOption = {
  value: ParameterValue;
  text: string;
};

@Component({
  selector: 'app-parameter-editor',
  templateUrl: './parameter-editor.component.html',
  styleUrls: ['./parameter-editor.component.scss'],
})
export class ParameterEditorComponent implements OnInit {
  @Input() entity: Entity;
  @Input() key: string;
  @Input() parametersModel: ParametersModel;
  @Output() changed = new EventEmitter<ParameterValue>();
  min: number;
  max: number;
  name: string;

  constructor(private parametersService: ParametersService) {}

  ngOnInit(): void {
    this.parametersService.checkParameter(
      this.entity,
      this.parametersModel,
      this.key
    );

    this.min = this.parametersModel[this.key].min;
    this.max = this.parametersModel[this.key].max;
    this.name = this.parametersModel[this.key].name;
  }

  onChange(value: ParameterValue): void {
    this.changed.emit(value);
  }

  useSelector(): boolean {
    return this.parametersModel[this.key].labels !== undefined;
  }

  getSelectOptions(): SelectOption[] {
    const options: SelectOption[] = [];

    for (let i = this.min; i <= this.max; i++) {
      const label: ParameterLabel = this.parametersService.getLabelFor(
        i,
        this.parametersModel[this.key]
      );

      options.push({
        value: i,
        text: label !== null ? label.text : i.toString(),
      });
    }

    return options;
  }
}
