import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as ProjectService from "./project.service";

export const projectRouter = express.Router();

projectRouter.get("/", async (request: Request, response: Response) => {
  try {
    const projects = await ProjectService.listProject();
    return response.status(200).json(projects);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

projectRouter.get("/:id", async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    const project = await ProjectService.getProject(id);
    if (!project)
      return response
        .status(404)
        .json({ code: 404, message: "Project not found" });
    return response.status(200).json(project);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

projectRouter.post(
  "/",
  body("title").isString(),
  body("body").isString(),
  body("images"),
  body("github"),
  body("technologies"),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ erros: errors.array() });
    }
    try {
      const project = request.body;
      const newProject = await ProjectService.createProject(project);
      return response.status(201).json(newProject);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

projectRouter.put(
  "/:id",
  body("title").isString(),
  body("body"),
  body("images"),
  body("github"),
  body("technologies"),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ erros: errors.array() });
    }
    const id: string = request.params.id;
    try {
      const project = request.body;
      const updatedProject = await ProjectService.updateProject(project, id);
      return response.status(201).json(updatedProject);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

projectRouter.delete("/:id", async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    await ProjectService.deleteProject(id);
    return response.status(204).json("Project successfully deleted");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
