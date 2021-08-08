import React from "react";
import { Modal, Button } from "react-bootstrap";

const PostModalShow = ({ show, onClose, postModal }) => {

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Show Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{ JSON.stringify(postModal) }</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PostModalShow;