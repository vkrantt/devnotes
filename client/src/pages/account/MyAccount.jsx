import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Input from '../../components/input/Input'
import toast, { Toaster } from 'react-hot-toast';
import { toastConfig } from '../../utils/config'

const MyAccount = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Profile Updated !', toastConfig);
    }

    return (
        <Container>
            <Row>
                <Col lg="8" md="12" sm="12" className="m-auto mb-5">
                    <Form>



                        <Row className="mb-3">
                            <u className="text-primary">Must details</u>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} lg="6" sm="12">
                                <Input label="First name" type="text" placeholder="Enter first name" />
                            </Form.Group>

                            <Form.Group as={Col} lg="6" sm="12">
                                <Input label="Last name" type="text" placeholder="Enter last name" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} lg="6" sm="12">
                                <Input label="Email Address" type="email" placeholder="Enter email address" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group as={Col} lg="6" sm="12">
                                <Input label="Experts in" type="text" placeholder="Experts in (Must)" />
                            </Form.Group>
                        </Row>



                        <Row className="mb-3">
                            <u className="text-primary">Change password ?</u>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} lg="6" sm="12">
                                <Input label="Existing password" type="password" placeholder="Enter existing password" />
                            </Form.Group>

                            <Form.Group as={Col} lg="6" sm="12">
                                <Input label="New Password" type="password" placeholder="Enter new password" />
                            </Form.Group>
                            <Form.Group as={Col} lg="6" sm="12">
                                <Input label="Confirm password" type="password" placeholder="Enter password again" />
                            </Form.Group>
                        </Row>



                        <Row className="mb-3">
                            <u className="text-primary">Optional</u>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} lg="6" md="6" sm="12" >
                                <Input label="City" type="text" placeholder="Enter city" />
                            </Form.Group>

                            <Form.Group as={Col} lg="6" md="6" sm="12">
                                <Input label="State" type="text" placeholder="Enter State" />
                            </Form.Group>

                        </Row>



                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            label="Set every post socially shared by default"
                        />



                        <Button variant="none" className="bg-blue rounded-0 px-4 text-light mt-4" type="submit" onClick={handleSubmit}>
                            Update profile
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </Container>
    )
}

export default MyAccount