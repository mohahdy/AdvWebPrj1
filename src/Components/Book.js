import React from 'react';

class Book extends React.Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {value:"none"}
  handleChange(book,event) {    
    this.setState({value: event.target.value});  
    this.props.shelfFunc(book,event.target.value)                     
                         }
render(){
  const id=this.props.book.id;
  const thumbnail = (this.props.book.imageLinks!==undefined)?this.props.book.imageLinks.thumbnail:"";
  return(
   
  					  <li key={id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
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
                      
  componentDidMount(){
   this.props.book.shelf?this.setState({value:this.props.book.shelf}):this.setState({value:"none"});
                        }
}

export default Book;