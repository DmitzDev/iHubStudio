import type { NextFunction, Request, Response } from 'express';
import type {
  ApiSuccessResponse,
  CreateProjectInput,
  Project,
  ProjectFilter,
  ProjectStatus,
  ProjectTrack,
  UpdateProjectInput,
} from '@ihub/shared';
import { projectService } from '../services/project.service.js';

export async function listProjects(
  req: Request,
  res: Response<ApiSuccessResponse<Project[]>>,
  next: NextFunction
): Promise<void> {
  try {
    const filter: ProjectFilter = {};

    if (typeof req.query.track === 'string' && req.query.track.length > 0) {
      filter.track = req.query.track as ProjectTrack;
    }
    if (typeof req.query.status === 'string' && req.query.status.length > 0) {
      filter.status = req.query.status as ProjectStatus;
    }
    if (req.query.featured === 'true') {
      filter.featured = true;
    } else if (req.query.featured === 'false') {
      filter.featured = false;
    }
    if (typeof req.query.q === 'string' && req.query.q.trim().length > 0) {
      filter.q = req.query.q.trim();
    }

    const projects = await projectService.listProjects(filter);

    res.json({
      success: true,
      data: projects,
      meta: { total: projects.length },
    });
  } catch (err) {
    next(err);
  }
}

export async function getProjectBySlug(
  req: Request<{ slug: string }>,
  res: Response<ApiSuccessResponse<Project>>,
  next: NextFunction
): Promise<void> {
  try {
    const project = await projectService.getProjectBySlug(req.params.slug);
    res.json({
      success: true,
      data: project,
    });
  } catch (err) {
    next(err);
  }
}

export async function createProject(
  req: Request<unknown, unknown, CreateProjectInput>,
  res: Response<ApiSuccessResponse<Project>>,
  next: NextFunction
): Promise<void> {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
}

export async function updateProject(
  req: Request<{ slug: string }, unknown, UpdateProjectInput>,
  res: Response<ApiSuccessResponse<Project>>,
  next: NextFunction
): Promise<void> {
  try {
    const project = await projectService.updateProject(req.params.slug, req.body);
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(
  req: Request<{ slug: string }>,
  res: Response<ApiSuccessResponse<{ deleted: boolean }>>,
  next: NextFunction
): Promise<void> {
  try {
    await projectService.deleteProject(req.params.slug);
    res.json({ success: true, data: { deleted: true } });
  } catch (err) {
    next(err);
  }
}
