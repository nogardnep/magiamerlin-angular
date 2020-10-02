import { Router } from '@angular/router';
import { SelectionService } from 'src/app/services/control/selection.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/entity/Project.model';
import { ProjectsManagerService } from 'src/app/services/manager/projects-manager.service';

@Component({
  selector: 'app-projects-control',
  templateUrl: './projects-control.component.html',
  styleUrls: ['./projects-control.component.scss'],
})
export class ProjectsControlComponent implements OnInit, OnDestroy {
  project: Project = null;

  private selectedProjectSubscription: Subscription;

  constructor(
    private selectionService: SelectionService,
    private projectService: ProjectsManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedProjectSubscription = this.selectionService.selectedProjectSubject.subscribe(
      (project: Project) => {
        this.project = project;
      }
    );

    this.selectionService.emitSelectedProject();
  }

  ngOnDestroy(): void {
    this.selectedProjectSubscription.unsubscribe();
  }

  onClickDeleteProject(): void {
    const confirmed = confirm('Delete project?');

    if (confirmed) {
      this.projectService.deleteProject(
        this.selectionService.getSelectedProject()
      );
    }
  }

  onClickConfiguration(): void {
    this.router.navigate(['/configuration']); // TODO: do not use string
  }

  onClickSaveProject(): void {
    alert('Saving project');
    this.projectService.saveProject(this.selectionService.getSelectedProject());
  }

  onClickCreateProject(): void {
    const response = prompt('Project name?');

    if (response !== null && response !== '') {
      this.projectService.createProject(response);
    }
  }

  onClickLoadProject(): void {
    if (this.selectionService.getSelectedProject() !== null) {
      const confirmed = confirm(
        'Leave this project (thing about saving before)?'
      );

      if (confirmed) {
        this.projectService.loadProject();
      }
    } else {
      this.projectService.loadProject();
    }
  }
}
