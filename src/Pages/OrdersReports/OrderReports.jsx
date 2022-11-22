import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getAllOrders } from "../../redux/actions/orderAction";
import "./Page6.css";
// import logo from "../../Assets/Images/logo3.png";

function OrderReports() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);

  let today = new Date();
  let dd = today.getDate();

  console.log(today, "==========", dd, "======== dates", orders && orders);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    dispatch(getAllOrders());
  }, [dispatch, error]);

  return (
    <div>
      <div className="mainsection">
        <div className="section2" style={{ height: "100vh" }}>
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
                Orders Report
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
              <p>AVG ORDERS PER DAY</p>
              <h4>3</h4>
            </div>
            <div>
              <div className="d-flex px-4 ">
                <div className="p2-selection mx-2 ">
                  <select
                    className="form-select "
                    aria-label="Default select example"
                  >
                    <option selected>All nurseries</option>
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
          <div className="s2-table px-5 mx-5 ">
            <div className="s2-table py-4">
              <table className="table table-borderless table-sm ">
                <thead className="s2-table-nava">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Orders</th>
                    <th scope="col">Sales</th>
                    <th scope="col">Nursery Name</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider my-5">
                  <tr>
                    <th scope="row">Today</th>
                    <td>100</td>
                    <td>100</td>
                    <td>Area/Locality</td>
                    {/* <td>🟢</td> */}
                    {/* <div>
                      <input
                        className="form-check-input s2-radio"
                        type="radio"
                        name="radioNoLabel"
                        id="radioNoLabel1"
                        value="Pending"
                        aria-label="..."
                      />
                    </div> */}
                    {/* <td>Rs 36,320</td> */}
                    {/* <td>
                      <select
                        className="form-select-sm px-3"
                        aria-label="Default select example"
                      >
                        <option selected>Select Nursery </option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </td> */}
                  </tr>

                  <tr>
                    <th scope="row">Yesterday</th>
                    <td>100</td>
                    <td>100 </td>
                    <td>Area/Locality</td>
                    {/* <td>OnlinePayment</td>
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
                    </td> */}
                  </tr>
                  <tr>
                    <th scope="row ">01 Oct 2022</th>
                    <td>900</td>
                    <td>900</td>
                    <td>Area/Locality</td>
                    {/* <td>COD</td>
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
                    </td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderReports;
