import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => {
    return (
        <Container fluid className='bg-blue'>
            <Container className='bg-blue text-light d-flex justify-content-between py-4'>
                <p>1.0.0</p>
                <p>
                    &copy; 2023 <u>devshare</u>
                </p>
                <p>
                    Twitter
                </p>
            </Container>
        </Container>
    )
}

export default Footer