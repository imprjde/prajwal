import React, { useState, useRef } from "react";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const inputRef = useRef();

  const handleAdd = () => {
    if (editIndex !== -1) {
      const updatedData = [...data];
      updatedData[editIndex] = todo;
      setData(updatedData);
      setTodo("");
      setEditIndex(-1);
    } else {
      setData([...data, todo]);
      setTodo("");
    }
    inputRef.current.focus();
  };

  const handleDelete = (index) => {
    let filterData = data.filter((itm, indx) => indx !== index);
    setData(filterData);
  };

  const handleEdit = (index) => {
    setTodo(data[index]);
    setEditIndex(index);
    inputRef.current.focus();
  };
  const getBackgroundColor = () => {
    if (editIndex === -1) {
      return "orange";
    } else {
      return "aqua";
    }
  };

  return (
    <div className="App">
      <input
        ref={inputRef}
        value={todo}
        placeholder="Enter Todo..."
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        className="btn"
        onClick={handleAdd}
        style={{ backgroundColor: getBackgroundColor() }}
      >
        {editIndex === -1 ? "Add" : "Update"}
      </button>
      <div>
        {data.map((items, index) => (
          <div key={index} className="map">
            <h4>{items}</h4>
            <button className="editBtn" onClick={() => handleEdit(index)}>
              Edit
            </button>
            <button className="btn" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      {data.length > 2 && (
        <button className="btn" onClick={() => setData([])}>
          Delete All Todo
        </button>
      )}
    </div>
  );
};

export default App;

////////////////////////////////////////// Retun Template /////////////////////////////

<div>
  <div className="App">
    <input />
    <button className="btn">Add</button>
    <div>
      {/* Map */}
      <div className="map">
        <h4></h4>
        <button className="editBtn">Edit</button>
        <button className="btn">Delete</button>
      </div>
      {/* Map */}
    </div>
    <button className="btn">Delete All Todo</button>
  </div>
</div>;
