module.exports = random_colour
const H = require('horten')
const Colour = require('deepcolour')

function random_colour() {
  const loopin = this
      , opt = {}

  const cursor = new H.Cursor( {
    listening: true,
    path: 'logic/random_colour',
    onValue: v => v && run()
  } )

  run()

  return cursor

  function run() {
    let count  = 20
    let colour = new Colour()
    let data = ''

    for ( let i = 0; i < count; i ++ ) {
      colour.setRandom()
      data += colour.hex
    }

    loopin.patch( data, 'pixels/random_colour/data' )
  }
 
}
