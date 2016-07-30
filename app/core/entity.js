var _ = require('lodash');
var Entity = (function () {
  'use strict';

  function Entity(id) {
    if (!(this instanceof Entity)) {
      return new Entity(id);
    }

    this.id = id;
    this.parent = null;
    this.children = {};
    this.components = {};
  }

  Entity.prototype.getChildrenByComponent = function (componentName) {
    var entities = []
    _.values(this.children).forEach(e => {
      if (e.hasComponent(componentName))
        entities.push(e);
      entities = _.concat(entities, e.getChildrenByComponent(componentName))
    });
    return _.uniqBy(entities, 'id');
  };

  Entity.prototype.getChildrenByComponents = function (componentsNames) {
    var entities = [];
    _.values(this.children).forEach(e => {
      if (e.hasComponents(componentsNames))
        entities.push(e);
      entities = _.concat(entities, e.getChildrenByComponents(componentsNames))
    });
    return _.uniqBy(entities, 'id');
  };

  Entity.prototype.hasComponent = function (componentName) {
    return _.has(this.components, componentName);
  };

  Entity.prototype.hasComponents = function (componentsNames) {
    return _.every(componentsNames, componentName => { return _.has(this.components, componentName); });
  };

  Entity.prototype.toString = function () {
    return this.id;
  };

  return Entity;
} ());

module.exports = Entity;