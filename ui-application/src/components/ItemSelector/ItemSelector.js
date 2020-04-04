import React, {useMemo} from 'react';
import {AgGridReact} from 'ag-grid-react';
import SelectButton from "./SelectButton";
import styles from './ItemSelector.module.css';
import {useSelector} from "react-redux";

const defaultColDef = {
  sortable: true,
  resizable: true,
};
const frameworkComponents = {
  SelectButtonRenderer: SelectButton,
};

const ItemSelector = props => {
  const allItems = useSelector(state => state.data.allItems);
  const columnDefs = useMemo(() => {
    return [
      {
        headerName: "",
        width: 75,
        cellRenderer: 'SelectButtonRenderer',
        sortable: false,
      },
      {
        headerName: "Item", field: "ID", width: 75
      },
      {
        headerName: "Name", field: "Name", width: 300,
      }
    ]
  }, []);
  return (
    <div className={[styles.root, 'ag-theme-balham'].join(' ')}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={allItems}
        defaultColDef={defaultColDef}
        frameworkComponents={frameworkComponents}
      />
    </div>
  )
};

export default ItemSelector;