const fs = require('fs-extra');
const glob = require('glob');
const del = require('glob');
import { PathManager } from '../util/path-manager';
import { NextFunction, Request, Response } from 'express';

interface Project {
  name: string;
}

export class ProjectController {
  static getAll(req: Request, res: Response, next: NextFunction): void {
    const projects: Project[] = [];

    glob(
      PathManager.getProjectsPath() + '/*/' + PathManager.projectDataFileName,
      (error: any, items: string[]) => {
        if (error) {
          res.status(400).json(error);
          console.log('Error', error);
        } else {
          items.forEach((item: string) => {
            projects.push(JSON.parse(fs.readFileSync(item).toString()));
          });

          res.status(200).json(projects);
        }
      }
    );
  }

  static getOne(req: Request, res: Response, next: NextFunction): void {
    glob(
      PathManager.getProjectsPath() +
        '/' +
        req.params.name +
        '/' +
        PathManager.projectDataFileName,
      (err: any, items: string[]) => {
        if (err) {
          console.log('Error', err);
        } else {
          let project = null;

          if (items.length > 0) {
            project = JSON.parse(fs.readFileSync(items[0]).toString());
          }

          res.status(200).json(project);
        }
      }
    );
  }

  static createOne(req: Request, res: Response, next: NextFunction): void {
    const newProject = req.body;

    // TODO: check if project folder exists, create if not

    fs.access(PathManager.getOneProjectPath(newProject.name), (error: any) => {
      if (!error) {
        const message = 'Project "' + newProject.name + '" already exists';
        res.status(400).json(message);
      } else {
        fs.mkdirSync(PathManager.getOneProjectPath(newProject.name));
        ProjectController.storeProject(newProject);
        res.status(201).json(newProject);
      }
    });
  }

  static updateOne(req: Request, res: Response, next: NextFunction): void {
    const projectName = req.body.name;
    const project = req.body;

    fs.access(PathManager.getOneProjectPath(projectName), (error: any) => {
      if (error) {
        const message = 'project ' + projectName + " doesn't exist";

        res.status(400).json({
          error: message,
        });
      } else {
        ProjectController.storeProject(project);
        res.status(201).json(project);
      }
    });
  }

  static deleteOne(req: Request, res: Response, next: NextFunction): void {
    const projectName = req.params.name;
    const path = PathManager.getOneProjectPath(projectName);

    fs.remove(path)
      .then(() => {
        console.log('success!');
        res.status(200).json({ message: 'entity deleted' });
      })
      .catch((error: any) => {
        res.status(400).json({ error });
      });
  }

  private static storeProject(project: Project) {
    fs.writeFileSync(
      PathManager.getOneProjectDataPath(project.name),
      JSON.stringify(project, null, 2)
    );
  }
}
