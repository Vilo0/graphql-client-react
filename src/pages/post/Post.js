import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/react-hooks";
import FileUpload from "../../components/FileUpload";
import { POST_CREATE } from "../../graphql/mutations";
import { POSTS_BY_USER } from "../../graphql/queries";
import PostCard from "../../components/PostCard";
import PostDeleteModal from "../../components/modals/PostDelete";
import { AuthContext } from "../../context/authContext";

const initialState = {
  content: "",
  image: {
    url: "https://via.placeholder.com/200x200.png?text=Post",
    public_id: "123",
  },
};

const Post = () => {
  const context = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [postModal, setPostModal] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  //query
  const { data: myData } = useQuery(POSTS_BY_USER, { variables: { limit, page } });

  // destrecture
  const { content } = values;


  // mutation
  const [postCreate] = useMutation(POST_CREATE, {
    // read query from cache / write query to cache
    update: (cache, { data: { postCreate } }) => {
      // read Query from cache
      const { postsByUser } = cache.readQuery({
        query: POSTS_BY_USER,
        variables: { limit, page }
      });
      // write Query to cache
      cache.writeQuery({
        query: POSTS_BY_USER,
        variables: { limit, page },
        data: {
          postsByUser: {
            __typename: "PostInfo",
            posts: [postCreate, ...postsByUser.posts],
          }
          // postsByUser: [postCreate, ...postsByUser],
        },
      });
    },
    onError: (err) => console.log(err.graphqlQLError[0].message),
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    postCreate({ variables: { input: values } });
    setValues(initialState);
    setLoading(false);
    toast.success("Post created");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const createForm = () => (
    <form onSubmit={handleSubmit}>
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

      <button
        className="btn btn-primary"
        type="submit"
        disabled={loading || !content}
      >
        Post
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading</h4> : <h4>Create</h4>}

      <FileUpload
        values={values}
        loading={loading}
        setValues={setValues}
        setLoading={setLoading}
        singleUpload={true}
      />

      <div className="row">
        <div className="col">{createForm()}</div>
      </div>
      <hr />
      <div className="row p-5">
        { myData &&
          myData.postsByUser.posts.map((post) => (
            <div className="col-md-6 pt-5" key={post._id}>
              <PostCard post={post} onShow={handleShow} postModal={setPostModal} />
            </div>
          )) }
      </div>

      <PostDeleteModal show={show} onClose={handleClose} postModal={postModal} limit={limit} page={page} />
    </div>
  );
};

export default Post;
