import React, {Component} from 'react';
import auth from '../services/authService';
import { Link } from 'react-router-dom';
import Like from './common/like';
import Table from  './common/table';


class MoviesTable extends Component {
    column = [
        { path:'title', lable: 'Title', content: movie => <Link to ={`/movies/${movie._id}`}>{movie.title}</Link>},
        { path:'genre.name', lable: 'Genre'},
        { path:'numberInStock', lable: 'Stock'},
        { path:'dailyRentalRate', lable: 'Rate'},
        { key : "like", content:movie => <Like onClick = {()=>this.props.onLike(movie)} liked = {movie.liked}/> },
        
    ];

    deleteColumn = {
        key: "delete",
        content: movie => (
            <button
                onClick = {()=> this.props.onDelete(movie)}
                className = "btn btn-danger btn-sm"
            >
                Delete
            </button>
        )
    }

    constructor() {
        super();
        const user = auth.getCurrentUser();
        if (user && user.isAdmin)
            this.column.push(this.deleteColumn);
    }

    render() { 
        const {movies,sortColumn, onSort} = this.props;

        return ( 
           <Table 
                columns = {this.column}
                data = {movies}
                sortColumn = {sortColumn}
                onSort = {onSort}
           />
         );
    }
}
 

export default MoviesTable;