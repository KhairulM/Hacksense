const GroupBuilder = require('./GroupBuilder');

function firstObjectIn(collection) {
  if (collection.length > 0) {
    return collection[0];
  }

  return null;
}

function group(groupName) {
  return new GroupBuilder(groupName);
}

module.exports = {
  firstObjectIn,
  group
};
