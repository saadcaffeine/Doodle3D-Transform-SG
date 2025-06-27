# Doodle3D-Transform
Doodle3D Transform is a free and open-source web-app that makes designing in 3D easy and fun! Created with love by Casper, Peter, Jeroen, Simon, Arne, Donna, Nico and Rick, in 2015-2017. With the support of 1,626 Kickstarter backers.

In 2021 we updated Doodle3D Transform to work completely on the client-side. There is no server sided-code and/or user management anymore and no server sided storage of doodles.

As of 2021-05-26 Doodle3D Transform is distributed under the MIT License. This gives everyone the freedoms to use Doodle3D Transform in any context: commercial or non-commercial, public or private, open or closed source.

![Screenshot](screenshot.png)

## Run online
https://doodle3d.com

## Build & run locally
```bash
git clone git@github.com:Doodle3D/Doodle3D-Transform.git
cd Doodle3D-Transform
npm install    # Make sure you have installed NPM / NodeJS first
npm run start
# visit http://localhost:8080
```

## Other important repositories
* The core features of Doodle3D Transform: https://github.com/doodle3d/Doodle3D-Core
* The GCODE slicer of Doodle3D Transform: https://github.com/doodle3d/Doodle3D-Slicer


# 🎨 Doodle3D-Transform-SG

This is a fork of [Doodle3D Transform](https://github.com/Doodle3D/Doodle3D-Transform) adapted for long-term reproducibility and compatibility with Node.js v14. It includes the full 3D sketch-to-print workflow built on WebGL, React, Redux, and Three.js.

---

## 🧰 Requirements

- **Node.js 14.x** (recommended: `14.17.3`)
- **npm 6.x or 7.x**
- `nvm` (recommended)
- React 16
- Babel 6
- Webpack 3
- Core-JS 2
- Redux 3
- CommonJS
---

## 🚀 Setup Instructions

### 1. Use Node.js 14

```bash
nvm install 14
nvm use 14
```

### 2. Clone the repo

```bash
git clone https://github.com/saadcaffeine/Doodle3D-Transform-SG.git
```

## 🔐 Local Core            

Transform-SG uses a local version of Core from Core-SG:

```bash
git clone https://github.com/saadcaffeine/Doodle3D-Core-SG.git ../Doodle3D-Core-SG
cd ../Doodle3D-Core-SG
npm install && npm run build
npm link
cd ../Doodle3D-Transform-SG
npm link @doodle3d/doodle3d-core
```

### 3. Install Doodle-3D-Transform-SG

> ℹ️ All dependencies are **version-locked**, including GitHub packages like `@doodle3d/doodle3d-slicer`, to ensure stable builds.

```bash
npm install --legacy-peer-deps
```

---

### 4. Start the development server

```bash
npm start
```

Visit [http://localhost:8080](http://localhost:8080)

---

## Build for RaspberryPi

Webpack requires these
```bash
sudo apt install -y build-essential automake autoconf libtool libpng-dev
```
You may need to install specific version of webpack-dev-server before installing Doodle-3D-Transform-SG
```bash
npm install webpack-dev-server@2.11.5 --legacy-peer-deps --ignore-scripts
```

## running on RaspberryPi

Increase inotify watcher lmits

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```
## TODO:
- Doodle3D as a systemd doodle3d-app.service
- img file for raspberryPi
- kiosk mode version
- deb package?
--

## ⚠️ Legacy Notes

- This project uses **Webpack 3**, **React 16**, Babel 6, and **Redux 3**.
- It’s designed for older browsers and codebases.
- **Do not upgrade Webpack or Babel without a rewrite.**

---

## 📄 License

MIT – forked and modified for compatibility by [@saadcaffeine](https://github.com/saadcaffeine).
