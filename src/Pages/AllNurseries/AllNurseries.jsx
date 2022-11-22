import React, { useEffect, useState } from "react";
import "./Page4.css";
// import logo from "../../Assets/Images/logo3.png";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  clearErrors,
  getAllNurseries,
} from "../../redux/actions/nurseryAction";
import { toast } from "react-toastify";
import Loader from "../../Components/SideBar/Loader/Loader";

function AllNurseries() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const { error, loading, nurseries } = useSelector(
    (state) => state.allNurseries
  );


  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    dispatch(getAllNurseries());
  }, [dispatch, error,keyword]);

  const addNewNurseryHandler = () => {
    console.log("New Nursery Mode or any popup");
    alert("New Nursery Mode or any popup ?");
  };
  return (
    <div>
      <div className="mainsection" style={{ height: "100vh" }}>
        <div className="section2">
          <nav
            className="s2-navabar navbar navbar-expand-lg "
            style={{ backgroundColor: "white" }}
          >
            <div className="container-fluid px-5">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo03"
                aria-controls="navbarTogglerDemo03"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <NavLink className="fw-bold navbar-brand " to="/">
                All Nurseries
              </NavLink>
              <button
                className="btn btn-outline-success btnround"
                type="submit"
              ></button>
            </div>
            <hr />
          </nav>
          <div className="d-flex justify-content-between  align-items-center px-2 py-1">
            <div className="p-5">
              <input
                className="form-control px-5"
                type="text"
                value={keyword}
                placeholder="ID, phone or name..."
                aria-label="readonly input example"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div>
              <div className="d-flex px-4 ">
                <button
                  type="button"
                  className="btn-AllNurseries btn btn-success btn-md"
                  onClick={addNewNurseryHandler}
                >
                  + Add new nursery
                </button>
              </div>
            </div>
          </div>
          <div className="s2-table px-3 mx-5 ">
            <div className="s2-table py-4">
              {loading ? (
                <Loader />
              ) : (
                <table className="table table-borderless table-sm ">
                  <thead className="s2-table-nava">
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Nursery Name</th>
                      <th scope="col">Area/Locality</th>
                      <th scope="col">Products</th>
                      <th scope="col">Status</th>
                      <th scope="col">Sales</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider  my-5">
                    {nurseries &&
                      nurseries.filter((val) => {
                        if (keyword === "") {
                          return val;
                        } else if (
                          val.fullName
                            ?.toLowerCase()
                            .includes(keyword?.toLowerCase())
                        ) {
                          return val;
                        }
                      }).map((nursery, index) => (
                        <tr>
                          <th scope="row">#{nursery._id}</th>
                          <td>{nursery?.name}</td>
                          <td>{nursery.address} </td>
                          <td> 1 </td>
                          {/* <td>🟢</td> */}
                          <div>
                            <input
                              className="form-check-input s2-radio"
                              type="radio"
                              name="radioNoLabel"
                              id="radioNoLabel1"
                              value="Pending"
                              aria-label="..."
                            />
                          </div>
                          <td>Rs 36,320</td>
                        </tr>
                      ))}

                    {/* <tr>
                    <th scope="row">#12345</th>
                    <td>Date</td>
                    <td>CustomerName </td>
                    <td> 2 </td>
                    <td>OnlinePayment</td>
                    <td>Pending</td>
                    <td>Rs 320</td>
                    <td>
                      <select
                        className="form-select-sm  px-3"
                        aria-label="Default select example"
                      >
                        <option selected>Select Nursery </option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row ">#12345</th>
                    <td>05.10.22, 06:01 PM</td>
                    <td>CustomerName </td>
                    <td> 1 </td>
                    <td>COD</td>
                    <td>Pending</td>
                    <td>Rs 320</td>
                    <td>
                      <select
                        className="form-select-sm  px-3"
                        aria-label="Default select example"
                      >
                        <option selected>Select Nursery </option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </td>
                  </tr> */}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllNurseries;
