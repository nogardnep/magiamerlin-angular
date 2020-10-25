import { ParameterWrapper } from 'src/models/wrapper/ParameterWrapper.model';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Entity } from 'src/models/entity/Entity.model';
import {
  ParameterLabel,
  Parameters,
  ParametersModel,
  ParameterValue,
} from 'src/models/Parameter';
import { ParametersService } from 'src/app/services/parameters/parameters.service';

type SelectOption = {
  value: ParameterValue;
  text: string;
};

// TODO: error when creating new project

@Component({
  selector: 'app-parameter-editor',
  templateUrl: './parameter-editor.component.html',
  styleUrls: ['./parameter-editor.component.scss'],
})
export class ParameterEditorComponent implements OnChanges {
  @Input() entity: Entity;
  @Input() key: string;
  @Input() parametersModel: ParametersModel;
  @Output() changed = new EventEmitter<ParameterWrapper>();
  min: number;
  max: number;
  name: string;

  constructor(private parametersService: ParametersService) {}

  ngOnChanges(): void {
    this.parametersService.checkParameter(
      this.entity,
      this.parametersModel,
      this.key
    );

    this.min = this.parametersModel[this.key].min;
    this.max = this.parametersModel[this.key].max;
    this.name = this.parametersModel[this.key].name;
  }

  onChange(): void {
    this.changed.emit(
      new ParameterWrapper(this.entity, this.parametersModel, this.key)
    );
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
