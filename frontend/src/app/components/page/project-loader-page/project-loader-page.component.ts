import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/entity/Project.model';
import { SelectionService } from 'src/app/services/control/selection.service';
import { ProjectsDataService } from 'src/app/services/data/projects-data.service';

@Component({
  selector: 'app-project-loader-page',
  templateUrl: './project-loader-page.component.html',
  styleUrls: ['./project-loader-page.component.scss'],
})
export class ProjectLoaderPageComponent implements OnInit {
  focusedProject: Project = null;
  projects: Project[] = [];

  constructor(
    private router: Router,
    private selectionService: SelectionService,
    private projectsDataService: ProjectsDataService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.projectsDataService.loadProjects().then((projects: Project[]) => {
      this.projects = projects;
    });
  }

  onClickProject(project: Project): void {
    this.focusedProject = project;
  }

  onClickLoad(): void {
    if (this.focusedProject !== null) {
      this.selectionService.selectProject(this.focusedProject);
      this.router.navigate(['/project']); // TODO: do not use string
    }
  }

  onClickCancel(): void {
    this.location.back();
  }

  isFocused(project: Project): boolean {
    return (
      this.focusedProject !== null && project.name === this.focusedProject.name
    );
  }
}
