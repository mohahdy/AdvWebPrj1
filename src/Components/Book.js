import React from 'react';

class Book extends React.Component{
  constructor(props) {
    super(props);
    this.props.book.shelf?this.state = {value:this.props.book.shelf}:this.state={value:"none"};
    this.handleChange = this.handleChange.bind(this);
    //console.log(`this.state.value ${this.state.value}`);
  }
  handleChange(book,event) {    
    //console.log(book,event.target.value);
    this.setState({value: event.target.value});  
    this.props.shelfFunc(book,event.target.value)                     
                         }
render(){
 //console.log(`inside Book Component this.props.book is ${JSON.stringify(this.props.book)}`)
  const id=this.props.book.id;
  return(
   
  					  <li key={id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
            <select value={this.state.value} onChange={(event)=>this.handleChange(this.props.book,event)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{this.props.book.title}</div>
                          <div className="book-authors">{this.props.book.authors}</div>
                        </div>
                      </li>);
                      }
                      
  
}

export default Book;