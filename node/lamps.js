module.exports = lamps

function lamps() {
  const loopin = this

  loopin.dispatchListen( 'pixels', function ( event ) {
    let channel = 0
    let data = event.data
    let pixels = new Buffer( data.data, 'base64' )
   

    let socket = refreshSocket() 

    if ( socket ) {
      let message = createPixelsMessage( channel, pixels )
      socket.write( message )
    }

    return true
  } )
}

var opcSocket 
var lastTry = 0 

function refreshSocket() {
  if ( opcSocket )
    return opcSocket 

  // Only retry every 3 seconds 
  if ( now() - lastTry < 3000 )
    return 

  lastTry = now()

  var Socket = require("net").Socket
  var socket = new Socket()
  socket.setNoDelay()
  socket.on('error', function () {
    console.error('OPC socket error')
    socket.destroy()
    opcSocket = null 
  })

  socket.on('connect', function() {
    opcSocket = socket
  })

  socket.connect(7890)

  return opcSocket
}

function now() {
  return new Date().getTime()
}

// Ripped from https://github.com/parshap/js-opc/blob/master/index.js

function createMessage(channel, command, data) {
  var control = createControl(channel, command, data.length);
  return Buffer.concat([control, data]);
}

function createPixelsMessage(channel, pixels) {
  return createMessage(channel, 0, pixels);
}

function createControl(channel, command, length) {
  var CONTROL_LENGTH = 4;
  var buffer = Buffer.alloc(CONTROL_LENGTH);
  buffer.writeUInt8(channel, 0); // Channel
  buffer.writeUInt8(command, 1); // Command
  buffer.writeUInt16BE(length, 2); // Data length
  return buffer;
}