import express from "express";
import type { Request, Response } from "express";

import * as MeService from "./me.service";

export const meRouter = express.Router();
meRouter.get("/:id", async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    const me = await MeService.getMe(id);
    if (!me)
      return response.status(404).json({ code: 404, message: "Not found" });
    return response.status(200).json(me);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

meRouter.post("/", async (request: Request, response: Response) => {
  try {
    const me = request.body;
    const newMe = await MeService.createMe(me);
    return response.status(201).json(newMe);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

meRouter.put("/:id", async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    const skills = request.body;
    const updatedSkill = await MeService.updateSkill(skills, id);
    return response.status(200).json(updatedSkill);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

meRouter.patch("/:id", async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    const me = request.body;
    const updatedSkill = await MeService.addSkill(me, id);
    return response.status(200).json(updatedSkill);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

meRouter.get("/:id/:filter", async (request: Request, response: Response) => {
  const id: string = request.params.id;
  const filter: string = request.params.filter;
  try {
    const me = await MeService.getMe(id);
    if (me === null) return response.status(404).json("Not found");
    return response
      .status(200)
      .json(me.skills.filter((skill) => skill.type === filter.toUpperCase()));
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
