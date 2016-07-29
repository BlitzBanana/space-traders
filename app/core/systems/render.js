var _ = require('lodash');
var ECS = require('../ecs');
var UTILS = require('../utils');

ECS.systems.define('render', ECS.systems.types.RENDER, ['position', 'appearence'], function(entities, context, camera) {
    entities.forEach(e => {
        var position = UTILS.getAbsolutePosition(e);
        var appearence = e.components.appearence;
        var points = _.map(appearence.points, p => {
            return {
                x: p.x + position.x - camera.components.position.x,
                y: p.y + position.y - camera.components.position.y
            }
        });

        context.fillStyle = appearence.color;
        context.strokeStyle = appearence.color;

        context.beginPath();
        context.moveTo(points[0].x, points[0]);

        points.forEach(p => {
            context.lineTo(p.x, p.y);
        });
        
        context.closePath();
        context.fill(); 

        if (appearence.fill) {
            context.fill();
        } else {
            context.stroke();
        }
    });
}, 1);