import React from 'react';
import Book from'./Book';
class Shelf extends React.Component {
render (){
return (
<div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
{this.props.booksList.map((book) =>(  <Book key={book.id} book={book} shelfFunc={this.props.shelfFunc}/>
  					 ))}
                      
                    </ol>
                  </div>
                </div>  
)
}
}

export default Shelf;