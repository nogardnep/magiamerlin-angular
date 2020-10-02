import {
  Configuration,
  ConfigurationDataService,
} from 'src/app/services/data/configuration-data.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.scss'],
})
export class ConfigurationPageComponent implements OnInit {
  configuration: Configuration;

  constructor(
    private location: Location,
    private configurationDataService: ConfigurationDataService
  ) {}

  ngOnInit(): void {
    this.configurationDataService
      .load()
      .then((configuration: Configuration) => {
        this.configuration = configuration;
      });
  }

  onClickCancel(): void {
    this.location.back();
  }

  onSubmit(ngForm: NgForm): void {
    const configuration = ngForm.form.value as Configuration;
    configuration.dataRoot = configuration.dataRoot.replace(/\\/g, '/'); // TODO: does not work

    this.configurationDataService.update(configuration).then(() => {
      this.location.back();
    });
  }
}
