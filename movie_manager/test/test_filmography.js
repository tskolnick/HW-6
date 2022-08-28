let filmography_module = require( '../lib/filmography')
const assert = require('assert');


async function test(){
filmography = filmography_module.create_filmography( 'moviesby/Ephron')
await filmography.load()
console.log( filmography )  

 assert( filmography.films.length >= 3 )

directors  = await filmography_module.get_directors( 'moviesby')

console.log( directors )  

 assert( directors.length >= 3 )
  
}


test()