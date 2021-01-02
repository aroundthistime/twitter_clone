import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Movie from "../components/Movie";
import "./Home.css";


const GET_MOVIES = gql`
    {
        movies{
            id
            medium_cover_image
        }
    }
`;

export default () => {
    const { loading, error, data } = useQuery(GET_MOVIES);
    return (
        <div className="container">
            <header className="container__header bg--gradation">
                <div className="header__title">Apollo Movies</div>
                <div className="header__subtitle">Created by aroundthistime</div>
            </header>
            <main className="container__main">
                {loading && <img className="main__loader" src="https://flevix.com/wp-content/uploads/2019/07/Ajax-Preloader.gif" alt="loading"/>}
                {!loading && data.movies && (
                    <div className="container__movies">
                        {data.movies.map(movie => <Movie key={movie.id} id={movie.id} poster={movie.medium_cover_image}></Movie>)}
                    </div>
                )}
            </main>
        </div>
    )
}