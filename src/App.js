import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from "react";
import Popup from "./Popup";
// https://64d65213754d3e0f1361f357.mockapi.io/todo

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todo, setTodo] = useState("");
  const [editData, setEditData] = useState(null);
  const [editState, setEditState] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const getData = () => {
    setIsLoading(true);
    axios
      .get("https://64d65213754d3e0f1361f357.mockapi.io/todo")
      .then((resp) => {
        setData(resp.data);
        setIsPopupOpen(false);
      })
      .then(() => setIsLoading(false));
  };
  useEffect(() => {
    getData();
  }, []);

  const postData = (e) => {
    e.preventDefault();
    if (todo !== "") {
      setIsLoading(true);
      axios
        .post("https://64d65213754d3e0f1361f357.mockapi.io/todo", { todo })
        .then(() => {
          getData();
          setTodo("");
          setIsLoading(false);
        });
    }
  };

  const deleteData = (id) => {
    setIsLoading(true);
    axios
      .delete(`https://64d65213754d3e0f1361f357.mockapi.io/todo/${id}`)
      .then(() => {
        getData();
        setIsLoading(false);
      });
  };

  const deleteAllData = async () => {
    // setIsLoading(true);
    // axios
    //   .delete("https://64d65213754d3e0f1361f357.mockapi.io/todo")
    //   .then(() => {
    //     getData();
    //     setIsLoading(false);
    //   });
    setIsLoading(true);
    const deletePromises = data.map((item) =>
      axios.delete(
        `https://64d65213754d3e0f1361f357.mockapi.io/todo/${item.id}`
      )
    );

    Promise.all(deletePromises)
      .then(() => {
        setIsPopupOpen(false);
      })
      .finally(() => {
        getData();
        setIsLoading(false);
      });
  };

  const handleEdit = (obj) => {
    setEditData(obj);
  };

  const putData = (e) => {
    e.preventDefault();
    if (editData.todo !== "") {
      setIsLoading(true);
      axios
        .put(
          `https://64d65213754d3e0f1361f357.mockapi.io/todo/${editData.id}`,
          {
            todo: editData.todo,
          }
        )
        .then(() => {
          getData();
          setEditData({});
          setEditState(false);
          setIsLoading(false);
        });
    }
  };
  return (
    <div className="App">
      {isPopupOpen && (
        <Popup setIsPopupOpen={setIsPopupOpen} deleteAllData={deleteAllData} />
      )}
      {!editState && (
        <form className="formm" onSubmit={postData}>
          <input
            className="ipField"
            placeholder="Enter Todo..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />

          <button className="btn" type="submit">
            Add{" "}
          </button>
        </form>
      )}

      {editState && (
        <form className="formm" onSubmit={putData}>
          <input
            className="ipField"
            placeholder="Enter Todo..."
            value={editData.todo}
            onChange={(e) => setEditData({ ...editData, todo: e.target.value })}
          />

          <button className="btn" type="submit">
            Update{" "}
          </button>
        </form>
      )}

      {isLoading ? (
        <h2 className="loader">Loading...</h2>
      ) : (
        data &&
        data.map((data) => (
          <div className="insideMap" key={data.id}>
            <h5>
              {window.innerWidth > 762
                ? data.todo
                : data.todo.length > 15
                ? data.todo.slice(1, 15) + " ..."
                : data.todo}
            </h5>
            <div className="btndiv">
              <button
                className="betnn"
                onClick={() => {
                  handleEdit(data);
                  setEditState(true);
                }}
              >
                Edit
              </button>
              <button className="betn" onClick={() => deleteData(data.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {data.length >= 2 && !isLoading && (
        <button
          className="btnn"
          onClick={() => {
            setIsPopupOpen(true);
          }}
        >
          Delete All Todo
        </button>
      )}
    </div>
  );
};

export default App;
