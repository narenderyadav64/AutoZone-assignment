import React from "react";
import { MDBDataTableV5 } from "mdbreact";

const DatatablePage = (props) => {
  console.log("props", props, props.peoples);
  const { loading, peoples } = props;
  const data = {
    columns: [
      {
        label: "Name",
        field: "name",
      },
      {
        label: "Gender",
        field: "gender",
      },
      {
        label: "Birth year",
        field: "birth_year",
      },
      {
        label: "Height",
        field: "height",
      },
      {
        label: "Skin color",
        field: "skin_color",
      },
    ],
    rows: peoples,
  };

  return (
    <>
      <div style={{ margin: 20 }}>
        <h3> Residents of selected planet</h3>
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <MDBDataTableV5
            entriesOptions={[10, 15, 20]}
            entries={10}
            striped
            bordered
            small
            sortable={false}
            data={data}
            searchBottom={false}
          />
        )}
      </div>
    </>
  );
};

export default DatatablePage;
