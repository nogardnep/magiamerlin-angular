import { ServerService } from './server.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from 'src/models/entity/Project.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectsDataService {
  constructor(
    private httpClient: HttpClient,
    private serverService: ServerService
  ) {}

  deleteProject(project: Project): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete(this.getProjectsPath() + '/' + project.name)
        .subscribe(
          (response) => {
            resolve();
          },
          (error) => {
            this.serverService.printError(
              'error when deleting project: ' + error
            );
            reject(error);
          }
        );
    });
  }

  updateProject(project: Project): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .put<object>(this.getProjectsPath() + '/' + project.name, project)
        .subscribe(
          () => {
            resolve();
          },
          (error) => {
            this.serverService.printError(
              'error when updating project: ' + error
            );
            reject(error);
          }
        );
    });
  }

  addProject(project: Project): Promise<Project> {
    return new Promise((resolve, reject) => {
      this.httpClient.post<Project>(this.getProjectsPath(), project).subscribe(
        (projectData) => {
          const newProject = this.makeProject(projectData);
          resolve(newProject);
        },
        (error) => {
          this.serverService.printError('error when adding project: ' + error);
          reject(error);
        }
      );
    });
  }

  loadProjects(): Promise<Project[]> {
    return new Promise((resolve, reject) => {
      this.httpClient.get<Project[]>(this.getProjectsPath()).subscribe(
        (response) => {
          const projects = [];

          response.map((data: object) => {
            projects.push(this.makeProject(data));
          });

          resolve(projects);
        },
        (error) => {
          this.serverService.printError(
            'error when loading projects: ' + error
          );
          reject(error);
        }
      );
    });
  }

  private getProjectsPath(): string {
    return this.serverService.getRootForProjects();
  }

  private makeProject(data: object): Project {
    return data as Project;
  }
}
