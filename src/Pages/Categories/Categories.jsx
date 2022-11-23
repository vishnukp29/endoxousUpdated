import React, { useEffect, useState } from "react";
import "./Page11.css";
// import logo from "../../Assets/Images/logo3.png";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate,useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearErrors,
  deleteCategory,
  getAllCategories,
} from "../../redux/actions/categoryAction";
import Loader from "../../Components/SideBar/Loader/Loader";
import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstants";
import { NEW_CATEGORY_RESET } from "../../constants/categoryConstants";


function Categories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams()
  console.log(useParams());
  const [keyword, setKeyword] = useState("");

  const { error, loading, categoryList,message,success } = useSelector((state) => state.allCategories);
  const { error:deleteError, loading:DeleteLoading,message:deleteMsg,success:deleteSuccess } = useSelector((state) => state.category);

  console.log(categoryList && categoryList, "=========== category list");

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (deleteSuccess) {
      toast(deleteMsg);
      dispatch({ type: DELETE_CATEGORY_RESET });
    }
    if (success) {
      toast(message);
      navigate('/categories')
      dispatch({ type: NEW_CATEGORY_RESET });
    }

    dispatch(getAllCategories());
  }, [dispatch, error,message,deleteError,deleteMsg,deleteSuccess]);

 

  const addCategoryHandler = () => {
    navigate("/category/new");
  };
  console.log(keyword, "======  key word");

 



  return (
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
              Catagories
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
              placeholder="Search for catagories here..."
              aria-label="input example"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div>
            <div className="d-flex px-4 ">
              <button type="button" className="btn btn-sm btn-link me-5">
                Reorder Catagory
              </button>
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
              <button
                type="button"
                className="btn-page4 btn btn-success btn-md"
                onClick={addCategoryHandler}
              >
                + Add New Category
              </button>
            </div>
          </div>
        </div>

        <div className="s2-table mx-5 ">
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
                    <th scope="col">IMG</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Option</th>
                    <th scope="col">Products</th>
                    <th scope="col">Status</th>
                    <th scope="col">Sales</th>
                    <th scope="col">Nursery Name</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider  my-5">
                  {categoryList &&
                    categoryList
                      .filter((val) => {
                        if (keyword === "") {
                          return val;
                        } else if (
                          val.name
                            ?.toLowerCase()
                            .includes(keyword?.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .map((category, index) => (
                        <tr key={index}>
                          <th scope="row">
                            <div
                              style={{
                                backgroundColor: "#ececec",
                                borderRadius: ".5rem",
                                width: "70px",
                                height: "70px",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                className="bg-primary img-fluid rounded-start"
                                src={category?.avatar[0]?.url}
                                alt="img"
                              />
                            </div>
                          </th>

                          <td>{category?.name} </td>
                          <td><button type="button" className="btn btn-outline-danger"
                                onClick={()=> dispatch(deleteCategory(category._id))}>Delete</button></td>
                          <td> 1 </td>
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
                          <td>Nursery Name</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
