var ECS = require('../ecs');
var UTILS = require('../utils');

ECS.systems.define('textrender', ECS.systems.type.RENDER, ['position', 'text'], function(entities, context, camera) {
    entities.forEach(e => {
        var position = UTILS.getAbsolutePosition(e);
        var text = e.components.text;

        context.fillStyle = text.color;
        context.font = text.font;
        context.fillText(
            text.content,
            position.x - camera.components.position.x,
            position.y - camera.components.position.y);
    });
}, 1);