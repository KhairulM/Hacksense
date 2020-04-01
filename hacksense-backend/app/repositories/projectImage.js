const { returnOnlyDefinedProps } = require('app/utils/object');
const { reader, writer, execute, single } = require('app/utils/knex');

async function createProjectImage(projectId, imagePath) {
  const currentTime = Date.now();

  const query = writer('project_image')
    .insert({
      id_project: projectId,
      imagepath: imagePath
    })
    .returning('id_pImage');

  const id_pImage = await single(query);

  return {
    id_project: projectId,
    id_pImage: id_pImage
  };
}

function getProjectImages(projectId) {
  const query = reader('project_image')
    .select('id_pImage', 'id_project', 'imagepath')
    .where({ id_project: projectId });

  return execute(query);
}

async function getProjectImageById(imageId) {
  const query = await reader('project_image')
    .select('id_pImage', 'id_project', 'imagepath')
    .where({
      id_pImage: imageId
    });

  return single(query);
}

function deleteProjectImages(projectId) {
  return writer('project_image')
    .where({ id_project: projectId })
    .del();
}

function deleteProjectImageById(imageId) {
  return writer('project_image')
    .where({ id_pImage: imageId })
    .del();
}

module.exports = {
  createProjectImage,
  getProjectImages,
  getProjectImageById,
  deleteProjectImages,
  deleteProjectImageById
};
