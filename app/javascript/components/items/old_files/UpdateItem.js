import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import useRead from '../hooks/useRead'
import useUpdate from '../hooks/useUpdate'

const EditItem = (props) => {

  const [ item, setItem, itemLoading, itemErrors ] = useRead(`items/${props.match.params.id}`)
  const [ updateItem ] = useUpdate(`items/${props.match.params.id}`, props, `iteminfo/${props.match.params.id}`)
  // const [ item, setItem ] = useState([])

  // useEffect(() => {
  //   fetch(`/items/${props.match.params.id}`)
  //   .then((response)=>{
  //     if(response.status === 200){
  //         return(response.json())
  //       }
  //     })
  //     .then((item) => {
  //       setItem(item);
  //     })
  // }, []);

  const handleSubmit = (event) => {
    if(event) {
      event.preventDefault();
    }
    updateItem(item)
  }
  
  const handleInputChange = (event) => {
    event.persist();
    setItem(item => ({...item, [event.target.name]: event.target.value}));
  }

  // const editBlog = (data)=> {
  //   return fetch (`/items/${props.match.params.id}`, {
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-CSRF-TOKEN': props.token
  //     },
  //     method: 'PUT'
  //   })
  //   .then ((response)=> {
  //     if (response.ok){
  //       alert('Your item has been updated!')
  //       props.history.push(`/iteminfo/${props.match.params.id}`)
  //     }
  //   })
  // }

  return (
    <React.Fragment>
      <Container>
        <Row className="mb-4">
          <Col>
            <Form>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                  type="text" 
                  name="title" 
                  value={ item.title || '' } 
                  onChange={ handleInputChange } 
                  placeholder="Enter title" />
              </Form.Group>
              <Button variant="primary" onClick={ handleSubmit } type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default EditItem;