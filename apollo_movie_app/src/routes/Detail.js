import {useParams } from "react-router-dom"
import {gql} from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import "./Details.css";
import Movie from "../components/Movie";

const GET_MOVIE_DETAILS = gql`
    query getMovieDetails($id : Int!){
        movie(id: $id){
            id
            title
            year
            genres
            description_full
            medium_cover_image
        }
        suggestions(id : $id){
            id
            medium_cover_image
        }
    }
`;

const NO_DESCRIPTION_MESSAGE = "Could not find any information about this movie ;("

export default () => {
    const { id } = useParams();
    const {loading, error, data } = useQuery(GET_MOVIE_DETAILS, {
        variables : {
            id : parseInt(id)
        }
    })
    return (
        <div className="container container--details">
            {loading && (
                <div className="container__loader">
                    <div className="loader__volume"></div>
                    <div className="loader__volume"></div>
                    <div className="loader__volume"></div>
                    <div className="loader__volume"></div>
                </div>
            )}
            {!loading && !error && data && (
                <div className="container__movie">
                    <div className="movie__header">
                        <div className="movie__headline">
                           <span className="movie__title">{data.movie.title}</span>
                            <span className="movie__year">({data.movie.year})</span>
                        </div>
                        <ul className="movie__genres">
                            {data.movie.genres.map((genre, index) => (<li className="movie__genre" key={index}>{genre}</li>))}
                        </ul>
                    </div>
                    <img className="movie__poster" src={data.movie.medium_cover_image} alt={data.movie.title}></img>
                    <div className="movie__description">{data.movie.description_full ? data.movie.description_full : NO_DESCRIPTION_MESSAGE}</div>
                    {data.suggestions && (
                        <div className="movie__recommends">
                            <p className="recommends__text">Recommends</p>
                            <div className="recommends__movies">
                                {data.suggestions.map((movie, index) => <Movie key={index} id={movie.id} poster={movie.medium_cover_image}></Movie>)}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
};