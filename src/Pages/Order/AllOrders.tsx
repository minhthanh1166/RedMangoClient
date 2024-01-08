import React, { useState, useEffect } from "react";
import { withAdminAuth } from "../../HOC";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import OrderList from "../../Components/Page/Order/OrderList";
import { MainLoader } from "../../Components/Page/Common";
import { inputHelper } from "../../Helper";
import { SD_Status } from "../../Utility/SD";
const filterOptions = [
  "All",
  SD_Status.CONFIRMED,
  SD_Status.BEING_COOKED,
  SD_Status.READY_FOR_PICKUP,
  SD_Status.CANCELLED,
];

function AllOrders() {
  const [filters, setFilters] = useState({ searchString: "", status: "" });
  const [orderData, setOrderData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5,
  });
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
  const [apiFilters, setApiFilters] = useState({
    searchString: "",
    status: "",
  });

  const { data, isLoading } = useGetAllOrdersQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      status: apiFilters.status,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize,
    }),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempValue = inputHelper(e, filters);
    setFilters(tempValue);
  };

  const handleFilters = () => {
    setApiFilters({
      searchString: filters.searchString,
      status: filters.status,
    });
  };

  useEffect(() => {
    if (data) {
      setOrderData(data.apiResponse.result);
      const { TotalRecords } = JSON.parse(data.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [data]);

  const getPageDetails = () => {
    const dataStartNumber =
      (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;

    return `${dataStartNumber}
             - 
            ${dataEndNumber < totalRecords ? dataEndNumber : totalRecords
      } of ${totalRecords}`;
  };

  const handlePageOptionChange = (direction: string, pageSize?: number) => {
    if (direction === "prev") {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber - 1 });
    } else if (direction === "next") {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber + 1 });
    } else if (direction === "change") {
      setPageOptions({
        pageSize: pageSize ? pageSize : 5,
        pageNumber: 1,
      });
    }
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="d-md-flex align-items-center justify-content-between mx-5 mt-5">
            <h1 className="text-success">Orders List</h1>

            <div className="d-md-flex">
              <input
                type="text"
                className="form-control mx-md-2"
                placeholder="Search Name, Email or Phone"
                name="searchString"
                onChange={handleChange}
              />
              <select
                className="form-select mx-md-2 mt-1 mt-md-0"
                onChange={handleChange}
                name="status"
              >
                {filterOptions.map((item, index) => (
                  <option key={index} value={item === "All" ? "" : item}>
                    {item}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-outline-success my-1 mt-md-0"
                onClick={handleFilters}
              >
                Filter
              </button>
            </div>
          </div>
          <div className="mx-5">
            <div className="bg-danger form-control text-center text-white h4 ">
              In this demo, orders older than 3 days might be deleted!
            </div>
          </div>
          <OrderList isLoading={isLoading} orderData={orderData} />
          <div className="d-md-flex mx-5 justify-content-end align-items-center">
            <div className="d-flex align-items-center">
              <div>Rows per page: </div>
              <div>
                <select
                  className="form-select mx-2"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    handlePageOptionChange("change", Number(e.target.value));
                    setCurrentPageSize(Number(e.target.value));
                  }}
                  style={{ width: "80px" }}
                  value={currentPageSize}
                >
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                </select>
              </div>
            </div>
            <div className="d-flex align-items-center mt-1 mt-md-0">
              <div className="mx-2">{getPageDetails()}</div>
              <button
                onClick={() => handlePageOptionChange("prev")}
                disabled={pageOptions.pageNumber === 1}
                className="btn btn-outline-primary px-3 mx-2"
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button
                onClick={() => handlePageOptionChange("next")}
                disabled={
                  pageOptions.pageNumber * pageOptions.pageSize >= totalRecords
                }
                className="btn btn-outline-primary px-3 mx-2"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default withAdminAuth(AllOrders);
