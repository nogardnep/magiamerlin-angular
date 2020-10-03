import { Component, Input, OnInit } from '@angular/core';
import { Entity } from 'src/app/models/entity/Entity.model';
import { ParametersModel } from 'src/app/models/Parameter';

@Component({
  selector: 'app-parameters-editor',
  templateUrl: './parameters-editor.component.html',
  styleUrls: ['./parameters-editor.component.scss'],
})
export class ParametersEditorComponent implements OnInit {
  @Input() parametersModel: ParametersModel;
  @Input() entity: Entity;

  constructor() {}

  ngOnInit(): void {}

  getKeys(): string[] {
    return Object.keys(this.parametersModel);
  }
}
