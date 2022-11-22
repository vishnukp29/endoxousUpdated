import React, { useEffect, useState } from "react";
import "./Page8.css";
// import logo from "../../Assets/Images/logo3.png";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearErrors, getAllUsers } from "../../redux/actions/userAction.js";
import { toast } from "react-toastify";
import DateFormatter from "../../utils/DateFormatter";

function MyCustomers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const { error, loading, users } = useSelector((state) => state.allUsers);
  console.log(users && users, "====== users");
  const usersOnly = users && users.filter((user) => user.role !== "admin");

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    dispatch(getAllUsers());
  }, [dispatch, error, keyword]);

  return (
    <div>
      <div className="mainsection">
        {/* <div className="section1">
          <div className="logo">
            <img className="logo" src={logo} />
          </div>
          <div>
            <ul className="navbar-nav justify-content-end flex-grow-1 ">
              <li className="nav-item m-2">
                <button className="s1-btn btn  px-4 ">Home</button>
              </li>
              <li className="nav-item m-2">
                <button className="s1-btn btn  px-4 ">Orders</button>
              </li>
              <li className="nav-item m-2">
                <button className="s1-btn btn  px-4 ">All Nurseries</button>
              </li>
              <li className="nav-item m-2">
                <button className="s1-btn btn px-4 ">Payments</button>
              </li>
              <li className="nav-item m-2">
                <button className="s1-btn btn  px-4 ">Nurseries</button>
              </li>
              <li className="nav-item m-2">
                <button className=" s1-btn btn  px-4 ">Logout</button>
              </li>
            </ul>
          </div>
        </div> */}
        <div className="section2 ">
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
                My Customer
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
                placeholder="Search Phone Number..."
                aria-label="readonly input example"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div>
              <div className="d-flex px-4 ">
                <div className="p2-selection mx-2">
                  <select
                    className="form-select "
                    aria-label="Default select example"
                  >
                    <option selected>Order status </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="p2-selection mx-2 ">
                  <select
                    className="form-select "
                    aria-label="Default select example"
                  >
                    <option selected>Special filters</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="p2-selection mx-2">
                  <select
                    className="form-select "
                    aria-label="Default select example"
                  >
                    <option selected>Lifetime</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="section2-btn d-flex  px-5 ">
            <button className="s2-btn">All</button>
            <button className="s2-btn">Pending</button>
            <button className="s2-btn">Shipped</button>
            <button className="s2-btn">Delivered</button>
            <button className="s2-btn">Cancelled</button>
          </div>
          <div className="s2-table px-5 m-3 ">
            <div className="s2-table py-4">
              <table className="table table-borderless table-sm ">
                <thead className="s2-table-nava">
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Date & Time</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Items</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Status</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Area/Locality</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider  my-5">
                  {usersOnly &&
                    usersOnly
                      .filter((val) => {
                        if (keyword === "") {
                          return val;
                        } else if (
                          val.fullName
                            .toLowerCase()
                            .includes(keyword.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .map((user, index) => (
                        <tr>
                          <th scope="row">
                            {index + 1}#{user._id}
                          </th>
                          <td>
                            {" "}
                            <DateFormatter date={user?.joinedOn} />{" "}
                          </td>
                          <td>
                            {" "}
                            {user?.phone ? user?.phone : "not specified"}
                          </td>
                          <td> 1 </td>
                          <td>COD</td>
                          <td>
                            <div>
                              <input
                                className="form-check-input s2-radio"
                                type="radio"
                                name="radioNoLabel"
                                id="radioNoLabel1"
                                value="Pending"
                                aria-label="..."
                              />{" "}
                              Pending
                            </div>
                          </td>
                          <td>Rs 320</td>
                          <td>
                            <select
                              className="form-select-sm px-3"
                              aria-label="Default select example"
                            >
                              <option selected>Select Nursery </option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </td>
                        </tr>
                      ))}

                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCustomers;
