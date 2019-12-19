import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';





const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
      },


    },
  }));


const UpdateMovie = props => {
    const classes = useStyles();

    const [movieForm, setMovieForm] = useState({
        title: '',
        director: '',
        metascore: 0,
        stars: []
    })

useEffect(() => {
  const movieToEdit = props.movies.find( e=> `${e.id}` === props.match.params.id
  );
  console.log(props.movies, movieToEdit)
  if(movieToEdit) {
      setMovieForm(movieToEdit)
  }

},[props.movies, props.match.params.id])

const changeHandler = e => {
    if(e.target.name === 'stars'){
        setMovieForm({...movieForm, stars: e.target.value.split(',')})
    } else {
    setMovieForm({...movieForm, [e.target.name]: e.target.value})
    }
}

console.log(movieForm.id)
const updateMovie = (e) => {
 e.preventDefault();
 axios.put(`http://localhost:5000/api/movies/${movieForm.id}`, movieForm)
.then(res => {
    const updatedMovieList = props.movies.map(movie => {
        if(movie.id === movieForm.id) {
            return movie = res.data
        } else {
            return movie
        }
       
    })
    props.setMovie(updatedMovieList)
    props.history.push('/')
})
.catch(error => {
    console.log(error)
})
}

    return (
        <div>
            <div className='post-form'>
        <form className={classes.root} noValidate autoComplete='off'>
            <TextField variant ='outlined' id ='standard-basic'name ='title' value={movieForm.title} onChange={changeHandler} type ='text' label='Title' className='input-field'/>
            <TextField  variant ='outlined' name ='director' value={movieForm.director} onChange={changeHandler} type ='text'
            label='Director' className='input-field'/>
            <TextField  variant ='outlined' name ='metascore' value={movieForm.metascore} onChange={changeHandler} type ='number'
            label='Metascore' className='input-field'/>
            <TextField  variant ='outlined' name ='stars' value={movieForm.stars} onChange={changeHandler} type ='text'
            label='Stars' className='input-field'/>
            <Button onClick ={updateMovie} variant ='contained' color ='primary'>Update Movie</Button>
        </form>
    </div>
        </div>
    )
}


export default UpdateMovie;