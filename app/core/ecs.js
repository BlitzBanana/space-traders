var ECS = {};
var id = 0;
var Entity = require('./entity');
var _ = require('lodash');
var mirrorKey = require('mirrorkey');

/* ID generator */
ECS.id = () => ++id;


/* Entities prefabs */
ECS.entities = {
  definitions: {}
};

/* Components prefabs */
ECS.components = {
  definitions: {}
};

/* Systems prefabs */
ECS.systems = {
  definitions: {},
  type: mirrorKey({
    RENDER: null,
    UPDATE: null
  })
};

/* Game root entity */
ECS.world = new Entity(ECS.id());

/**
 * Calls all update systems
 */
ECS.update = function (delta) {
  _.chain(ECS.systems.definitions)
    .values()
    .filter(x => x.type === ECS.systems.type.UPDATE)
    .value()
    .forEach(system =>
      system.handler(ECS.world.getChildrenByComponents(system.components), delta));
};

/**
 * Calls all rendering systems
 */
ECS.render = function (context, camera) {
  _.chain(ECS.systems.definitions)
    .values()
    .filter(x => x.type === ECS.systems.type.RENDER)
    .value()
    .forEach(system =>
      system.handler(ECS.world.getChildrenByComponents(system.components), context, camera));
};


/**
 * Defines an entity prefab
 */
ECS.entities.define = function (name, components = [], config = {}, children = []) {
  ECS.entities.definitions[name] = {
    components: components,
    config: config,
    children: children
  };
};

/**
 * Defines an entity from a json object
 */
ECS.entities.fromJson = function ({ name, components, config, children }) {
  ECS.entities.define(name, components, config, children);
};

/**
 * Spawns an entity prefab
 */
ECS.entities.spawnPrefab = function (name, parent, config) {
  const prefab = ECS.entities.definitions[name];
  const entity = ECS.entities.spawn(prefab.components, parent, Object.assign({}, prefab.config, config));
  prefab.children.forEach(child =>
    ECS.entities.spawn(child.components, entity, Object.assign({}, child.config)));
};

/**
 * Spawns an anonymous entity
 */
ECS.entities.spawn = function (components, parent, config = {}) {
  const entity = new Entity(ECS.id());
  entity.parent = parent || ECS.world;
  entity.parent.children[entity.id] = entity;

  components.forEach(componentName => {
    const baseConfig = ECS.components.definitions[componentName];
    entity.components[componentName] = Object.assign({}, baseConfig, config[componentName]);
  });
  return entity;
};

/**
 * Destroy an entity and all it's children
 */
ECS.entities.destroy = function (entityId) {
  var entity = ECS.world.getChildById(entityId);
  delete entity.parent.children[entityId];
  _.keys(entity.children).forEach(childId => ECS.entities.destroy(childId));
};

/** 
 * Defines a component
 */
ECS.components.define = function (name, definition) {
  ECS.components.definitions[name] = definition;
};

/**
 * Defines an component from a json object
 */
ECS.components.fromJson = function (json) {
  ECS.components.define(json._name, _.omit(json, '_name'));
};

/**
 * Defines a system
 */
ECS.systems.define = function (name, type, components, handler, priority) {
  ECS.systems.definitions[name] = {
    type: type || ECS.systems.type.UPDATE,
    components: components || [],
    handler: handler || function () { },
    priority: priority || 0
  };
};

/**
 * Load an entity collection from a json object
 */
ECS.load = function (save) {

};

function dumpEntity(entity) {

};

/**
 * Return a json object wich represents the current world state
 */
ECS.save = function () {
  return dumpEntity(ECS.world);
};

module.exports = ECS;