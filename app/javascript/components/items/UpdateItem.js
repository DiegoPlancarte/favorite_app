import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import useRead from '../hooks/useRead'
import useUpdate from '../hooks/useUpdate'

const EditItem = (props) => {

  const [ item, setItem, itemLoading, itemErrors ] = useRead(`items/${props.match.params.id}`)
  const [ updateItem ] = useUpdate(`items/${props.match.params.id}`, props, `iteminfo/${props.match.params.id}`)

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

  if (itemLoading) {
    return <div>Loading...</div>
  }

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