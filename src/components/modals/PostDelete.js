import React from "react";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";


const PostUpdateModal = ({ show, onClose, postModal, postDelete, setPostId }) => {
    const handleConfirmDelete = async (id) => {
      await setPostId(id);
      postDelete({ variables: { id } });
      onClose();
      toast.success("Post deleted");
    }

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure to delete the post:</p>
                    <p><b>{ postModal?.content }</b>?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmDelete(postModal?._id)}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
  
  export default PostUpdateModal;