
import {
  useDeleteMenuItemMutation,
  useGetMenuItemsQuery,
} from "../../Apis/menuItemApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { useNavigate } from "react-router";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
function MenuItemList() {
  const [deleteMenuItem] = useDeleteMenuItemMutation();
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const navigate = useNavigate();

  const handleMenuItemDelete = async (id: number) => {
    toast.promise(
      deleteMenuItem(id),
      {
        pending: "Processing your request...",
        success: "Menu Item Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };


  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-md-flex align-items-center justify-content-between">
            <h1 className="text-success">MenuItem List</h1>
            <button
              className="btn btn-success"
              onClick={() => navigate("/menuitem/menuitemupsert")}
            >
              Add New Menu Item
            </button>
          </div>
          <div className="bg-danger form-control text-center text-white h4">
            In demo, you will not be able to create/update or delete Menu Items!
          </div>
          <div className="p-2">
            <DataTable value={data && data.result} tableStyle={{ minWidth: '50rem' }}>
              <Column header="Image" body={(rowData) => (
                <img
                  src={rowData.image}
                  alt="no content"
                  style={{ width: "100%", maxWidth: "120px" }}
                />
              )}>
              </Column>
              <Column field="id" header="ID"></Column>
              <Column field="name" header="Name"></Column>
              <Column field="category" header="Category"></Column>
              <Column field="price" header="Price"></Column>
              <Column field="specialTag" header="Special Tag"></Column>
              <Column header="Action" body={(rowData) => (
                <>
                  <Button
                    className="btn btn-success"
                    onClick={() =>
                      navigate("/menuitem/menuitemupsert/" + rowData.id)
                    }>
                    <i className="bi bi-pencil-fill"></i>
                  </Button>

                  <Button
                    className="btn btn-danger ms-2"
                    onClick={() => handleMenuItemDelete(rowData.id)}>
                    <i className="bi bi-trash-fill"></i>
                  </Button>
                </>
              )}>
              </Column>
            </DataTable>
          </div>
        </div>
      )}
    </>
  );
}

export default MenuItemList;
