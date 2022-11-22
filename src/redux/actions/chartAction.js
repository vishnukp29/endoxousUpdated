import axios from "../../axios";
import {
  ORDERS_CHART_REQUEST,
  ORDERS_CHART_SUCCESS,
  ORDERS_CHART_FAIL,
  SALES_CHART_REQUEST,
  SALES_CHART_SUCCESS,
  SALES_CHART_FAIL,
  CLEAR_ERRORS,
} from "../../constants/chartConstants";
// GET Order Chart
export const getOrderChart = () => async (dispatch) => {
  try {
    dispatch({ type: ORDERS_CHART_REQUEST });

    const { data } = await axios.get(`/admin/orderchart`);

    dispatch({ type: ORDERS_CHART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDERS_CHART_FAIL,
      payload: error.response.data,
    });
  }
};

// GET Sales Chart
export const getSalesOrdders = () => async (dispatch) => {
  try {
    dispatch({ type: SALES_CHART_REQUEST });

    const { data } = await axios.get(`/admin/chart`);

    dispatch({ type: SALES_CHART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SALES_CHART_FAIL,
      payload: error.response.data,
    });
  }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };