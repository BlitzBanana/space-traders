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
- Entity Component System
- Data Driven system
- Simple API for AI scripts (engine agnostics)

## Roadmap

- [ ] Finish the Entity Component System implementation
  - [ ] Rework systems (not only a function, filter entites itself)
  - [ ] Entities family (used as filters by systems)
  - [ ] Signals/Events system to allow systems to interact each other
  - [ ] Allow to add/remove entites' components at run time
- [ ] Validate the Data Driven architecture
- [ ] Improve inputs handling (system based)
- [ ] Improve camera (zoom support)
- [ ] Implement the AI scripts system
- [ ] Implement map loading
- [ ] Make a simple map editor

## Ideas for the future

- Big map & jump engines
- Multi agent control
- Buy and manage stations
- Police & illegal wares
- Pirates
