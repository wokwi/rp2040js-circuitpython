const { RP2040, ConsoleLogger, LogLevel, USBCDC } = require('rp2040js');
const { loadUF2 } = require('./load-uf2');
const { bootromB1 } = require('./bootrom');
const { GDBTCPServer } = require('rp2040js/gdb-tcp-server');

const mcu = new RP2040();
mcu.loadBootrom(bootromB1);
mcu.logger = new ConsoleLogger(LogLevel.Error);
loadUF2('firmware/adafruit-circuitpython-raspberry_pi_pico-en_US-7.0.0-rc.1.uf2', mcu);

const cdc = new USBCDC(mcu.usbCtrl);
cdc.onSerialData = (value) => {
  process.stdout.write(value);
};

process.stdin.setRawMode(true);
process.stdin.on('data', (chunk) => {
  // 24 is Ctrl+X
  if (chunk[0] === 24) {
    process.exit(0);
  }
  for (const byte of chunk) {
    cdc.sendSerialByte(byte);
  }
});

// The following patch skips the 1 second boot delay, but we always start in safe mode:
mcu.sramView.setUint32(0x40000, 0xad0005af, true);

// Configure GDB
const gdbServer = new GDBTCPServer(mcu, process.env.GDB_PORT || 3333);

console.log('Starting CircuitPython simulator. Press Ctrl+X to exit.');
console.log(`GDB server listening on TCP port ${gdbServer.port}`);
mcu.PC = 0x10000000;
mcu.execute();
