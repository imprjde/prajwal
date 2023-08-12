import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const App = () => {
  const [fName, setFname] = useState("");
  const [sName, setSname] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [modal, setModal] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const YesStyles = {
    marginTop: "1rem",
    height: "2rem",
    color: "white",
    backgroundColor: "red",
    marginLeft: "1rem",
    marginRight: "1rem",
  };
  const NoStyles = {
    marginTop: "1rem",
    height: "2rem",
    color: "white",
    backgroundColor: "green",
    marginRight: "1rem",
  };

  const validate = () => {
    if (
      fName.trim() !== "" &&
      sName.trim() !== "" &&
      age.trim() !== "" &&
      !isNaN(Number(age))
    ) {
      return true;
    }
    return false;
  };

  const handleBgColor = () => {
    if (editIndex === -1) {
      return "orange";
    }
    return "aqua";
  };

  const handleAdd = () => {
    if (validate()) {
      if (editIndex !== -1) {
        let editData = [...data];
        editData[editIndex] = { firstName: fName, secondName: sName, age: age };
        setData(editData);
        setEditIndex(-1);
      } else {
        setData([...data, { firstName: fName, secondName: sName, age: age }]);
      }
      setFname("");
      setSname("");
      setAge("");
      inputRef.current.focus();
    }
  };

  const handleDelete = (index) => {
    let deletedData = data.filter((itm, inx) => inx !== index);
    setData(deletedData);
  };

  const handleEdit = (index) => {
    inputRef.current.focus();
    setFname(data[index].firstName);
    setSname(data[index].secondName);
    setAge(data[index].age);
    setEditIndex(index);
  };
  return (
    <div className="App">
      <div className="ip">
        <input
          ref={inputRef}
          value={fName}
          className="input"
          placeholder="First Name..."
          onChange={(e) => setFname(e.target.value)}
        />
        <input
          value={sName}
          className="input"
          placeholder="Second Name..."
          onChange={(e) => setSname(e.target.value)}
        />
        <input
          value={age}
          className="input"
          placeholder="Age..."
          onChange={(e) => setAge(e.target.value)}
        />
        <button
          className="btn"
          onClick={handleAdd}
          style={{ backgroundColor: handleBgColor() }}
        >
          {editIndex === -1 ? "Add" : "Update"}
        </button>
      </div>
      <div>
        {/* Map */}
        {data.map((items, index) => (
          <div className="map" key={index}>
            <h4 className="h">{items.firstName}</h4>
            <h4 className="h">{items.secondName}</h4>
            <h4 className="h">{items.age}</h4>
            <>
              <>
                <button className="editBtn" onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button className="btn" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </>
            </>
          </div>
        ))}
        {/* Map */}
      </div>
      {data.length > 3 && (
        <button className="btn" onClick={() => setModal(true)}>
          Delete All
        </button>
      )}

      {modal && (
        <div className="modal">
          <h3>Are you sure you want to Delete All</h3>
          <button
            className="btn"
            style={YesStyles}
            onClick={() => {
              setData([]);
              setModal(false);
            }}
          >
            YES
          </button>
          <button
            className="btn"
            style={NoStyles}
            onClick={() => setModal(false)}
          >
            NO
          </button>
        </div>
      )}
    </div>
  );
};

export default App;


////////////////////////////////////////// Retun Template /////////////////////////////
<div className="App">
  <div className="ip">
    <input className="input" />
    <input className="input" />
    <input className="input" />
    <button className="btn">Add</button>
  </div>
  <div>
    {/* Map */}
    <div className="map">
      <h4 className="h"></h4>
      <h4 className="h"></h4>
      <h4 className="h"></h4>
      <>
        <>
          <button className="editBtn">Edit</button>
          <button className="btn">Delete</button>
        </>
      </>
    </div>
    {/* Map */}
  </div>
  <button className="btn">Delete All</button>
</div>;
