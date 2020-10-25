import { ParameterWrapper } from 'src/models/wrapper/ParameterWrapper.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Entity } from 'src/models/entity/Entity.model';
import { ParametersModel, ParameterValue } from 'src/models/Parameter';

@Component({
  selector: 'app-parameters-editor',
  templateUrl: './parameters-editor.component.html',
  styleUrls: ['./parameters-editor.component.scss'],
})
export class ParametersEditorComponent implements OnInit {
  @Input() parametersModel: ParametersModel;
  @Input() entity: Entity;
  @Output() changed = new EventEmitter<ParameterWrapper>();

  constructor() {}

  ngOnInit(): void {}

  getKeys(): string[] {
    return Object.keys(this.parametersModel);
  }

  onChange(parameterWrapper: ParameterWrapper): void {
    this.changed.emit(parameterWrapper);
  }
}
