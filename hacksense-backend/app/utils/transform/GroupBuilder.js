function transform(collection, identifiers, groupName) {
  const result = [];
  const groupByIndex = {};

  collection.forEach(value => {
    let identifiersValue = '';
    const identifierObject = {};
    identifiers.forEach(identifier => {
      identifiersValue += collection[identifier] + '_';
      identifierObject[identifier] = value[identifier];

      delete value[identifier];
    });

    let groupPosition = groupByIndex[identifiersValue];
    if (groupPosition == null) {
      result.push({ ...identifierObject, [groupName]: [] });

      const lastIndex = result.length - 1;
      groupByIndex[identifiersValue] = lastIndex;
      groupPosition = lastIndex;
    }

    result[groupPosition][groupName].push(value);
  });

  return result;
}

class GroupBuilder {
  constructor(name) {
    this._name = name;
  }

  by(identifiers) {
    this._identifiers = identifiers;

    return this;
  }

  from(collection) {
    return transform(collection, this._identifiers, this._name);
  }
}

module.exports = GroupBuilder;
