import React, { useState, useMemo, useContext } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/react-hooks";
import omitDeep from "omit-deep";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import UserProfile from "../../components/forms/UserProfile";
import FileUpload from "../../components/FileUpload";

const Profile = () => {
  const { state } = useContext(AuthContext);
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    about: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);

  useMemo(() => {}, []);

  // destructure
  const { username, name, email, about, images } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {};

  const fileResizeAndUpload = (event) => {};

  const handleImageRemove = (id) => {};

  /*const profileUpdateForm = () => (

  );*/

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-12 pb-3">
          {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Profile</h4>}
        </div>

        <FileUpload setValues={setValues} setLoading={setLoading} values={values} loading={loading} />
      </div>
      <UserProfile {...values} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading }/>
    </div>
  );
};

export default Profile;
