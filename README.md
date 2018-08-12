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
- **@fortawesome/fontawesome-free** : icons toolkit
- **sass** : Sass compiler for GUI styling
- **jquery** and **jquery-ui-dist** : UI libraries for web-based applications

## Author

Curtain is originally written by Alexandre CHAU \<code@chau.moe>

## License

This program is licensed under the GNU GPLv3 license.

Copyright (C) 2018 Curtain

>   This program is free software: you can redistribute it and/or modify
>   it under the terms of the GNU General Public License as published by
>   the Free Software Foundation, either version 3 of the License, or
>   (at your option) any later version.

>   This program is distributed in the hope that it will be useful,
>   but WITHOUT ANY WARRANTY; without even the implied warranty of
>   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
>   GNU General Public License for more details.

>   You should have received a copy of the GNU General Public License
>   along with this program.  If not, see <http://www.gnu.org/licenses/>