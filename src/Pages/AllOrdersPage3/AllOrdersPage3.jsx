import React, { Fragment, useEffect, useState } from "react";
import "./Page3.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../redux/actions/orderAction";
import { toast } from "react-toastify";
import DateFormatter from "../../utils/DateFormatter";
import { getOrderTickets } from "../../redux/actions/ticketsAction";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

function AllOrdersPage3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [status, setStatus] = useState("");

  const { error, loading, order } = useSelector((state) => state.orderDetails);
  const { error: ticketsError, tickets } = useSelector(
    (state) => state.ordersTicket
  );
  const {
    error: updateError,
    isUpdated,
    message,
  } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (ticketsError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success(message);
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
    dispatch(getOrderTickets(id));
  }, [id, dispatch, error, ticketsError, isUpdated, updateError, message]);

  const ticketCloseHandler = (id) => {
    console.log(id, "======== ticket close id");
  };
  const OrderSatusHandler = (id, status) => {
    dispatch(updateOrder(id, status));
  };

  return (
    <div className="p3-body">
      <div className="mainsection">
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
                All Orders
              </NavLink>
              <button
                className="btn btn-outline-success btnround"
                type="submit"
              ></button>
            </div>
            <hr />
          </nav>
          <div className="d-flex justify-content-around">
            <div>
              <div className="p3-order-block p-5 ">
                <h6 className="fw-bold">Order ID #{order && order._id}</h6>
                <div className="d-flex justify-content-between">
                  <h6>
                    <DateFormatter date={order?.createdAt} />
                  </h6>
                  <div>
                    <input
                      className="form-check-input s2-radio"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel1"
                      value=""
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
                </div>
                <div className="p3-box">
                  <p>DELIVERING NURSERY</p>
                  <p>
                    {order?.deliveredBy
                      ? order?.deliveredBy
                      : "Name of the nursery"}
                  </p>
                  <p>Complete Address goes here with area, pincode</p>
                </div>
                <hr />
                {order &&
                  order?.orderItems &&
                  order?.orderItems.map((item, index) => (
                    <Fragment>
                      <p className="item-text">{index + 1} ITEM</p>
                      <div className="d-flex p3-items">
                        <div className="p3-order-item-block me-4"></div>
                        <div>
                          <p>{item.name}</p>
                          <p>Per Price</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <button className="btn bg-info">
                              {item.quantity}
                            </button>{" "}
                            &nbsp; x {item?.price} =
                            <div>{item.quantity * item?.price}/-</div>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                <hr />
                <div className="d-flex  justify-content-between">
                  <div>Item Total</div>
                  <div>{order?.itemPrice}/-</div>
                </div>
                <div className="d-flex  justify-content-between">
                  <div>Delivery</div>
                  <div>
                    {order?.shippingPrice === 0 ? "FREE" : order?.shippingPrice}
                  </div>
                </div>
                <div className="d-flex  justify-content-between">
                  <div>GRAND TOTAL</div>
                  <div>{order?.totalPrice}/-</div>
                </div>
              </div>
              <div className="p3-order-block">
                <div className="d-flex justify-content-between align-items-center px-3">
                  <h6 style={{ margin: "0" }}>Customer Detailes</h6>
                  <NavLink to="/">Edit</NavLink>
                </div>
                <hr />
                <div className="d-flex justify-content-between px-5 my-2">
                  <div>
                    <label>Name</label> <br />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={order?.user?.name ? order?.user?.name : "Name"}
                      readOnly
                    />
                  </div>
                  <div>
                    <label>Number</label> <br />
                    <input
                      type="text"
                      placeholder=""
                      value={
                        order?.user?.phone
                          ? order?.user?.phone
                          : " Phone Number"
                      }
                      readOnly
                    />
                  </div>
                </div>
                <div className="px-5 my-2">
                  <label>Email Id</label> <br />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={
                      order?.user?.email?.slice(0, 17) === "example@gmail.com"
                        ? "Email"
                        : order?.user?.email
                    }
                    readOnly
                  />
                </div>
                <div className="px-5 my-2">
                  <label>Address</label> <br />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={
                      order?.user?.shippingInfo?.address
                        ? order?.user?.shippingInfo?.address
                        : "Address"
                    }
                    readOnly
                  />
                </div>
                <div className="d-flex justify-content-between px-5 my-2">
                  <div>
                    <label>Area/Locality</label> <br />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={
                        order?.user?.shippingInfo?.area
                          ? order?.user?.shippingInfo?.area
                          : "Area/Locality"
                      }
                      readOnly
                    />
                  </div>
                  <div>
                    <label>Landmark</label> <br />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={
                        order?.user?.shippingInfo?.landMark
                          ? order?.user?.shippingInfo?.landMark
                          : "Landmark"
                      }
                      readOnly
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between px-5 my-2">
                  <div>
                    <label>City</label> <br />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={
                        order?.user?.shippingInfo?.city
                          ? order?.user?.shippingInfo?.city
                          : "City"
                      }
                      readOnly
                    />
                  </div>
                  <div>
                    <label>Pincode</label> <br />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={
                        order?.user?.shippingInfo?.pincode
                          ? order?.user?.shippingInfo?.pincode
                          : "Pincode"
                      }
                      readOnly
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between px-5 my-2">
                  <div>
                    <label>State</label> <br />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={
                        order?.user?.shippingInfo?.state
                          ? order?.user?.shippingInfo?.state
                          : "State"
                      }
                      readOnly
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <div className="d-inline" style={{ width: "80%" }}>
                      <label>Payment Method</label> <br />
                      <input
                        className="w-50"
                        type="text"
                        placeholder="Cash on delivery"
                        value={
                          order?.paymentInfo?.method
                            ? order?.paymentInfo?.method
                            : "Payment Method"
                        }
                        readOnly
                      />
                      <span>
                        {order?.paymentInfo?.method === "online"
                          ? "Online"
                          : "COD"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="p3-notes">
                <p> Notes</p>
                <div className="p3-notes-bg"></div>
              </div>
              <div className="p3-activity-bg">
                <p>ACTIVITY</p>
                <div>
                  <div>
                    <input
                      className="form-check-input bg-danger"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel1"
                      value="Pending"
                      aria-label="..."
                    />{" "}
                    Order Placed
                    <p>
                      <DateFormatter date={order?.createdAt} />{" "}
                    </p>
                  </div>
                  <div>
                    <input
                      className="form-check-input bg-danger"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel1"
                      value="Pending"
                      aria-label="..."
                    />{" "}
                    Assigned to
                    <p>
                      <DateFormatter date={order?.createdAt} />
                    </p>
                  </div>
                  <div>
                    <input
                      className="form-check-input bg-danger"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel1"
                      value="Pending"
                      aria-label="..."
                    />{" "}
                    Order Shipped
                    <p>
                      <DateFormatter date={order?.shippedAt} />
                    </p>
                  </div>
                  <div>
                    <input
                      className="form-check-input bg-danger"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel1"
                      value="Pending"
                      aria-label="..."
                    />{" "}
                    Order Delivered
                    <p>
                      {" "}
                      <DateFormatter date={order?.deliverdAt} />
                    </p>
                  </div>
                </div>
              </div>
              {tickets &&
                tickets.map((ticket, index) => (
                  <div className="p3-notes">
                    <h5> CUSTOMER HELP</h5>
                    <div className="p3-notes-bg">
                      <p6>{ticket?.ticket}</p6>
                      <hr className="p3-customer-hr" />
                      <p6 className="h6 text-right">
                        {/* - Raised at 05:00 PM, 23rd Aug 2022 */}
                        <DateFormatter date={ticket.createdAt} />
                      </p6>
                    </div>
                    <button
                      className="btn"
                      onClick={() => ticketCloseHandler(ticket._id)}
                    >
                      Close ticket
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <footer
            className="navbar navbar-expand-lg p-2"
            style={{ backgroundColor: "white" }}
          >
            <div className="container-fluid px-5 d-flex align-items-center justify-content-end">
              {order && order.orderStatus === "Delivered" ? (
                <h4>
                  <DateFormatter date={order && order?.deliverdAt} /> - Order
                  Delivered{" "}
                </h4>
              ) : (
                <Fragment>
                  {order && order?.orderStatus === "Cancelled" ? (
                    ""
                  ) : (
                    <Fragment>
                      {order && order?.orderStatus === "Shipped" ? (
                        <button
                          className="p3-button btn btn-outline"
                          type="submit"
                          onClick={() =>
                            OrderSatusHandler(order && order._id, {
                              status: "Delivered",
                            })
                          }
                        >
                          Delivered
                        </button>
                      ) : (
                        <button
                          className="p3-button btn btn-outline"
                          type="submit"
                          onClick={() =>
                            OrderSatusHandler(order && order._id, {
                              status: "Shipped",
                            })
                          }
                        >
                          Ship Order
                        </button>
                      )}
                    </Fragment>
                  )}
                </Fragment>
              )}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default AllOrdersPage3;
