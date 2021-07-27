import React from "react";
import "./Form.css";

const Form = (props) => {
  return (
    <>
      <div clssName="">
        <div>
          <h1>Studend Info</h1>
        </div>
        <form action="">
          <div>
            <label>ID:</label>
            <input
              type="number"
              min="0"
              value={props.id}
              onChange={(e) => props.setId(e.target.value)}
            />
          </div>

          <div>
            <label>Name:</label>
            <input
              type="text"
              value={props.name}
              onChange={(e) => props.setName(e.target.value)}
            />
          </div>

          <div>
            <label>Maths:</label>
            <input
              type="number"
              min="0"
              value={props.maths}
              onChange={(e) => props.setMaths(e.target.value)}
            />
          </div>

          <div>
            <label>English:</label>
            <input
              type="number"
              min="0"
              value={props.english}
              onChange={(e) => props.setEnglish(e.target.value)}
            />
          </div>

          <div>
            <label>Science:</label>
            <input
              type="number"
              min="0"
              value={props.science}
              onChange={(e) => props.setScience(e.target.value)}
            />
          </div>
          <br />
          <div>
            <button
              className="saveResult"
              type="button"
              onClick={() => props.saveResult()}
            >
              Save Result
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
