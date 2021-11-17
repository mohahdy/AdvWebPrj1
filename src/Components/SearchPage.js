import React from 'react'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
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
    
      try{	
      	resp = await BooksAPI.search(event.target.value);
      console.log(resp);
        this.setState({queriedBooks:resp});
    }catch(error){
       console.error(error);
       }
    
      
    
  }

  
  render(){
   
    //console.log("render the serach page.")
    return(
              <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.props.searchPageState.setState({ showSearchPage: false })}>Close</a>
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
{this.state.queriedBooks.map((book) =>( 
  					  <Book key={book.id} book={book} shelfFunc={this.props.shelfFunc}/>
  					  ))}
                      </ol>
            </div>
          </div>
    )
    
  }
}
export default SearchPage;