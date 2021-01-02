import {useParams } from "react-router-dom"
import {gql} from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import "./Details.css";

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
    }
`;

export default () => {
    const { id } = useParams();
    const {loading, error, data } = useQuery(GET_MOVIE_DETAILS, {
        variables : {
            id : parseInt(id)
        }
    })
    console.log(data);
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
                    <div className="movie__column">
                        <img className="movie__poster" src={data.movie.medium_cover_image} alt={data.movie.title}></img>
                        <div className="movie__headline">
                            <span className="movie__title">{data.movie.title}</span>
                            <span className="movie__year">({data.movie.year})</span>
                        </div>
                        <ul className="movie__genres">
                            {data.movie.genres.map((genre, index) => (<li className="movie__genre" key={index}>{genre}</li>))}
                        </ul>
                    </div>
                    <div className="movie__column movie__description">{data.movie.description_full}
                    </div>
                </div>
            )}
        </div>
    )
};