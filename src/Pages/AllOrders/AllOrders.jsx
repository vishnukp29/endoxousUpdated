import React, { useEffect, useState } from "react";
import "./Page2.css";
// import logo from "../../Assets/Images/logo3.png";
import DateFormatter from "../../utils/DateFormatter";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getAllOrders } from "../../redux/actions/orderAction";
import { getAllNurseries } from "../../redux/actions/nurseryAction";

import Loader from "../../Components/SideBar/Loader/Loader";

function AllOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, orders } = useSelector((state) => state.allOrders);
  const { error: nurseriesError, nurseries } = useSelector(
    (state) => state.allNurseries
  );

  const [nursery, setNursery] = useState("");
  const [orderId, setOrderId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredOrders, setFilterOrders] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (nurseriesError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    if (orders) {
      setFilterOrders(orders);
    }

    dispatch(getAllOrders());
    dispatch(getAllNurseries());
  }, [dispatch, error, nurseriesError, keyword, filterStatus, setFilterOrders]);

  const assigntoHandler = (orderId, nursery) => {
    dispatch();
  };

  const viewDeatils = (id) => {
    navigate(`/orders/${id}`);
  };

  const AllOrdders = orders && orders.filter((order) => order);
  const pendingOrdders =
    orders && orders.filter((order) => order.orderStatus === "pending");
  const shippedOrdders =
    orders && orders.filter((order) => order.orderStatus === "Shipped");
  const deliveredOrdders =
    orders && orders.filter((order) => order.orderStatus === "Delivered");
  const CancelledOrdders =
    orders && orders.filter((order) => order.orderStatus === "Cancelled");

  const showAll = () => {
    setFilterOrders(AllOrdders);
  };
  const showPending = () => {
    setFilterOrders(pendingOrdders);
  };
  const showShippied = () => {
    setFilterOrders(shippedOrdders);
  };
  const showDelivered = () => {
    setFilterOrders(deliveredOrdders);
  };
  const showCancelled = () => {
    setFilterOrders(CancelledOrdders);
  };

  const handleSelect = (e) => {
    let item = parseInt(e.target.value);
    if (item === 1) {
      setFilterOrders(pendingOrdders);
    } else if (item === 2) {
      setFilterOrders(shippedOrdders);
    } else if (item === 3) {
      setFilterOrders(deliveredOrdders);
    } else if (item === 4) {
      setFilterOrders(CancelledOrdders);
    } else {
      setFilterOrders(AllOrdders);
    }
  };

  const nurseryDropDownHandler = (e) => {
    const nursery = e.target.value;
    const nuserysOrders =
      orders && orders.filter((order) => order.deliveredBy === nursery);
    setFilterOrders(nuserysOrders);
    if (nursery == 1) {
      setFilterOrders(AllOrdders);
    }
  };

  return (
    <div>
      <div className="mainsection">
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

              <NavLink className="fw-bold navbar-brand" to="/">
                All Orders
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
              {/* <form className="searchBox" onSubmit={searchSubmitHandler}> */}
              <input
                className="form-control px-5"
                type="text"
                value={keyword}
                aria-label="readonly input example"
                placeholder="Order ID, phone or name..."
                onChange={(e) => setKeyword(e.target.value)}
              />
              {/* </form> */}
            </div>
            <div>
              <div className="d-flex px-4 ">
                <div className="p2-selection mx-2">
                  <select
                    className="form-select "
                    aria-label="Default select example"
                    onChange={handleSelect}
                  >
                    <option selected>Order status </option>
                    <option value="1">Pending</option>
                    <option value="2">Shipped</option>
                    <option value="3">Delivered</option>
                    <option value="4">Cancelled</option>
                  </select>
                </div>
                <div className="p2-selection mx-2 ">
                  <select
                    className="form-select "
                    aria-label="Default select example"
                    onChange={nurseryDropDownHandler}
                  >
                    <option selected value="1">
                      Special filters
                    </option>
                    {nurseries &&
                      nurseries.map((nursery, index) => (
                        <option value={nursery.name} key={index}>
                          {nursery?.name + " " + nursery?.address}
                        </option>
                      ))}
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
            <button className="s2-btn" onClick={() => showAll()} autoFocus>
              All
            </button>
            <button className="s2-btn" onClick={() => showPending()}>
              Pending
            </button>
            <button className="s2-btn" onClick={() => showShippied()}>
              Shipped
            </button>
            <button className="s2-btn" onClick={() => showDelivered()}>
              Delivered
            </button>
            <button className="s2-btn" onClick={() => showCancelled()}>
              Cancelled
            </button>
          </div>
          <div className="s2-table m-5 ">
            <div className="s2-table">
              {loading ? (
                <Loader />
              ) : (
                <table
                  className="table table-borderless"
                  style={{
                    overflow: "hidden",
                    width: "100%",
                    borderRadius: ".5rem",
                    backgroundColor: "white",
                  }}
                >
                  <thead style={{ backgroundColor: "#eaeaea" }}>
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Date and Time</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Items</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Status</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Deliverd By</th>
                    </tr>
                  </thead>

                  <tbody className="table-group-divider  my-5">
                    {filteredOrders &&
                      filteredOrders
                        .filter((val) => {
                          if (keyword === "") {
                            return val;
                          } else if (
                            val.fullName
                              ?.toLowerCase()
                              .includes(keyword?.toLowerCase())
                          ) {
                            return val;
                          }
                        })
                        .map((order, index) => (
                          <tr key={index}>
                            <th
                              onClick={() => viewDeatils(order._id)}
                              scope="row"
                              style={{ cursor: "pointer" }}
                            >
                              #{'0000'.substr(String(index).length ) + Number(index+1)}
                            </th>
                            <td>
                              {" "}
                              <DateFormatter date={order.createdAt} />{" "}
                            </td>
                            <td>
                              {order.user?.name
                                ? order.user?.name
                                : order.user?.phone}
                            </td>
                            <td>{order.orderItems?.length}</td>
                            <td>{order.paymentInfo?.method}</td>
                            <td>
                              <div>
                                <input
                                  className="form-check-input s2-radio"
                                  type="radio"
                                  name="radioNoLabel"
                                  id="radioNoLabel1"
                                  value="Pending"
                                  aria-label="..."
                                  style={{
                                    backgroundColor:
                                      order?.orderStatus === "Shipped"
                                        ? "lightgreen"
                                        : order?.orderStatus === "Cancelled"
                                        ? "red"
                                        : order?.orderStatus === "Delivered"
                                        ? "green"
                                        : "orange",
                                  }}
                                />{" "}
                                {order?.orderStatus}
                              </div>
                            </td>
                            <td>Rs {order?.totalPrice}</td>
                            <td>
                              {order && order?.deliveredBy ? (
                                <td>{order?.deliveredBy}</td>
                              ) : (
                                <select
                                  className="form-select-sm px-3"
                                  aria-label="Default select example"
                                  onChange={(e) => setNursery(e.target.value)}
                                >
                                  <option selected>Select Nursery </option>
                                  {nurseries &&
                                    nurseries.map((nursery, index) => (
                                      <option value={nursery.name} key={index}>
                                        {nursery?.name + " " + nursery?.address}
                                      </option>
                                    ))}
                                </select>
                              )}
                            </td>
                          </tr>
                        ))}
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

export default AllOrders;
