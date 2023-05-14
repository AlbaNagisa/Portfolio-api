import { db } from "../utils/db.server";

type Project = {
  id: string;
  title: string;
  body: string;
  images: string[];
  technologies: string[];
  mobile: boolean;
  github: Github;
};

type Github = {
  repoName: string;
  url: string;
};

export const listProject = async (): Promise<Project[]> => {
  return db.project.findMany({
    select: {
      id: true,
      title: true,
      body: true,
      mobile: true,
      technologies: true,
      images: true,
      github: true,
    },
  });
};

export const getProject = async (id: string): Promise<Project | null> => {
  return db.project.findUnique({
    where: {
      id,
    },
  });
};

export const createProject = async (
  project: Omit<Project, "id">
): Promise<Project> => {
  const { title, body, images, github, technologies, mobile } = project;
  return db.project.create({
    data: {
      title,
      body,
      mobile,
      images,
      slug: title.toLowerCase().split(" ").join("-"),
      github,
      technologies,
    },
  });
};

export const updateProject = async (
  project: Omit<Project, "id">,
  id: string
): Promise<Project> => {
  const { title, body, images, github, technologies, mobile } = project;
  return db.project.update({
    where: {
      id,
    },
    data: {
      title,
      body,
      mobile,
      images,
      slug: title.toLowerCase().split(" ").join("-"),
      github,
      technologies,
    },
    select: {
      id: true,
      title: true,
      body: true,
      mobile: true,
      images: true,
      github: true,
      technologies: true,
    },
  });
};

export const deleteProject = async (id: string): Promise<void> => {
  await db.project.delete({
    where: {
      id,
    },
  });
};
