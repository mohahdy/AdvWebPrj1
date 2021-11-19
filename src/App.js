import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ErrorHandler from './Components/ErrorHandler';  
import PageTitle from './Components/PageTitle'
import SearchPage from './Components/SearchPage'
import Shelves from './Components/Shelves'
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
  bookIndexByID = (bookID)=>(this.state.booksFullList.find(({id})=>id === bookID))
  cleanBooksList(){
    this.setState({ booksFullList: this.state.booksFullList.filter(book=>book.shelf!=="none") });
  }
  updateShelf = async (bk, targetShelf) => {
    this.setState({
      booksFullList: this.state.booksFullList.map(book => {
        if(bk.id === book.id) book.shelf = targetShelf;
        return book;
      }
      )
    },this.cleanBooksList);
    const bookIndex = this.bookIndexByID(bk.id)
    if(bookIndex===undefined){ 
      bk.shelf = targetShelf;
      this.setState({ booksFullList: [...this.state.booksFullList, bk] }, this.cleanBooksList);

     // this.setState({ booksFullList: [...this.state.booksFullList, bk] }) //simple value
    }

    try {
      await BooksAPI.update(bk, targetShelf);
    } catch (error) {
      console.error(error);
    }
  }

  
  render() {
    const books = this.state.booksFullList;

    if (books != null) {
      const currentlyReadingBooks = books.filter(book => book.shelf === "currentlyReading");
      const wantToReadBooks = books.filter(book => book.shelf === "wantToRead");
      const readBooks = books.filter(book => book.shelf === "read");
      return (
        <Router>
         
            <div className="app">
            <Switch>
              <Route path="/search">
                <SearchPage shelfFunc={this.updateShelf} books={this.state.booksFullList}/>
              </Route>
              <Route exact path="/">
                <div className="list-books">
                  <PageTitle />
                  <Shelves shelfFunc={this.updateShelf} currentlyReadingBooks={currentlyReadingBooks} wantToReadBooks={wantToReadBooks} readBooks={readBooks} />
                  <div className="open-search">
                    <Link to="/search">
                      <button>Add a book</button>
                    </Link>
                  </div>
                </div>
              </Route>
              </Switch>
            </div>
          
        </Router>
      )
    } else {
      return (
        <ErrorHandler>
        <div className="app">
          <div className="list-books">
            <PageTitle />
            <div className="open-search">
              <button>Add a book</button>
            </div>
          </div>)
        
        </div>
        </ErrorHandler>
      )
    }
  }

  async componentDidMount() {
    let resp;
    try {
      resp = await BooksAPI.getAll();
      this.setState({ booksFullList: resp });
    } catch (error) {
      console.error(error);
    }


  }
  
}

export default BooksApp;
