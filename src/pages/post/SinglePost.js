import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { POST_SHOW } from "../../graphql/queries";
import { POST_UPDATE } from "../../graphql/mutations";

const initialState = {
    id: "",
    content: "",
    image_url: "",
}

export const SinglePost = () => {
    const { idPost } = useParams();
    const { loading, data } = useQuery(POST_SHOW, { variables: { id: idPost } });
    
    const [values, setValues] = useState(initialState);
    const [loadingForm, setLoading] = useState(false);
    const { id, content } = values;

    useMemo(() => {
        if (data) {
          console.log(data.postShow);
          setValues({
            ...values,
            id: data.postShow._id,
            content: data.postShow.content,
            image_url: data.postShow.image.url
          });
        }
    }, [data]);

    //useMutation
    const [postUpdate] = useMutation(POST_UPDATE, {
        update: ({ data: dataPost }) => {
          console.log("POST UPDATE MUTATION", dataPost);
          toast.success("Post updated");
        },
      });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        postUpdate({ variables: { id: values.id, input: { content: values.content } } });
        setLoading(false);
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    console.log(idPost);
    return (
        <div className="container p-5">
            {  loading ? <h3>Loading...</h3> :
                <div className="row">   
                    <div className="col-12">    
                        <h3>Actualizar Post</h3>
                    </div> 
                    <div className="col-12">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="hidden" name="id" value={id} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Description</label>
                                <textarea onChange={handleChange} className="form-control" id="content" name="content" rows="5" value={content}>
                                </textarea>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary" type="submit">Guardar Cambios</button>
                            </div>
                        </form>
                    </div>
                </div> }
        </div>
    )
}

export default SinglePost;
