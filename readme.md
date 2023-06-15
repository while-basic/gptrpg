
## Install

- 'cp env.example.json env.json'
- 'npm install && cd ui-admin'
- 'npm start'

This repository includes:

* A simple RPG-style environment for an LLM-powered AI agent to inhabit
* A basic AI agent utilizing the OpenAI API to function within the environment

## Running

GPTRPG is designed for local execution. Follow these steps to run it:

- Update `agent/env.json` file with your OpenAI API key.
- This has solely been tested using Node 16.19.0.
- In the `gptrpg` directory, execute `npm install` 
- Run `npm start` in the root directory
- Navigate to `http://localhost:3000`

## The Environment

- The code resides in `ui-admin`
- Environment is created using the Tiled map editor, files located in `ui-admin/src/assets`.
- Environment rendering employs Phaser and the Grid Engine Plugin.

The environment consists of:

* The character (agent)
* Impassable tiles
* A layer with "plantable" tiles and plants (not currently utilized by the agent). 
* Players can plant food on plantable tiles using the 'S' key and harvest food with the 'D' key.

## The Agent

- Agent code is in the `agent` directory.
- The agent is a basic AI that leverages the OpenAI API to make informed decisions. 
- Communication with the front-end is achieved via a websocket.
- The agent is given various actions, state of its environment, and its internal state (currently only tracking sleepiness).

## Upcoming Features

* Support for multiple agents
* Additional agent actions (drink, eat, plant food, harvest food, compose poetry, etc.)
* More agent states (hunger, thirst, etc.)
* Agent memory
* Agent objectives
* Agent inventory
* Web deployment
* Human-controlled character
* UI improvements (agent state display, human interactions, etc.)

## Additional Information

Currently, GPTRPG functions with the `gpt-3.5-turbo` API.
