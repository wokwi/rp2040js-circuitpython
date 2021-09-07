const { closeSync, openSync, readSync } = require('fs');
const { decodeBlock } = require('uf2');

exports.loadUF2 = function loadUF2(filename, rp2040) {
  const file = openSync(filename, 'r');
  const buffer = new Uint8Array(512);
  while (readSync(file, buffer) === buffer.length) {
    const block = decodeBlock(buffer);
    const { flashAddress, payload } = block;
    rp2040.flash.set(payload, flashAddress - 0x10000000);
  }
  closeSync(file);
};
