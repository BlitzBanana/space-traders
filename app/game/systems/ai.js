var _ = require('lodash');
var ECS = require('../../core/ecs');

var aiManager = {

    scriptify: function(entity) {
        // Return transformed entity to get an engine agnostic state of it (must be read-only)
        return Object.assign({}, entity.components);
    },

    scriptContext: function(entity) {
        // Return the world viewed by the entity (must be read-only)
        return null;
    },

    scriptApi: function(entity) {
        // Return the api to let the script interact with the world and his entity
        return require('../ai/api')(entity);
    }

};

ECS.systems.define('ai', ECS.systems.types.UPDATE, ['aiscript'], function(entities, delta) {
    entities.forEach(e => {
        var aiscript = require(`../../../data/aiscripts/${e.components.aiscript.name}`);
        var me = aiManager.scriptify(e);
        var context = aiManager.scriptContext(e);
        var api = aiManager.scriptApi(e);

        aiscript(me, context, api, delta);
    });
}, 2);