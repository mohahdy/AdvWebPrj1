import React from 'react'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import {
  Link
} from "react-router-dom";
class SearchPage extends React.Component{
   constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
  }
  state = {query: '',queriedBooks:[]};
  updateShelfProp(resp){
    this.props.books.forEach(book => {
      const existingBookIndex = resp.findIndex((bk)=>bk.id===book.id)
      if(resp[existingBookIndex]) resp[existingBookIndex].shelf = book.shelf;
    });
    return resp;
  }
  async handleChange(event) {
    this.setState({query: event.target.value});  
    let resp=[];
    if(event.target.value){
      try{	
      	resp = await BooksAPI.search(event.target.value);
        if (Array.isArray(resp) && resp.length>0) {resp = this.updateShelfProp(resp);}
        this.setState({queriedBooks:resp});
    }catch(error){
       console.error(error);
       }
      }
      else{
        this.setState({queriedBooks:[]});
      }
      
    
  }

  
  render(){
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
              
              {(Array.isArray(this.state.queriedBooks))?this.state.queriedBooks.map((book)=>( 
  					  <Book key={book.id} book={book} shelfFunc={this.props.shelfFunc}/>)
              ):<li>No Books Found</li>}
                      </ol>
            </div>
            
          </div>
    )
    
  }
  
}
export default SearchPage;