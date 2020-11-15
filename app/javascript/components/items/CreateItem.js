import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

const CreateItem = (props) => {

  const [ item, setItem ] = useState({})

  const handleSubmit = (event) => {
    if(event) {
      event.preventDefault();
    }
    createItem(item)
  }
  
  const handleInputChange = (event) => {
    event.persist();
    setItem(item=>({...item, user_id: userId() }))
    setItem(item => ({...item, [event.target.name]: event.target.value}));
  }

  const userId = () => {
    if (props.current_user) {
      return props.current_user.id
    } else {
      return null
    }
  }

  const createItem = (data) => {
    fetch(`/items`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': props.token
      },
      method: 'POST'
    })
    .then((resp) => {
      if (resp.ok) {
        setItem({})
        alert('Your blog has been created!')
        props.history.push(`/allitems`)
      }
    })
    .catch((err) => {
      if (err) {
        console.log(err)
      }
    })
  }

  return (
    <React.Fragment>
      <Container>
        <Row className="mb-4">
          <Col>
            <Form>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={ item.title || '' } onChange={ handleInputChange } placeholder="Enter title" />
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

export default CreateItem;