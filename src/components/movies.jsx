import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { getMovies, deleteMovie } from '../services/movieService';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import SearchBox from './common/searchBox';
import {paginate} from '../utils/paginate';
import {getGenres} from '../services/genreService';
import _ from 'lodash';
import {Link} from 'react-router-dom';


class Movies extends Component {
    state = { 
        movies: [],
        pageSize: 4,
        currentPage: 1,
        searchQuery: "",
        selectedGenre: null,
        genres: [],
        sortColumn:{ path: 'title', order: 'asc'}
     };

    async componentDidMount() {
        const {data}  = await getGenres();
        const genres = [{_id:"", name:'All Genres'},...data];

        const {data: movies} = await getMovies();
        this.setState({movies, genres});
    }

    handleDelete = async (movie) => {
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m => movie._id !== m._id);
        this.setState({movies});

        try{
            await deleteMovie(movie._id);
        }
        catch(ex){
            if(ex.response && ex.response.status === 404){
                toast.error('This movie has already been deleted.');
            }

            this.setState({ movies:originalMovies});
        }
        
     }

    handleLike = (movie) =>{
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked; 
        this.setState({movies});
    }

    handlePageChange = page => {
        this.setState({currentPage: page});
    }

    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre,searchQuery:"", currentPage: 1});
    }

    handleSort = (sortColumn) => {
        this.setState({ sortColumn});
    }

    handleSearch = query => {
        this.setState({ searchQuery:query, selectedGenre: null, currentPage:1 });
    }

    getPageData = () => {
        const {pageSize, currentPage, selectedGenre ,movies: allMovies, sortColumn, searchQuery} = this.state;
        
        let filtered = allMovies;
        if(searchQuery)
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));

        else if(selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m=> m.genre._id === selectedGenre._id);
        
        const sorted = _.orderBy(filtered, [sortColumn.path],[sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies};

    }

    render() {
        const {length: count} = this.state.movies;
        const {pageSize, currentPage, sortColumn,searchQuery} = this.state;
        const {user} = this.props;

        
        if(count === 0)
            return <p>There are no movies in the database.</p>;

        const {totalCount, data:movies} = this.getPageData();

        return (
        <div className="row">
            <div className="col-3">
                <ListGroup 
                    items = {this.state.genres}
                    onItemSelect = {this.handleGenreSelect}
                    selectedItem = {this.state.selectedGenre}
                />
            </div>
            <div className="col">
                {user && <Link
                    to = "/movies/new"
                    className = "btn btn-primary"
                    style = {{marginBottom: 20 }}
                >
                 New Movie
                </Link>}
                <p>Showing {totalCount} movies in the database.</p>
                <SearchBox value = {searchQuery} onChange = {this.handleSearch} />
                <MoviesTable
                    movies = {movies}
                    sortColumn = {sortColumn}
                    onLike = {this.handleLike}
                    onDelete = {this.handleDelete}
                    onSort = {this.handleSort}
                />
                <Pagination 
                    itemsCount = {totalCount} 
                    pageSize = {pageSize} 
                    onPageChange = {this.handlePageChange}
                    currentPage = {currentPage}
                />
            </div>
            
        </div>
        
        ); 
    }
}
 
export default Movies;