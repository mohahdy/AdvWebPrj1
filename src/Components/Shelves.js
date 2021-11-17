import React from 'react';
import Shelf from './Shelf'

class Shelves extends React.Component {
render (){
 return (
  <div className="list-books-content">
          <div>
          <Shelf booksList={this.props.currentlyReadingBooks}  shelfTitle="Currently Reading" shelfFunc={this.props.shelfFunc}/>
  				<Shelf booksList={this.props.wantToReadBooks}  shelfTitle="Want To Read" shelfFunc={this.props.shelfFunc}/>
  				<Shelf booksList={this.props.readBooks}  shelfTitle="Read" shelfFunc={this.props.shelfFunc}/>
  			  </div>
  </div>
                )}
}

export default Shelves;