const project = require('app/repositories/projectImage');

function createProjectImage(projectId, data) {
  return project.createProjectImage(projectId, data);
}

function getProjectImages(projectId) {
  return project.getProjectImages(projectId);
}

function getProjectImageById(imageId) {
  return project.getProjectImageById(imageId);
}

function deleteProjectImages(projectId) {
  return project.deleteProjectImages(projectId);
}

function deleteProjectImageById(imageId) {
  return project.deleteProjectImageById(imageId);
}

module.exports = {
  createProjectImage,
  getProjectImages,
  getProjectImageById,
  deleteProjectImages,
  deleteProjectImageById
};
