const _ = require('lodash');
const ECS = require('../ecs');
const UTILS = require('../utils');

ECS.systems.define('render', ECS.systems.type.RENDER, ['position', 'appearence'], function (entities, context, camera) {
  entities.forEach(e => {
    const position = UTILS.getAbsolutePosition(e);
    const appearence = e.components.appearence;
    const points = _.map(appearence.points, p => ({
      x: p.x + position.x - camera.components.position.x,
      y: p.y + position.y - camera.components.position.y
    }));

    context.fillStyle = appearence.color;
    context.strokeStyle = appearence.color;

    context.beginPath();
    context.moveTo(points[0].x, points[0]);

    points.forEach(p => context.lineTo(p.x, p.y));

    context.closePath();
    context.fill();

    if (appearence.fill) {
      context.fill();
    } else {
      context.stroke();
    }
  });
}, 1);