const express = require('express');
const path = require('path')
const movie_manager = require('./movie_manager')
const movie_db_path = "movie_db"
const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/templates/index.html'));
});



app.get('/test', (req, res) => {
  res.send(`
  <pre>
           <a href="/directors">directors</a>
           <a href="/directors/Ephron">moviesby Ephron</a>
           <br>        
           `)
});

app.get('/directors', async (req, res, next) => {

  res.setHeader('Content-Type', 'application/json');

  let directors = await movie_manager.get_directors(movie_db_path)

  let director_names = directors.map(d => d.name)

  let ret = { directors: director_names }
  res.send(JSON.stringify(ret))

}
)

app.get('/directors/:director', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  console.log( 'here i am JH')
  console.log( req.params.director )
  let directors = await movie_manager.get_directors(movie_db_path)

  console.log( directors )

  
  let director = directors.filter( d => {
    return d.name == req.params.director
  } )[0]

  
  res.send( JSON.stringify(director) )

}
  )


app.listen(3000, () => {
  console.log('server started');
});
