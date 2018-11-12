# How to Develop Netron

Netron can run as both an [Electron](https://electronjs.org) app or a Python web server.

## Develop the Electron app

To start the Electron app, install [Node.js](https://nodejs.org) and run:  (for Windows user, run under the root of this repository in `cmd`)

```bash
npm install
npx electron .
```

To debug the Electron app use [Visual Studio Code](https://code.visualstudio.com) and install the [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) extension. Open the `./Netron` root folder and press `F5`. To attach the debugger to a rendering window select the `Debug` tab and `Debug Renderer Process` before launching.

To build Electron release binaries to the `./build/electron` folder run:

```bash
npx electron-builder --mac --linux --win
```

## Develop the Python server

To build and launch the Python server run:

```bash
npm install
python setup.py build
PYTHONPATH=build/python/lib python -c "import netron; netron.main()"
```

## Debug

## Debug Renderer Process
Install `Debugger for Chrome` to use this DEBUG configuration.

- `protoc`
- `python 3.7`
- `pip`
- `yarn` (recommended to use this as packge manager)
- `virtualenv`
    - On windows:
        - `pip install virtualenv`
        - `pip install virtualenvwrapper-win`
- `pip install google`
- `pip install pyinstaller`

```bash
cd tools
./tf sync install schema metadata
```