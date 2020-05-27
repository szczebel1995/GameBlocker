# GameBlocker

GameBlocker is a simple electron application that allows you to block any game or program from launching on your Windows machine. You can scan your disk to find most popular launchers and games installed on your computer or add any executable you want to block manually.

![gif](./gif.gif)

List of game launchers that are detected automatically:

- Steam
- Origin
- Uplay
- GOG
- Epic Games
- Battle.net
- Riot Games

## Project Status

Currently application is in early alpha. Here are some things to keep in mind

- In order to block applications GameBlocker modifies system registy therefore it has to be run with elevated privelages, that means there is a chance to do some damage to your system, use at your own risk (currently only tested on 64-bit Windows 10)
- Games scan functionality is hardcoded to look for most popular launchers paths. As of now it looks for thier default paths on disk C://. I you installed your launchers or games in custom location then you will have to add them manually.
- Right now you can only run GameStopper from source as its not ready for commercial use

## How to use

1. Clone this repo.
2. run `npm install`.
3. open terminal as administator and run `electron:windev`

## Vision

I want GameStopper to be an effective tool in combatting unhealthy video games consumption. I'm planing to add features that will allow users to set time goals and make them accountable. I want GameStopper to inspire users to respect thier life and spend more time in the real world.
