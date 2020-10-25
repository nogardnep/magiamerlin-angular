import { SpecialActionsService } from 'src/app/services/control/special-actions.service';
import { ControlMode } from 'src/models/system/control/ControlMode.model';
import { Project } from 'src/models/entity/Project.model';
import { ProjectsDataService } from 'src/app/services/data/projects-data.service';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectionService } from 'src/app/services/control/selection.service';

// TODO: temp
enum Keys {
  Looping = 'l',
  Editing = 'e',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private loadingSubscription: Subscription;

  loading = false;

  // TODO: temp
  @HostListener('window:keyup', ['$event'])
  onKeyup(event: KeyboardEvent): void {
    if (event.key === Keys.Looping) {
      this.specialActionsService.setLooping(false);
    } else if (event.key === Keys.Editing) {
      this.specialActionsService.setEditing(false);
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === Keys.Looping) {
      this.specialActionsService.setLooping(true);
    } else if (event.key === Keys.Editing) {
      this.specialActionsService.setEditing(true);
    }
  }

  constructor(
    private selectionService: SelectionService,
    private projectsDataService: ProjectsDataService,
    private specialActionsService: SpecialActionsService
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
        this.selectionService.selectMode(new ControlMode('PatternEdit'));
      }
    });
  }
}
