import React from 'react'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import {
  Link
} from "react-router-dom";
class SearchPage extends React.Component{
   constructor(props) {
    super(props);
    this.state = {query: '',queriedBooks:[]};
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    this.setState({query: event.target.value});  
    //console.log(event.target.value)
    let resp=[];
    if(event.target.value){
      try{	
      	resp = await BooksAPI.search(event.target.value);
        this.setState({queriedBooks:resp});
    }catch(error){
       console.error(error);
       }
      }
      
    
  }

  
  render(){
   console.log(this.state.queriedBooks)
    return(
              <div className="search-books">
            <div className="search-books-bar">
            <Link to="/">
              <button className="close-search">Close</button>
            </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={(e)=>this.handleChange(e)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
{(this.state.queriedBooks!==undefined)?this.state.queriedBooks.map((book)=>( 
  					  <Book key={book.id} book={book} shelfFunc={this.props.shelfFunc}/>)
              ):<li>No Books Found</li>}
                      </ol>
            </div>
          </div>
    )
    
  }
}
export default SearchPage;