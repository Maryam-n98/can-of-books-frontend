'use strict';
import React from 'react';
import { Form, Button ,Modal} from 'react-bootstrap'


class BookFormModal extends React.Component {
  
    constructor(props){
        super(props);
        this.state={
            show : false,
        };
    }


    showModalFunction=()=>{
          this.setState({
              show: true,
          })
    }

    hideModalFunction=()=>{
        this.setState({
            show: false,
        })
  }
  submitDataFuctionProps2 =(e)=>{
    this.props.submitDataFuctionProps(e)
    this.setState({
        show: false,
    })
  }
  

    render() {

        return (
            <>
                <Button variant="outline-secondary" onClick={this.showModalFunction}>Add Book</Button>
                <Modal
                    show={this.state.show}
                    onHide={this.hideModalFunction}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Custom Modal Styling
          </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={this.submitDataFuctionProps2}>
                    <Form.Group>
                    <Form.Label>Book Title :</Form.Label>
                        <Form.Control  as="select" size="lg"  name="bookTitle">
                            <option>Mathematics Book</option>
                            <option>Good Economics for Hard Times</option>
                            <option>Infinite Powers</option>
                            <option>How to Solve It</option>

                        </Form.Control>
                        <br />
                        <Form.Label>Image URL :</Form.Label>
                        <Form.Control size="lg" as="select" name="bookUrl">
                            <option>https://www.amazon.co.jp/images/I/51RIZ1XDSVL._AC_UL600_SR465,600_.jpg</option>
                            <option>https://images-na.ssl-images-amazon.com/images/I/81MIp1V-9XL.jpg</option>
                            <option>https://images-na.ssl-images-amazon.com/images/I/51b34twlPHL._SX329_BO1,204,203,200_.jpg</option>
                            <option>https://images-na.ssl-images-amazon.com/images/I/41w52FCezEL._SX320_BO1,204,203,200_.jpg</option>

                        </Form.Control>
                        <br />
                        <Form.Label>Book Description :</Form.Label>
                        <Form.Control size="lg" as="select" name="bookDesecription">
                            <option>Our Preschool Math Workbook for Toddlers Ages 2-4 is a great way for your little one to learn basic mathematical skills such as number recognition, number tracing and counting. We’ve put together a variety of different activities that are both fun and educational! We’ve got little ones ourselves and know how important (and difficult!) it is to keep their attention!</option>
                            <option>Better Answers to Our Biggest Problems is a non-fiction book by Abhijit V. Banerjee and Esther Duflo, both professors of Economics at MIT. It was published on November 12, 2019 by PublicAffairs, Juggernaut Books and Allen Lane</option>
                            <option>Infinite Powers recounts how calculus tantalized and thrilled its inventors, starting with its first glimmers in ancient Greece and bringing us right up to the discovery of gravitational waves (a phenomenon predicted by calculus). Strogatz reveals how this form of math rose to the challenges of each age: how to determine the area of a circle with only sand and a stick; how to explain why Mars goes “backwards” sometimes; how to make electricity with magnets; how to ensure your rocket doesn’t miss the moon; how to turn the tide in the fight against AIDS.</option>
                            <option>A perennial bestseller by eminent mathematician G. Polya, How to Solve It will show anyone in any field how to think straight. In lucid and appealing prose, Polya reveals how the mathematical method of demonstrating a proof or finding an unknown can be of help in attacking any problem that can be "reasoned" out―from building a bridge to winning a game of anagrams. Generations of readers have relished Polya's deft―indeed, brilliant―instructions on stripping away irrelevancies and going straight to the heart of the problem.</option>

                        </Form.Control>
                        <Button variant="outline-warning" type='sumbit' >submit</Button>
                    </Form.Group>
                </Form>
                    </Modal.Body>
                </Modal>
               
            </>
        )
    }
}


export default BookFormModal;