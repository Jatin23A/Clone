import Hero from "../pages/Home";
import MovieCard from "../pages/Category";
import "./Movies.css";

const movies = [

{
title:"Interstellar",
image:"https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"
},

{
title:"Batman",
image:"https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
},

{
title:"Joker",
image:"https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
},

{
title:"Avengers",
image:"https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
}

];

function Movies(){

return(

<>

<Hero/>

<section className="home-section">

<h2>🔥 Trending Movies</h2>

<div className="movie-grid">

{movies.map((movie,index)=>

<MovieCard

key={index}

title={movie.title}

image={movie.image}

/>

)}

</div>

</section>

</>

)

}

export default Movies;