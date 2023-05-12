import { db } from "../src/utils/db.server";

type Project = {
  title: string;
  body: string;
  images: string[];
  slug?: string;
  github: Github;
};

type Github = {
  repoName: string;
  url: string;
};
async function seed() {
  await Promise.all(
    getProjects().map((project, i) => {
      return db.project.create({
        data: {
          title: project.title,
          body: project.body,
          images: project.images,
          technologies: [],
          slug: project.title.toLowerCase().split(" ").join("-"),
          github: {
            repoName: project.github.repoName,
            url: project.github.url,
          },
        },
      });
    })
  );
}

seed();

function getProjects(): Array<Project> {
  return [
    {
      title: "Project 1",
      body: "Project 1 body",
      images: ["https://picsum.photos/1920/1080"],
      github: {
        repoName: "AnemyApp",
        url: "https://github.com/AlbaNagisa/AnemyApp",
      },
    },
    {
      title: "Project 2",
      body: "Project 2 body",
      images: ["https://picsum.photos/1920/1080"],
      github: {
        repoName: "AnemyApp",
        url: "https://github.com/AlbaNagisa/AnemyApp",
      },
    },
    {
      title: "Project 3",
      body: "Project 3 body",
      images: ["https://picsum.photos/1920/1080"],
      github: {
        repoName: "AnemyApp",
        url: "https://github.com/AlbaNagisa/AnemyApp",
      },
    },
  ];
}
