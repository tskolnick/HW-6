const fs = require('fs')
const path = require('path')


class Filmography {
  constructor(filmography_path) {
    this.name = path.basename(filmography_path);
    this.path = filmography_path;
    this.films = [];
  }

  async load() {
    let dir_entries = await fs.promises.readdir(
      this.path, { withFileTypes: true }
    )
    let files = dir_entries.filter( dir_entry => dir_entry.isFile )
    this.films = files.map( de => de.name )
   }

}

function create_filmography(filmography_path) {
  return new Filmography(filmography_path)
}

module.exports.create_filmography = create_filmography


module.exports.get_directors = async function(root_folder) {
  let all_dir_entries = await fs.promises.readdir(  root_folder, { withFileTypes: true } )
  
  let folders = all_dir_entries.filter( 
    dir_entry => dir_entry.isDirectory() )

  let director_list = folders.map( 
      folder => create_filmography(root_folder + '/' + folder.name )   )

  let director_promises =  director_list.map( a =>  { 
     return a.load()       
    }
  )

  await Promise.all( director_promises )
  return director_list
  
}
