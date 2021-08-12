import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/react-hooks";
import FileUpload from "../../components/FileUpload";
import { POST_CREATE, POST_DELETE, POST_UPDATE } from "../../graphql/mutations";
import { POSTS_BY_USER } from "../../graphql/queries";
import PostCard from "../../components/PostCard";
import PostDeleteModal from "../../components/modals/PostDelete";
import { AuthContext } from "../../context/authContext";
import PostModalShow from "../../components/modals/PostShow";
import PostUpdateModal from "../../components/modals/PostUpdate";

const initialState = {
  content: "",
  image: {
    url: "https://via.placeholder.com/200x200.png?text=Post",
    public_id: "123",
  },
};

const Post = () => {
  let emailUser = null;
  const context = useContext(AuthContext);
  
  if(context) {
      if (context.state.user) {
          const { email } = context.state.user;
          emailUser = email;
      }
  }
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [postModal, setPostModal] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleShowUpdate = () => setShowUpdate(true);
  const handleCloseUpdate = () => setShowUpdate(false);

  const [values, setValues] = useState(initialState);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(6);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");
  const [postId, setPostId] = useState("");

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

  const [postUpdate] = useMutation(POST_UPDATE, {
    // read query from cache / write query to cache
    update: (cache, { data: { postUpdate } }) => {
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
                    posts: postsByUser.posts,
                },
            },
        });
    },
    onError: (err) => console.log(err.graphqlQLError[0].message),
});

const [postDelete] = useMutation(POST_DELETE, {
    // read query from cache / write query to cache
    update: (cache, { data: { postDeleted } }) => {
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
            posts: postsByUser.posts.filter((post) => post._id !== postId)
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


  const handleLimit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setPage(1);
    setLimit(parseInt(e.target.value));
  }

  const handleSearch = (e) => {
      setPage(1);
      setSearch(e.target.value);
  }

  const handleSubmitInput = (e) => {
      e.preventDefault();
      console.log("entro al handleSubmit");
      setResult(search);
  }

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
      <div className="row">

          <div className="col-12">
              <form className="form-inline mt-5 float-right" onSubmit={handleSubmitInput}>
                  <div className="form-group my-2 my-lg-0 mr-3">
                      <input
                          className="form-control mr-sm-2"
                          type="search"
                          name="search"
                          onChange={handleSearch}
                          value={search}
                          placeholder=""
                          aria-label="Search"
                      />
                      <button
                          className="btn btn-outline-success my-2 my-sm-0"
                          type="submit"
                      >
                          <span>Search</span>
                          {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                          </svg> */}
                      </button>
                  </div>
                  <div className="form-group">
                      <select className="custom-select" onChange={handleLimit}>
                          <option value="">N° por página</option>
                          <option value="3">3</option>
                          <option value="6">6</option>
                          <option value="9">9</option>
                          <option value="12">12</option>
                      </select>
                  </div>
              </form>          
          </div>

        { myData &&
          myData.postsByUser.posts.map((post) => (
            <div className="col-md-4 pt-5" key={post._id}>
              <PostCard post={post}  
                      onShow={handleShow}
                      onShowDelete={handleShowDelete} 
                      onShowUpdate={handleShowUpdate} 
                      postModal={setPostModal} 
                      email={emailUser} />
            </div>
          )) }
      </div>

      <div className="row">
            <div className="col-12 text-center pt-5">
                { myData && (page <= myData.postsByUser.pages && page > 1) && (
                        <button onClick={() => setPage(pageCount => pageCount - 1)} className="btn btn-primary float-left" type="button">Prev Page</button>       
                    )
                }
            
                { myData && (page != myData.postsByUser.pages) && (
                    <button onClick={() => setPage(pageCount => pageCount + 1)} className="btn btn-primary float-right" type="button">Next Page</button>     
                )  
                } 
            </div>
        </div>

      { show && (
          <PostModalShow show={show} onClose={handleClose} postModal={postModal} />
      ) }
      { showDelete && (
          <PostDeleteModal show={showDelete} onClose={handleCloseDelete} postModal={postModal} postDelete={postDelete} setPostId={setPostId} />
      ) }
      { showUpdate && (
          <PostUpdateModal show={showUpdate} onClose={handleCloseUpdate} postModal={postModal} postUpdate={postUpdate} />
      ) }
    </div>
  );
};

export default Post;
