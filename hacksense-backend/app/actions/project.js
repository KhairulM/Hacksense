const project = require('app/repositories/project');

function createProject(data) {
  return project.createProject(data);
}

function getProjects() {
  return project.getProjects();
}

function getProjectById(projectId) {
  return project.getProjectById(projectId);
}

function updateProject(projectId, data) {
  return project.updateProject(projectId, data);
}

function deleteProject(projectId) {
  return project.deleteProject(projectId);
}

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
};
