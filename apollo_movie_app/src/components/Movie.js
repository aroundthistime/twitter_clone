import { Link } from "react-router-dom"


const Movie = ({id, poster}) => {
    return (
        <div className="movies__movie">
            <Link to={`/${id}`}>
                <img src={poster} alt={`movie${id}`}></img>
            </Link>
        </div>
    )
}

export default Movie;