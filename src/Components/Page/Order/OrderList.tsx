

import { MainLoader } from "../Common";
import OrderListProps from "./orderListType";
import { useNavigate } from "react-router-dom";
import { getStatusColor } from "../../../Helper";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { Button } from "primereact/button";

function OrderList({ isLoading, orderData }: OrderListProps) {
  const navigate = useNavigate();
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <DataTable className="p-2 px-5" value={orderData} tableStyle={{ minWidth: '50rem' }}>
          <Column field="orderHeaderId" header="ID"></Column>
          <Column field="pickupName" header="Name"></Column>
          <Column field="pickupPhoneNumber" header="Phone"></Column>
          <Column field="orderTotal" header="Total" body={(rowData) => rowData.orderTotal.toFixed(2)}></Column>
          <Column field="totalItems" header="Items"></Column>
          <Column field="orderDate" header="Date" body={(rowData) => new Date(rowData.orderDate!).toLocaleDateString()}></Column>
          <Column field="status" header="Status"
            body={(rowData) => (
              <span className={`badge bg-${getStatusColor(rowData.status!)}`}>
                {rowData.status}
              </span>
            )}></Column>
          <Column
            body={(rowData) => (
              <Button
                label="Details"
                className="btn btn-success"
                onClick={() => navigate(`/order/orderDetails/${rowData.orderHeaderId}`)}
              />
            )}
            header="Order Details"
          ></Column>
        </DataTable>
      )}

    </>
  );
}

export default OrderList;
