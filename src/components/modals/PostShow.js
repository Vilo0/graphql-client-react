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
                    <img 
                        src={postModal.image.url}
                        key={postModal.image.public_id}
                        alt={postModal.image.public_id}
                        style={{ height: "100px" }}
                        className="img-thumbnail mb-4"
                    />
                    <p>Content</p>
                    <p><small>{postModal.content}</small></p>
                    <br/>
                    <p>Posted By</p>
                    <p><small>@{ postModal.postedBy.username } - ({ postModal.postedBy.email })</small></p>
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