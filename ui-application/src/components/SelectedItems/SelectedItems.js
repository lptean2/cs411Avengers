import React, {useMemo} from 'react';
import {AgGridReact} from 'ag-grid-react';
import RemoveButton from "./RemoveButton";
import styles from './SelectedItems.module.css';
import {useSelector} from "react-redux";

const defaultColDef = {
  sortable: true,
  resizable: true,
};
const frameworkComponents = {
  RemoveButtonRenderer: RemoveButton,
};

const SelectedItems = props => {
  const selectedEditItems = useSelector(state => state.edit.selectedEditItems);

  const columnDefs = useMemo(() => {
    return [
      {
        headerName: "",
        width: 75,
        cellRenderer: 'RemoveButtonRenderer',
        sortable: false,
      },
      {
        headerName: "Item", field: "ItemID", width: 75
      },
      {
        headerName: "Qty", field: "Quantity", width: 300,
      }
    ]
  }, []);
  return (
    <div className={[styles.root, 'ag-theme-balham'].join(' ')}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={selectedEditItems}
        defaultColDef={defaultColDef}
        frameworkComponents={frameworkComponents}
      />
    </div>
  )
};

export default SelectedItems;