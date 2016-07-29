var ECS = {};
var id = 0;
var Entity = require('./entity');
var _ = require('lodash');
var mirrorKey = require('mirrorkey');

/* ID generator */
ECS.id = function() {
    return ++id;
};

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
    types: mirrorKey({
        RENDER: null,
        UPDATE: null
    })
};

/* Game root entity */
ECS.world = new Entity(ECS.id());

ECS.update = function(delta) {
    _.chain(ECS.systems.definitions)
        .values()
        .filter(x => { return x.type === ECS.systems.types.UPDATE; })
        .value()
        .forEach(system => {
            var entities = ECS.world.getChildrenByComponents(system.components);
            system.handler(entities, delta);
        });
};

ECS.render = function(context, camera) {
    _.chain(ECS.systems.definitions)
        .values()
        .filter(x => { return x.type === ECS.systems.types.RENDER; })
        .value()
        .forEach(system => {
            var entities = ECS.world.getChildrenByComponents(system.components);
            system.handler(entities, context, camera);
        });
};


/**
 * Defines an entity prefab
 */
ECS.entities.define = function(name, components, config, children) {
    ECS.entities.definitions[name] = {
        components: components,
        config:     config || {},
        children:   children || []
    };
};

ECS.entities.fromJson = function(json) {
    ECS.entities.define(json.name, json.components, json.config, json.children);
};

/**
 * Spawns an entity prefab
 */
ECS.entities.spawnPrefab = function(name, parent, config) {
    var prefab = ECS.entities.definitions[name];
    var entity = ECS.entities.spawn(prefab.components, parent, Object.assign({}, prefab.config, config));
    prefab.children.forEach(child => {
        ECS.entities.spawn(child.components, entity, Object.assign({}, child.config))
    });
};


/**
 * Spawns an anonymous entity
 */
ECS.entities.spawn = function(components, parent, config) {
    var entity = new Entity(ECS.id());
    entity.parent = parent || ECS.world;
    entity.parent.children[entity.id] = entity;

    config = config || {};

    components.forEach(componentName => {
        var component = ECS.components.definitions[componentName];
        entity.components[componentName] = Object.assign({}, component, config[componentName]);
    });
    return entity;
};

/** 
 * Defines a component
 */
ECS.components.define = function(name, definition) {
    ECS.components.definitions[name] = definition;
};

ECS.components.fromJson = function(json) {
    ECS.components.define(json._name, _.omit(json, '_name'));
};


/**
 * Defines a system
 */
ECS.systems.define = function(name, type, components, handler, priority) {
    ECS.systems.definitions[name] = {
        type: type,
        components: components || [],
        handler: handler || function() {},
        priority: priority || 0
    };
};

module.exports = ECS;