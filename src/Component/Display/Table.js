import "./Table.css";

const Table = (props) => {
  return (
    <>
      <input
        type="search"
        onChange={(e) => props.filter(e.target.value)}
        placeholder="Search Records"
      />
      <br />

      {props.savedData.length >= 1 ? (
        <div className="">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th> Name </th>
                <th> Maths </th>
                <th> English </th>
                <th> Science </th>
                <th> Total </th>
                <th> Percentage </th>
                <th> Result </th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {props.savedData.map((e) => {
                return (
                  <tr>
                    <td>{e.id}</td>
                    <td>{e.name}</td>
                    <td>
                      {" "}
                      <span
                        style={
                          e.maths >= 35
                            ? {
                                color: "black",
                              }
                            : {
                                color: "red",
                                fontWeight: "bold",
                              }
                        }
                      >
                        {" "}
                        {e.maths}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span
                        style={
                          e.english >= 35
                            ? {
                                color: "black",
                              }
                            : {
                                color: "red",
                                fontWeight: "bold",
                              }
                        }
                      >
                        {" "}
                        {e.english}{" "}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span
                        style={
                          e.science >= 35
                            ? {
                                color: "black",
                              }
                            : {
                                color: "red",
                                fontWeight: "bold",
                              }
                        }
                      >
                        {" "}
                        {e.science}{" "}
                      </span>
                    </td>
                    <td>{e.total}</td>
                    <td>
                      {" "}
                      <span
                        style={
                          e.percentage >= 35
                            ? {
                                color: "black",
                              }
                            : {
                                color: "red",
                                fontWeight: "bold",
                              }
                        }
                      >
                        {" "}
                        {e.percentage}{" "}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span
                        style={
                          e.result === "pass"
                            ? {
                                color: "green",
                                fontWeight: "bold",
                              }
                            : e.result === 0
                            ? {
                                color: "white",
                              }
                            : {
                                color: "red",
                                fontWeight: "bold",
                              }
                        }
                      >
                        {" "}
                        {e.result}
                      </span>
                    </td>
                    <td>
                      <button className="edit" onClick={() => props.edit(e.id)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => props.delete(e)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
      <br />
    </>
  );
};

export default Table;
