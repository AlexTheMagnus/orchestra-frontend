![OrchestraBanner](https://user-images.githubusercontent.com/37160608/151792937-30207875-998b-4ff3-b024-34ca88c290f3.png)
# 🎶📖🎶 Orchestra Frontend 🎶📖🎶

## Table of contents

- [Pre-installation requirements](#pre-installation-requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Uninstall](#uninstall)



## Pre-installation requirements

- Node version 16.5
- Yarn version 1.22.5
- Expo 4.8.1

> ⚠️ These requirements will allow Orchestra to work on Ubuntu 20.04. For other operative systems they might change.



## Installation

Clone this repo and run `yarn` inside the project folder to install the dependencies. Make sure you are using the correct Node version. If you have installed nvm, you can run `nvm use` to change to the correct node version.



## Configuration

- **SPOTIFY_CLIENT_ID**: Spotify app client ID (Can be obtained from [Spotify for Developers](https://developer.spotify.com/dashboard/applications)).
- **LOCAL_ORCHESTRA_URL**: Orchestra frontend location.
- **BACKEND_URL**: Orchestra backend location.

> ⚠️ Most Android emulators' location to localhost is `http://10.0.2.2`. So, if your backend is running on `http://localhost:5000`, for example, you will need to set the `BACKEND_URL` to `http://10.0.2.2:5000` in order to match the port.



## Usage

1. Run `yarn start` inside the project folder to launch the expo server. Browser will open displaying the expo developer tools.
2. On the developer tools left sidebar, select `Run on Android device/emulator`.


## Demo

<p align="center">
  <img src="https://github.com/AlexTheMagnus/orchestra-frontend/assets/37160608/fcf98515-84ae-4736-976c-218b611fe297" height="600"/>
  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
  <img src="https://github.com/AlexTheMagnus/orchestra-frontend/assets/37160608/84939bd3-ba3d-44ce-a614-2f68bd793841" height="600"/>
</p>



## Uninstall

All dependencies are installed locally. So, in order to uninstall the project just delete the folder.
