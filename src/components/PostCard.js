import React from "react";
import Image from "./Image";
import { Link } from "react-router-dom";

const PostCard = ({ post, onShow, onShowDelete, onShowUpdate, postModal, email }) => {

  const { image, content } = post;

  const handleShow = (post) => {
    onShow()
    postModal(post)
  }

  const handleUpdate = (post) => {
    onShowUpdate()
    postModal(post)
  }

  const handleDelete = (post) => {
    onShowDelete()
    postModal(post)
  }

  return (
    <div className="card text-center" style={{ minHeight: "375px " }}>
      <div className="card-body">
        <Image image={image} />
        <h4 className="text-primary">@{post.postedBy.username}</h4>
        <hr />
        <small>{content}</small>
      </div>
      { (email === post.postedBy.email) && (
        <div className="row">
          <div className="col-4">
            <button onClick={() => handleShow(post)} className="btn btn-primary" type="button">Detalle</button>
          </div>
          <div className="col-4">
            <button onClick={() => handleUpdate(post)} className="btn btn-warning" type="button">Editar</button>
          </div>
          <div className="col-4">
            <button onClick={() => handleDelete(post)} className="btn btn-danger" type="button">Borrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
