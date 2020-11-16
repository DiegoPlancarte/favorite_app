import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import useCreate from '../hooks/useCreate'
import useForm from '../hooks/useForm'

const CreateItem = (props) => {

  const [ createItem ] = useCreate('items', props, 'allitems')
  // const [ item, setItem ] = useState({})
  const [ item, handleInputChange, handleSubmit ] = useForm()

  // const handleSubmit = (event) => {
  //   if(event) {
  //     event.preventDefault();
  //   }
  //   createItem(item)
  // }
  
  // const handleInputChange = (event) => {
  //   event.persist();
  //   setItem(item=>({...item, user_id: props.current_user.id }))
  //   setItem(item => ({...item, [event.target.name]: event.target.value}));
  // }

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