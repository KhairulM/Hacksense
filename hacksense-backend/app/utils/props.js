function excluder(sourceObject, props) {
  const targetObject = { ...sourceObject };

  props.forEach(property => {
    delete targetObject[property];
  });

  return targetObject;
}

function includer(sourceObject, props) {
  const targetObject = {};

  props.forEach(property => {
    targetObject[property] = sourceObject[property];
  });

  return targetObject;
}

function picker(source, props, pickFunc) {
  if (Array.isArray(source)) {
    return source.map(value => pickFunc(value, props));
  }

  return pickFunc(source, props);
}

module.exports = {
  include: (source, props) => picker(source, props, includer),
  exclude: (source, props) => picker(source, props, excluder)
};
