"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProject = exports.listProject = void 0;
const db_server_1 = require("../utils/db.server");
const listProject = async () => {
    return db_server_1.db.project.findMany({
        select: {
            id: true,
            title: true,
            body: true,
            technologies: true,
            images: true,
            github: true,
        },
    });
};
exports.listProject = listProject;
const getProject = async (id) => {
    return db_server_1.db.project.findUnique({
        where: {
            id,
        },
    });
};
exports.getProject = getProject;
const createProject = async (project) => {
    const { title, body, images, github, technologies } = project;
    return db_server_1.db.project.create({
        data: {
            title,
            body,
            images,
            slug: title.toLowerCase().split(" ").join("-"),
            github,
            technologies,
        },
    });
};
exports.createProject = createProject;
const updateProject = async (project, id) => {
    const { title, body, images, github, technologies } = project;
    return db_server_1.db.project.update({
        where: {
            id,
        },
        data: {
            title,
            body,
            images,
            slug: title.toLowerCase().split(" ").join("-"),
            github,
            technologies,
        },
        select: {
            id: true,
            title: true,
            body: true,
            images: true,
            github: true,
            technologies: true,
        },
    });
};
exports.updateProject = updateProject;
const deleteProject = async (id) => {
    await db_server_1.db.project.delete({
        where: {
            id,
        },
    });
};
exports.deleteProject = deleteProject;
