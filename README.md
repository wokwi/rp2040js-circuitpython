# CircuitPython Command-line Simulator

A simple CircuitPython on Raspberry Pi Pico simulator, built on top of the [rp2040js](https://github.com/wokwi/rp2040js) library.

You can use this simulator to run the release firmware of CircuitPython on your computer, even if you
don't have access to the physical hardware. You can use it for automated testing (e.g. in a CI environment), as well as for educational purposes.

If you are looking for a full-blown, user friendly CircuitPython simualtor, please check out [Wokwi](https://wokwi.com): Start a [new CircuitPython project on Wokwi](https://wokwi.com/arduino/new?template=circuitpython-pi-pico).

## Usage

You'll need [Node.js](https://nodejs.org/en/download/) and npm (which comes bundled with Node.js). Clone this repo, and then:

```
npm install
npm start
```

To run the simulator. You should see output similar to this:

```
Starting CircuitPython simulator. Press Ctrl+X to exit.
Auto-reload is off.
Running in safe mode! Not running saved code.

You are in safe mode because:
You pressed the reset button during boot. Press again to exit safe mode.

Press any key to enter the REPL. Use CTRL-D to reload.
```

Then type any key (e.g. enter) to get into the REPL. Use "Ctrl+X" to exit from the simulator, Ctrl+E to go into paste mode, and Ctrl+D to soft-restart CircuitPython.

## GDB Server

The simulator listens for GDB connections on port 3333. Use the following command to connect the GDB debugger to the simulator:

```
target remote localhost:3333
```

You can change the port number by setting the `GDB_PORT` environment variable.

## License

Copyright (C) 2021 Uri Shaked. Released under the MIT license.
