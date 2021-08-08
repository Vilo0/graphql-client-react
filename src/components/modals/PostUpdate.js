import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import FileUpload from "../FileUpload";

const initialState = {
    id: "",
    content: "",
    image: {
        url: "https://via.placeholder.com/200x200.png?text=Post",
        public_id: "123",
    },
};

const PostUpdateModal = ({ show, onClose, postModal, postUpdate }) => {
    
    const [loading, setLoading] = useState(false);

    const [values, setValues] = useState(initialState);

    const handleChange = (e) => {
        e.preventDefault();
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const { content } = values;

    const handleSubmit = () => {
        setLoading(true);
        const id =  values.id;
        delete values.id;
        postUpdate({ variables: { id: id, input: values } });
        setLoading(false);
        onClose();
        toast.success("Post updated");
    }

    useEffect(() => {
        if(postModal) {
            const dataModal = {
                id: postModal?._id,
                content: postModal?.content,
                image: {
                    url: postModal?.image?.url,
                    public_id: postModal?.image?.public_id,
                },
            }
            setValues(dataModal);
        }
    }, [postModal])

    const updateForm = () => (
        <>
          <div className="form-group">
            <textarea
              value={content}
              onChange={handleChange}
              name="content"
              rows="5"
              className="md-textarea form-control"
              placeholder="Write something cool"
              maxLength="150"
              disabled={loading}
            ></textarea>
          </div>
        </>
      );

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{loading ? <h4 className="text-danger">Loading</h4> : <h4>Post Update</h4> }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FileUpload
                        values={values}
                        loading={loading}
                        setValues={setValues}
                        setLoading={setLoading}
                        singleUpload={true}
                    />
                    { updateForm() }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} disabled={loading || !content}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PostUpdateModal;