const { returnOnlyDefinedProps } = require('app/utils/object');
const { reader, writer, execute, single } = require('app/utils/knex');

async function createProject(data) {
  const currentTime = Date.now();

  const query = writer('project')
    .insert({
      name: data.name,
      summary: data.summary,
      detail: data.detail,
      status: data.status,
      created_at: currentTime,
      updated_at: currentTime,
      deleted_at: null
    })
    .returning('id_project');

  const projectId = await single(query);

  return {
    id_project: projectId
  };
}

function getProjects() {
  const query = reader('project')
    .select(
      'id_project',
      'name',
      'summary',
      'detail',
      'status',
      'created_at',
      'updated_at',
      'deleted_at'
    )
    .where({ deleted_at: null });

  return execute(query);
}

async function getProjectById(projectId) {
  const query = await reader('project')
    .select(
      'id_project',
      'name',
      'summary',
      'detail',
      'status',
      'created_at',
      'updated_at',
      'deleted_at'
    )
    .where({
      id_project: projectId,
      deleted_at: null
    });

  return single(query);
}

function updateProject(projectId, data) {
  const currentTime = Date.now();
  data.update_at = currentTime;

  const query = writer('project')
    .where('id_project', projectId)
    .update(
      returnOnlyDefinedProps(data, [
        'name',
        'summary',
        'detail',
        'status',
        'updated_at'
      ])
    );

  return execute(query);
}

function deleteProject(projectId) {
  const currentTime = Date.now();

  return writer('project')
    .where({ id_project: projectId, deleted_at: null })
    .update({ deleted_at: currentTime });
}

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
};
