var UTILS = {};

UTILS.getAbsolutePosition = function (entity) {
  var parentPosition;
  var entityPosition;

  if (entity.parent) {
    parentPosition = UTILS.getAbsolutePosition(entity.parent);
  } else {
    parentPosition = { x: 0, y: 0 };
  }

  if (entity.hasComponent('position')) {
    entityPosition = {
      x: entity.components.position.x,
      y: entity.components.position.y
    }
  } else {
    entityPosition = { x: 0, y: 0 };
  }

  return {
    x: entityPosition.x + parentPosition.x,
    y: entityPosition.y + parentPosition.y,
  };
}

module.exports = UTILS;