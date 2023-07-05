import React from 'react'
import { Card } from 'react-bootstrap'

const SoicalCard = ({note}) => {
    return (
        <div>
            <Card className="border-0 border-bottom border-blue border-3 rounded-0">
                <Card.Body className='px-0'>
                    <blockquote className="blockquote mb-0">
                        <p>
                        {note?.description}
                        </p>
                        <footer className="blockquote-footer text-blue">
                            John Doe experts in <cite title="Source Title">Engineering</cite>
                        </footer>
                        <h6 className="text-muted">
                            Last updated 3 mins ago
                        </h6>
                    </blockquote>
                </Card.Body>
            </Card>
        </div>
    )
}

export default SoicalCard