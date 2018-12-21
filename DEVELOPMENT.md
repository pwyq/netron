# How to Develop Netron

Netron can run as both an [Electron](https://electronjs.org) app or a Python web server.

## Develop the Electron app

To start the Electron app, install [Node.js](https://nodejs.org) and run:

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

---

__Note Following is added by Yanqing__

---

## Debug Renderer Process
- Install `Debugger for Chrome` in `VS Code` to use the DEBUG configuration.
- Install following:
    - `protoc`
    - `python`  (I use python3)
    - `pip`
    - `virtualenv`
        - On windows:
            - `pip install virtualenv`
            - `pip install virtualenvwrapper-win`
    - `pip install google`
    - `pip install pyinstaller`

## To use export to txt/json
1. add python scripts under `${root}/python_scripts`
2. Before building, clean up `python_scripts/build/{updated python scripts}` and `python_scripts/dist/{updated python scripts}`
3. compile python scripts to executable, using `pyinstaller your_python_scripts.py -y`
    - pyinstaller warning `lib not found` can be safely ignored (I don't find it affect anything so far)
4. use `execFile` command in `.js`

## Note
1. Ask user to use no white-space paths
2. Only tested on Windows OS
3. The configuration file naming must be `{your_preferred_filename}_config.json`; inside the `{}_config.json`, the first key name must also be the same as `{your_preferred_filename}`.

## TODO
- Add NXP copyright
- Test on Linux, macOS
- Modify `view-browser.js` (web client)
- Test white-space path on export txt/json function
- Modify all attributes within the same group at the same time
