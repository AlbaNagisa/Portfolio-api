import { db } from "../utils/db.server";

type Me = {
  id: string;
  slug: string;
  skills: Skill[];
};

type Skill = {
  type: string;
  name: string;
  image: string;
};

enum TypeSkill {
  FRONTEND = "FRONTEND",
  BACKEND = "BACKEND",
  DATABASE = "DATABASE",
  OTHER = "OTHER",
}

export const getMe = async (id: string): Promise<Me | null> => {
  return db.me.findUnique({
    where: {
      id: id,
    },
  });
};

export const createMe = async (me: Omit<Me, "id">): Promise<Me> => {
  const { skills } = me;
  return db.me.create({
    data: {
      skills,
      slug: "me",
    },
  });
};

export const addSkill = async (me: Me, id: string): Promise<Me> => {
  const { skills } = me;
  return db.me.update({
    where: {
      id,
    },
    data: {
      skills: {
        push: skills,
      },
    },
  });
};

export const updateSkill = async (me: Me, id: string): Promise<Me> => {
  const { skills } = me;
  return db.me.update({
    where: {
      id,
    },
    data: {
      skills,
      slug: "me",
    },
  });
};
