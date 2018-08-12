# Curtain

A lighting control software for Capture Sweden, DMX, ArtNet written in NodeJS

## Install

Curtain is in development.

You can build and try it yourself.

1. Install [nodeJS](https://nodejs.org/en/) and optionally [Capture Sweden (Student Edition)](http://www.capturesweden.com/Download/Student-Edition) if you want a 3D visualizer for your lighting rig
2. Clone this repository : `git clone git@github.com:dialexo/Curtain.git`
3. Access the app folder inside : `cd Curtain/app`
4. Install the node dependencies : `npm install`
5. Run the app : `npm start`

## Dependencies

Curtain makes use of the following great modules and their dependencies :

- **artnet** : a module that sends ArtDMX packages through the network to an Art-Net node
- **nw** : packages a Chromium browser used as the app's GUI

Curtain also uses several tools in its build chain :

- **sass** : Sass compiler for GUI styling
- **mustache** : templating for GUI building

## Author

Curtain is originally written by Alexandre CHAU \<code@chau.moe>