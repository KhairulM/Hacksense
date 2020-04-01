const request = require("app/repositories/request.js");

function createRequest(data) {
  return request.createRequest(data);
}

function indexRequest() {
  return request.indexRequest();
}

function getRequestByProjectId(projectId) {
  return request.getRequestByProjectId(projectId);
}

function getRequestByUserId(userId) {
  return request.getRequestByUserId(userId);
}

function getRequestByProjectIdAndUserId(projectId, userId) {
  return request.getRequestByUserId(projectId, userId);
}

function deleteRequestByProjectIdAndUserId(projectId, userId) {
  return request.deleteRequestByProjectIdAndUserId(projectId, userId);
}

function deleteRequestByProjectId(projectId) {
  return request.deleteRequestByProjectId(projectId);
}

function updateRequestByProjectIdAndUserId(data) {
  return request.updateRequestByProjectIdAndUserId(data);
}

module.exports = {
  createRequest,
  indexRequest,
  getRequestByProjectId,
  getRequestByUserId,
  getRequestByProjectIdAndUserId,
  deleteRequestByProjectId,
  deleteRequestByProjectIdAndUserId,
  updateRequestByProjectIdAndUserId
};
