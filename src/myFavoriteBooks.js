import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './myFavoriteBooks.css';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { withAuth0 } from '@auth0/auth0-react';
import BookFormModal from './BookFormModal';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Modal, Form} from 'react-bootstrap/'

require('dotenv').config();

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      resultsBook: [],
      bookTitle: '',
      bookUrl: '',
      bookDesecription: '',
      bookData: '',
      serverRoute: process.env.REACT_APP_SERVER,  
     showUpdatForm: false,
      index: '',

    });
  }





  submitDataFuction = async (event) => {
    event.preventDefault();
    // console.log('hellooo from submit');
    // console.log('event.target.bookTitle.value',event.target.bookTitle.value);
    await this.setState({
      bookTitle: event.target.bookTitle.value,
      bookUrl: event.target.bookUrl.value,
      bookDesecription: event.target.bookDesecription.value,
    })
    console.log('this.state.bookTitle', this.state.bookTitle);
    const bookData = {
      userEmail: this.props.auth0.user.email,
      bookTitle: this.state.bookTitle,
      bookUrl: this.state.bookUrl,
      bookDesecription: this.state.bookDesecription,
    }
    await this.setState({
      bookData: bookData,
    })

    //add book data to DB from frontend to backend by axios.post

    // let postReqUl =`${serverRoute}/addbook`,bookData
    console.log('this.state.bookData', this.state.bookData);

    const addBook = await axios.post(`${this.state.serverRoute}/addbook`, this.state.bookData);

    console.log('this.state.bookTitle', this.state.bookTitle);
    console.log('addBook', addBook);
    this.setState({
      resultsBook: addBook.data,
    })
  }


  //delete function
  deleteFunctoin = async (index) => {
    const userEmail = {
      userEmail: this.props.auth0.user.email,
    }
    console.log('userEmail', userEmail);
    console.log('index', index);
    let newArrAfterDeleteing = await axios.delete(`${this.state.serverRoute}/deletebook/${index}`, { params: userEmail })
    this.setState({
      resultsBook: newArrAfterDeleteing.data,
    })
  }
//show update form function
showUpdateForm = (index) => {
  console.log('hellooo from showupdatefunc');
  this.setState({
    showUpdatForm: true,
    index: index,
    bookTitle: this.state.resultsBook[index].bookTitle,
    bookUrl: this.state.resultsBook[index].bookImage,
    bookDesecription: this.state.resultsBook[index].bookDescription,

  })
  // console.log('this.state.showUpdateForm',this.state.showUpdatForm);
}

hideModalFunction = () => {
  this.setState({
    showUpdatForm: false,
  })
}

//update data fnction
updatDataFunction = async (event) => {
  event.preventDefault();
  const updatedData = {
    bookTitle: this.state.bookTitle,
    bookImage: this.state.bookUrl,
    bookDescription: this.state.bookDesecription,
    userEmail: this.props.auth0.user.email,
  }


  console.log('updatedData', updatedData);
  console.log('this.state.index', this.state.index);
  let updatedResponseFromDB = await axios.put(`${this.state.serverRoute}/updatebook/${this.state.index}`, updatedData)

  this.setState({
    showUpdatForm: false,
    resultsBook:updatedResponseFromDB.data,
  })

}

handleChangebookTitle =(e)=>{
  this.setState({
    bookTitle: e.target.value,
  })
}

handleChangebookUrl =(e)=>{
  this.setState({
    bookUrl: e.target.value,
  })
}

handleChangebookDesecription =(e)=>{
  this.setState({
    bookDesecription: e.target.value,
  })
}
  async componentDidMount() {

    let serverRoute = process.env.REACT_APP_SERVER
    // let bookReqUrl= 'http://localhost:3003/books?email=mariam.mohannad98@gmail.com';
    // let bookReqUrl= 'http://localhost:3003/books?email=ahmadabuosbeh20@gmail.com';

    let bookReqUrl = `${serverRoute}/books?email=${this.props.auth0.user.email}`;

    const resultsBook = await axios.get(bookReqUrl);



    this.setState({

      resultsBook: resultsBook.data[0].books,

    })
  }




  render() {
    return (
      
      <Jumbotron>
        <BookFormModal submitDataFuctionProps={this.submitDataFuction}></BookFormModal>

        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>

        {this.state.resultsBook.map((item, index) => {
          return (
            <>
              <div key={index}>

              <Card style={{ width: '40rem' }}>
                <Card.Body>
                  <Card.Title>  <h1>{item.bookTitle}</h1></Card.Title>
                <Card.Img src={item.bookImage} alt='' style={{ width: "500px" }} />
                  <Card.Text>
                  <p>{item.bookDescription}</p>
    </Card.Text>
                  <Button variant="outline-danger" onClick={() => this.deleteFunctoin(index)}>Delete</Button>
                  <Button onClick={() => this.showUpdateForm(index)}>Update</Button>
                </Card.Body>
              </Card>
              {this.state.showUpdatForm &&
                  <>
                    <Modal
                      show={this.state.showUpdatForm}
                      onHide={this.hideModalFunction}
                      dialogClassName="modal-90w"
                      aria-labelledby="example-custom-modal-styling-title"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                          Updat Your Book Data Now!
                      </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={this.updatDataFunction}>
                          <Form.Group>
                            <Form.Label>Book Title :</Form.Label>
                           
                              <Form.Control
                                type="text"
                                
                               
                                name="bookTitle"
                                value={this.state.bookTitle}
                                onChange={this.handleChangebookTitle}
                               
                              />
                           
                       
                            <br />
                            <Form.Label>Image URL :</Form.Label>
                            <Form.Control type="text" name="bookUrl" value={this.state.bookUrl} onChange={this.handleChangebookUrl}>

                            </Form.Control>
                            <br />
                            <Form.Label>Book Description :</Form.Label>
                            <Form.Control size="sm" type="text" name="bookDesecription" value={this.state.bookDesecription} onChange={this.handleChangebookDesecription}>

                            </Form.Control>
                            <Button type='submit' >Update !</Button>
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                    </Modal>

                  </>



                }
              </div>
            </>
          )


        })}
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);