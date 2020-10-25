import { SelectionService } from 'src/app/services/control/selection.service';
import { Project } from 'src/models/entity/Project.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnInit, OnDestroy {
  private projectSubscription: Subscription;

  selectedProject: Project = null;

  constructor(private projectsService: SelectionService) {}

  ngOnInit(): void {
    this.projectSubscription = this.projectsService.selectedProjectSubject.subscribe(
      (project: Project) => {
        this.selectedProject = project;
      }
    );

    this.projectsService.emitSelectedProject();
  }

  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
  }
}
