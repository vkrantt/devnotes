import React from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import Input from '../../components/input/Input'

const Create = () => {
    return (
        <Container>
            <Row>
                <Col lg="8" md="12" sm="12" className="m-auto mb-5">
                    <Form>
                        <Row className="mb-3">
                            <h5 className="text-blue">Create new note</h5>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Input label="Note title" type="text" />
                            </Form.Group>
                        </Row>

                        <FloatingLabel label="Description">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '300px' }}
                                className="border-muted rounded-0 shadow-sm border-2"
                            />
                        </FloatingLabel>

                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            label="Social share"
                            className='mt-2'
                        />

                        <Button variant="none" className="bg-blue rounded-0 px-4 text-light mt-4" type="submit">
                            Post
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Create