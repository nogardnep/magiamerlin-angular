import { ParametersModel } from 'src/models/Parameter';
import { ParametersService } from 'src/app/services/parameters/parameters.service';
import { Entity } from 'src/models/entity/Entity.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-parameter-viewer',
  templateUrl: './parameter-viewer.component.html',
  styleUrls: ['./parameter-viewer.component.scss'],
})
export class ParameterViewerComponent implements OnInit {
  @Input() entity: Entity;
  @Input() key: string;
  @Input() parametersModel: ParametersModel;

  constructor(private parametersService: ParametersService) {}

  ngOnInit(): void {
    this.parametersService.checkParameter(
      this.entity,
      this.parametersModel,
      this.key
    );
  }

  print(): string {
    const value = this.entity.parameters[this.key];
    const label = this.parametersService.getLabelFor(
      value,
      this.parametersModel[this.key]
    );

    return label !== null ? label.text : value.toString();
  }
}
