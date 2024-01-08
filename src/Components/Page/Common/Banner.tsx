import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchItem } from "../../../Storage/Redux/menuItemSlice";
import "./banner.css";
function Banner() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchItem(e.target.value));
    setValue(e.target.value);
  };

  return (
    <div className="custom-banner">
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="col-md-4 col-12 ms-3 ms-md-0">
          <div className="d-flex align-items-center w-100">
            <input
              type="text"
              className="form-control rounded-pill w-100 p-3"
              value={value}
              onChange={handleChange}
              placeholder="Search for Food Items!"
            />
            <span style={{ position: "relative", left: "-43px" }}>
              <i className="bi bi-search"></i>
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Banner;
