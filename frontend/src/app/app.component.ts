import { ControlMode } from 'src/app/models/system/control/ControlMode.model';
import { Project } from 'src/app/models/entity/Project.model';
import { ProjectsDataService } from 'src/app/services/data/projects-data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectionService } from 'src/app/services/control/selection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private loadingSubscription: Subscription;

  loading = false;

  constructor(
    private selectionService: SelectionService,
    private projectsDataService: ProjectsDataService
  ) {
    this.test();
  }

  ngOnInit(): void {
    this.loadingSubscription = this.selectionService.loadingSubject.subscribe(
      (loading: boolean) => {
        this.loading = loading;
      }
    );

    this.selectionService.emitLoading();
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  private test(): void {
    // TODO: remove

    // this.router.navigate(['/project']);
    this.projectsDataService.loadProjects().then((projects: Project[]) => {
      if (projects.length > 0) {
        this.selectionService.selectProject(projects[0]);
        this.selectionService.selectMode(new ControlMode('TrackEdit'));
      }
    });
  }
}
