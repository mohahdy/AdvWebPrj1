import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import PageTitle from './Components/PageTitle.js'
import SearchPage from'./Components/SearchPage'
import Shelves from'./Components/Shelves'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    booksFullList: [],
    query: '',
    
  };
	updateShelf = async(bk,targetShelf)=>{
    //console.log(`bk = > ${bk.title}   targetShelf = > ${targetShelf}`)
    	this.setState({booksFullList:this.state.booksFullList.map(book=>{
          bk.id===book.id?book.shelf=targetShelf:book.shelf=book.shelf;
         return book;
        }
                                                                 )});
          //console.log("booksFullList after map = >"+this.state.booksFullList)\
      try{
		await BooksAPI.update(bk,targetShelf);
        console.log(bk,targetShelf)
      }catch(error){
        console.error(error);
      }
    }
  
  	 /*pdateSerachPage = async(query)=>{
       let resp;
      this.setState({query});
       try{
      	resp = await BooksAPI.search(query);
       }catch(error){
       console.error(error);
       }
    
      this.setState({queriedBooks:resp});
    }*/
  render() {
    console.log('App.js render')
    const books = this.state.booksFullList;
    console.log(books)
  	/*let currentlyReadingBooks;
  	let wantToReadBooks ;
  	let readBooks ;*/
    if(books!=null)
    {
      const currentlyReadingBooks = books.filter(book => book.shelf==="currentlyReading");
      const wantToReadBooks = books.filter(book => book.shelf==="wantToRead");
      const readBooks = books.filter(book => book.shelf==="read");
      console.log(books,currentlyReadingBooks,wantToReadBooks,readBooks);
      return (
      <Router>
      <Switch>
      <div className="app">
        <Route path="/search">
        <SearchPage searchPageState={this} shelfFunc={this.updateShelf} booksFullList={this.state.booksFullList}/> 
      	</Route>
    	<Route path="/">
         <div className="list-books">
            <PageTitle/>
            <Shelves shelfFunc={this.updateShelf} currentlyReadingBooks={currentlyReadingBooks} wantToReadBooks={wantToReadBooks} readBooks={readBooks}/>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
		</Route>
        }
      </div>
	  </Switch>
 	  </Router>
    )
    }else{
    return (
      <div className="app">
        <div className="list-books">
            <PageTitle/>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>)
        }
      </div>
		)
    }
    
  }
  async componentDidMount (){
let resp;
    try {
  resp = await BooksAPI.getAll();
console.log(resp)
this.setState({booksFullList:resp});
console.log(this.state.booksFullList)
} catch (error) {
  console.error(error);
}
    
	
}
}

export default BooksApp;
