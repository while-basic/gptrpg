# Celaya-GPT - README.md

This repository includes:

* A simple RPG-style environment for an LLM-powered AI agent to inhabit
* A basic AI agent utilizing the OpenAI API to function within the environment

## Running

GPTRPG is designed for local execution. Follow these steps to run it:

1. Update `agent/env.json` file with your OpenAI API key.
2. This has solely been tested using Node 16.19.0.
3. In the `gptrpg` directory, execute `npm install` to install dependencies for all projects.
4. Run `npm start` in the root directory. This will launch the agent and the front-end, accessible at `http://localhost:3000`.

## The Environment
- Environment code resides in the `ui-admin` directory, structured as a React project.
- The environment is created using the Tiled map editor, with files located in `ui-admin/src/assets`.
- Rendering of the environment employs Phaser and the Grid Engine Plugin.

The environment consists of:

* The character (agent)
* Impassable tiles
* A layer with "plantable" tiles and plants (not currently utilized by the agent). Players can plant food on plantable tiles using the 'S' key and harvest food with the 'D' key.

## The AI Agent

- The AI agent's code in the `agent` directory.
- The agent is a basic AI that leverages the OpenAI API to make informed decisions. Communication with the front-end is achieved via a websocket.
- The agent is given various actions to choose from, along with the state of its environment and its internal state (currently only tracking sleepiness).

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