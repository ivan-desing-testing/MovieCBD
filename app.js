const express = require("express"),
      app = express(),
      bodyParser  = require("body-parser"),
      methodOverride = require("method-override");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//CONF PORT
app.set('port', process.env.PORT || 3000)

// CONNECT BBD
mongoose.connect('mongodb://localhost:27017/MovieDB', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('Connected to Database!'))
    .catch(e => console.error(e));

// BDD SCHEMAS
const MovieSchema = new Schema({
    
   //_id:Schema.Types.ObjectId,
    title:String,
    alternative_titles:Array,
    year:Number,
    image:String,
    color:String,
    score:Number,
    rating:Number,
    actors:Array,
    actor_facets:Array,
    genre:Array
    
});

const Movie = mongoose.model('movies',MovieSchema);

const ActorSchema = new Schema({
    
    //_id:Schema.Types.ObjectId,
    name:String,
    rating:Number,
    image_path:String,
    alternative_name:String
    
});

const Actor = mongoose.model('actors',ActorSchema);


// ROUTERS
const router = express.Router();

router.get('/', function(req, res) {
    res.send("BIENVENIDO A MOVIE CBD API");
});

// Search de movies por titulo ok
router.get('/api/movies/search/:title', function(req, res) {
    const title = String(req.params.title);
    Movie.find({"title": {$regex:`.*${title}`, $options:"i"}},{title:1})
            .then(x => res.json(x))
            .catch(() => res.send('Sin resultados.'));
});

// Search de movies con limitador. ok
router.get('/api/movies/search/:title/:limit', function(req, res) {
    const title = String(req.params.title);
    const limit = parseInt(req.params.limit);
    Movie.find({"title": {$regex:`.*${title}`, $options:"i"}},{title:1}).limit(limit)
            .then(x => res.json(x))
            .catch(() => res.send('Sin resultados.'));
});

// Get pelicula por su id ok
router.get('/api/movies/:id', function(req, res) {
    const id = String(req.params.id);
    Movie.findById(id)
         .then(x => res.json(x))
         .catch(() => res.send(`La película con id ${id} no existe.`));
});

// Search de actores por nombre ok
router.get('/api/actors/search/:name', function(req, res) {
    const name = String(req.params.name)
    Actor.find({"name": {$regex:`.*${name}`, $options:"i"}},{name:1})
         .then(x => res.json(x))
         .catch(() => res.send('Sin resultados.'));
});

// Search de actores con limitador ok
router.get('/api/actors/search/:name/:limit', function(req, res) {
    const name = String(req.params.name)
    const limit = parseInt(req.params.limit)
    Actor.find({"name": {$regex:`.*${name}`, $options:"i"}},{name:1}).limit(limit)
         .then(x => res.json(x))
         .catch(() => res.send('Sin resultados.'));
});

// Get actor por id ok
router.get('/api/actors/:id', function(req, res) {
    const id = parseInt(req.params.id);
    Actor.findById(id)
         .then(x => res.json(x))
         .catch(() => res.send(`El actor con id ${id} no existe.`));
});

// Insertar una nueva pelicula
// TODO: Hay que validar el resto de campos
router.post('/api/movies', function(req, res) {
    const {title,year,score,genre} = req.body;
    if(title == null || year == null || score == null || genre == null){
        res.send('El formato de esta película no es adecuado.')
    } else {
        console.log(req.body);
        const newMovie = new Movie(req.body);
        newMovie.save()
             .then(() => res.send(`Película ${title} creada con exito.`))
             .catch(() => res.send(`La pelicula no ha podido guardarse.`));
    }
});

//Insertar un nuevo actor
router.post('/api/actors', function(req, res) {
    const {name, rating, image_path, alternative_name} = req.body;
    if( name == null || rating == null || image_path == null || alternative_name == null) {
        res.send('El formato de json no es correcto.')
    } else {
        console.log(req.body);
        const json = req.body;
        const newActor = new Actor({
            //_id:Schema.Types.ObjectId,
            name:'Prueba',
            rating:1500,
            image_path:'prueba imagen',
            alternative_name:'prueba nombre'   
        });
        newActor.save()
             .then(() => res.send(`${name} se ha registrado con exito.`))
             .catch();
    }
});

//Actualizar una pelicula
router.post('/api/movies/:id', function(req, res) {
    const id = String(req.params.id);
    Movie.findOneAndUpdate({ _id: id }, {$set: req.body})
    .then(() => `Pelicula actualizada con exito.`)
    .catch(() => `Se ha producido un error.`)
});

//Actualizar un actor
router.post('/api/actors/:id', function(req, res) {
    const id = String(req.params.id);
    Actor.find({"_id": ObjectId(id)})
         .then(x => res.json(x))
    res.send("Actor actualizado con exito.");
});

// TODO: Un metodo que devuelva un array de actores en un rango de popularidad  
router.get('/api/actors/ranking/:min/:max', function(req, res) {
    const max = String(req.params.max);
    const min = String(req.params.min);
    // db.movies.find({score:{$gte: 6.0,$lte: 8.0}}) devolver rango de pelis del 6 al 8 
    Actor.find().find({rating:{$gte: min,$lte: max}})
         .then(x => res.json(x))
});

// TODO: Un metodo que introduzca el actor con id en la pelicula con id 
router.post('/api/movies/:id/actors/:id', function(req, res) {
    const id = String(req.params.id);''
    // Esto no funciona, hay que poner el actualizar
    Movie.find()
         .then(x => res.json(x))
    res.send("Película actualizada con exito.");
});

// Devuelve lista de actores con ranking mas alto en orden descendente ok
router.get('/api/actors/list/ranking', function(req, res) {
    Actor.find().sort({ranking:-1}).limit(50)
         .then(x => res.json(x))
});

// Devuelve lista movies con score mas alto en orden descendente
router.get('/api/movies/list/ranking', function(req, res) {
    Movie.find().sort({score:-1}).limit(50)
         .then(x => res.json(x))
});

router.get('/api/main', function(req, res) {
    main().then(() => res.send(`saved`))
});


// LISTEN
app.use(router);

app.listen(app.get('port'), function() {
  console.log("Node server running on http://localhost:3000");
});