# Space Traders 2

## Description

ST2 is not really a game, it's just an experiement.
My goal is to make a space game where there are some stations of different types around the space.
There are also some 'agents' who travel between stations to buy and sell some wares.
The goal is to script the best agent AI to get maximum benefits.

## Getting started

- Run `npm install && npm start`

## Tech

- [Electron](https://github.com/electron/electron)
- [Playground.js](https://github.com/rezoner/playground) (gameloop & inputs)
- Entity Component
- Simple API for AI scripts (engine agnostics)

## Roadmap

- [ ] Rework Entity Component implementation
- [ ] Signals/Events components to allow systems to interact each other
- [ ] Validate the Data Driven architecture
- [ ] Improve inputs handling (system based)
- [ ] Improve camera (zoom support)
- [ ] Implement the AI scripts system
- [ ] Implement map loading
- [ ] Make a simple map editor

## Future

- Big map splitted in sectors, linked by jumpgates
- Multi agent control
- Buy and manage stations
- Police & illegal wares
- Pirates
