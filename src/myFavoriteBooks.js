
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './myFavoriteBooks.css';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { withAuth0 } from '@auth0/auth0-react';
require('dotenv').config();

class MyFavoriteBooks extends React.Component {

  constructor(props){
    super(props);
    this.state=({
      resultsBook:[],
    });
  }
  async componentDidMount(){

      let serverRoute = process.env.REACT_APP_SERVER
    // let bookReqUrl= 'http://localhost:3003/books?email=mariam.mohannad98@gmail.com';
    // let bookReqUrl= 'http://localhost:3003/books?email=ahmadabuosbeh20@gmail.com';

    let bookReqUrl= `${serverRoute}/books?email=${this.props.auth0.user.email}`;
    
    const resultsBook = await axios.get(bookReqUrl);

    this.setState({
        
      resultsBook:resultsBook.data[0].books,
    
    })
    }
    



  render() {
    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        {this.state.resultsBook.map(item=>{
          return (
            <>
            <h1>{item.bookTitle}</h1>
           <img src={item.bookImage} alt ='' style={{width: "500px"}}></img>
           <p>{item.bookDescription}</p>
            </>
          )
           
   
        })}
        {/* <h1>{this.state.resultsBook.bookTitle}</h1> */}
        {/* <h1>{this.state.resultsBook.bookTitle}</h1>
        <img src={this.state.resultsBook.bookImage} alt =''></img>
        <p>{this.state.resultsBook.bookDescription}</p> */}

        {/* <h1>{this.state.resultsBook.books[1].bookTitle}</h1>
        <img src={this.state.resultsBook.books[1].bookImage} alt =''></img>
        <p>{this.state.resultsBook.books[1].bookDescription}</p> */}

      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);