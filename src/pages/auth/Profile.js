import React, { useState, useMemo, useContext } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/react-hooks";
// pending imports
import omitDeep from "omit-deep";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const { state } = useContext(AuthContext);
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    about: "",
    images: []
  });

  const [loading, setLoading] = useState(false);

  // pendings query

  useMemo(() => {
      
  }, []);

  // mutation

  // destrecture
  const { username, name, email, about, images } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {

  };

  const fileResizeAndUpload = (event) => {

  };

  /*const profileUpdateForm = () => (

  );*/

  return (
    <div className="container p-5">
        <div className="row">

        </div>
    </div>
  );



};

export default Profile;
