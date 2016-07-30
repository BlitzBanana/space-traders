const {ipcRenderer} = require('electron');
var PLAYGROUND = require('../libs/playground/playground');

var ECS = require('./core/ecs');
require('./core/systems/render');
require('./core/systems/textrender');

ipcRenderer.sendSync('list-dir', `${__dirname}/../data/components`).forEach(componentFile => {
  ECS.components.fromJson(require(`../data/components/${componentFile}`));
});

ipcRenderer.sendSync('list-dir', `${__dirname}/../data/entities`).forEach(entityFile => {
  ECS.entities.fromJson(require(`../data/entities/${entityFile}`));
});

var camera = ECS.entities.spawn(['position']);
var lastMousePosition = { x: 0, y: 0 };

var app = new PLAYGROUND.Application({

  width: document.getElementById('game').clientWidth,

  height: document.getElementById('game').clientHeight,

  create: function() {
    ECS.entities.spawnPrefab('factory', ECS.world, {
      position: {
        x: 300,
        y: 300
      }
    });
    ECS.entities.spawnPrefab('agent', ECS.world, {
      position: {
        x: 500,
        y: 350
      }
    });
  },

  step: function(delta) {
    ECS.update(delta, this.keyboard, this.mouse);
  },

  render: function() {
    this.layer.clear('#151516');
    ECS.render(this.layer.context, camera);
  },

  mousemove: function(event) {
    if (this.mouse.left) {
      camera.components.position.x -= (event.x - lastMousePosition.x);
      camera.components.position.y -= (event.y - lastMousePosition.y);
    }
    lastMousePosition.x = event.x
    lastMousePosition.y = event.y;
  },

  keydown: function(event) {
    if (event.key === 'space') {
      camera.components.position.x = 0;
      camera.components.position.y = 0;
    }
  },

  container: '#game'

});