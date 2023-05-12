"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const ProjectService = __importStar(require("./project.service"));
exports.projectRouter = express_1.default.Router();
exports.projectRouter.get("/", async (request, response) => {
    try {
        const projects = await ProjectService.listProject();
        return response.status(200).json(projects);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
});
exports.projectRouter.get("/:id", async (request, response) => {
    const id = request.params.id;
    try {
        const project = await ProjectService.getProject(id);
        if (!project)
            return response
                .status(404)
                .json({ code: 404, message: "Project not found" });
        return response.status(200).json(project);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
});
exports.projectRouter.post("/", (0, express_validator_1.body)("title").isString(), (0, express_validator_1.body)("body").isString(), (0, express_validator_1.body)("images"), (0, express_validator_1.body)("github"), (0, express_validator_1.body)("technologies"), async (request, response) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ erros: errors.array() });
    }
    try {
        const project = request.body;
        const newProject = await ProjectService.createProject(project);
        return response.status(201).json(newProject);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
});
exports.projectRouter.put("/:id", (0, express_validator_1.body)("title").isString(), (0, express_validator_1.body)("body").isString(), (0, express_validator_1.body)("images"), (0, express_validator_1.body)("github"), (0, express_validator_1.body)("technologies"), async (request, response) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ erros: errors.array() });
    }
    const id = request.params.id;
    try {
        const project = request.body;
        const updatedProject = await ProjectService.updateProject(project, id);
        return response.status(201).json(updatedProject);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
});
exports.projectRouter.delete("/:id", async (request, response) => {
    const id = request.params.id;
    try {
        await ProjectService.deleteProject(id);
        return response.status(204).json("Project successfully deleted");
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
});
