import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from "react";
// https://64d47620b592423e46942440.mockapi.io/crud

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [editState, setEditState] = useState(false);
  const [editArray, setEditArray] = useState({});
  const [editId, setEditID] = useState(null);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const getData = () => {
    axios
      .get("https://64d47620b592423e46942440.mockapi.io/crud")
      .then((resp) => {
        setData(resp.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const putData = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.city) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsLoading(true);
    axios
      .post("https://64d47620b592423e46942440.mockapi.io/crud", formData)
      .then(() => {
        getData();
        setIsLoading(false);
        setFormData({});
      });
  };

  const deleteData = (id) => {
    setIsLoading(true);
    axios
      .delete(`https://64d47620b592423e46942440.mockapi.io/crud/${id}`)
      .then(() => {
        getData();
      })
      .then(() => setIsLoading(false));
  };

  const handleEdit = (id) => {
    let singleData = data.find((item) => item.id === id);
    setEditArray(singleData);
    console.log(editArray);
  };

  const submitUpdatedData = (e) => {
    e.preventDefault();
    // if (editId !== null) {
    setIsLoading(true);
    axios
      .put(
        `https://64d47620b592423e46942440.mockapi.io/crud/${editId}`,
        editArray
      )
      .then(() => {
        getData();
        setIsLoading(false);
      });
    // }
    setEditState(false);
    // setEditID(null);
  };
  return (
    <div className="App">
      {!editState && (
        <form className="formm" onSubmit={putData}>
          <input
            placeholder="Name"
            name="name"
            value={formData.name || ""}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
          <input
            placeholder="Age"
            name="age"
            value={formData.age || ""}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
          <input
            placeholder="City"
            name="city"
            value={formData.city || ""}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
          <button className="btn">Submit</button>
        </form>
      )}

      {/* UPDATE FORM */}

      {editState && (
        <form className="formm" onSubmit={submitUpdatedData}>
          <input
            placeholder="Name"
            name="name"
            value={editArray.name || ""}
            onChange={(e) => {
              setEditArray({ todo: e.target.value });
            }}
          />
          <input
            placeholder="Age"
            name="age"
            value={editArray.age || ""}
            onChange={(e) =>
              setEditArray({ ...editArray, age: e.target.value })
            }
          />
          <input
            placeholder="City"
            name="city"
            value={editArray.city || ""}
            onChange={(e) =>
              setEditArray({ ...editArray, city: e.target.value })
            }
          />
          <button className="btn">Update</button>
        </form>
      )}

      {isLoading ? (
        <h2 style={{ color: "white" }}>Loading...</h2>
      ) : (
        data &&
        data.map((data) => (
          <div className="insideMap" key={data.id}>
            <h5>{data.name}</h5>
            <h5>{data.age}</h5>
            <h5>{data.city}</h5>
            <button
              className="betnn"
              onClick={() => {
                handleEdit(data.id);
                setEditState(true);
                setEditID(data.id);
              }}
            >
              Edit
            </button>
            <button className="betn" onClick={() => deleteData(data.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default App;
