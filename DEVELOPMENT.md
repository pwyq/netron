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
- `python 3`
- `pip3`
- `yarn` (recommended to use this as packge manager)
- `virtualenv`
    - On windows:
        - `pip install virtualenv`
        - `pip install virtualenvwrapper-win`
- `pip install google`
- `pip3 install pyinstaller`

```bash
cd tools
./tf sync install schema metadata
```


## To use python scripts
1. add python scripts under `${root}/python_scripts`
2. compile python scripts to executable, using `pyinstaller your_python_scripts.py -y`
3. use `execFile`

if there is linking issue using pylint in VS Code,
https://stackoverflow.com/a/50432805/10620764

clean up `python_scripts/build/{updated python scripts}` and `python_scripts/dist/{updated python scripts}`
pyinstaller warning `lib not found` can be ignore (I don't find it affect anything so far)

add usage for major files:

- [view.js]
- [view-grapher.js]
- [view-electron.js]
- [view-browser.js]
    - This can be ignored if you don't focus on webpage representation format.

# Note
1. Ask user to use no white-space paths
3. Only tested on Windows OS

# TODO
- fix ONNX export (.py)
- only add stuff to local client, haven't changed `view-browser.js` (webpage client) 
- add custom attr to the main box (the white one)
- dumpGraph.py
    - test white-space path
- Mark all AIRunner supported operations when loading
    - test on linux/macOS
https://github.com/onnx/onnxmltools

# Done
- group items
- allow user to add custom attributes
- test if custom attr works in product
- id issue. some graph nodes don't have id, but use time as id instead
- customAttr obj value (no use), maybe delete that? (i add comment)
