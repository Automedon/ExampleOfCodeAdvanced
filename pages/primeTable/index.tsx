import React, { useState, useEffect } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { NodeService } from "./NodeService";

const TreeTableFilterDemo = () => {
  const [nodes, setNodes] = useState([]);
  const [globalFilter1, setGlobalFilter1] = useState(null);
  const nodeservice = new NodeService();

  const treeTableFuncMap = {
    globalFilter1: setGlobalFilter1,
  };

  useEffect(() => {
    nodeservice.getTreeTableNodes().then((data) => setNodes(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getHeader = (globalFilterKey) => {
    return (
      <div className="p-text-right">
        <div className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) =>
              treeTableFuncMap[`${globalFilterKey}`](e.target.value)
            }
            placeholder="Global Search"
            size={50}
          />
        </div>
      </div>
    );
  };

  let header1 = getHeader("globalFilter1");

  return (
    <div>
      <div className="card">
        <h5>Lenient Filter</h5>
        <TreeTable
          value={nodes}
          resizableColumns
          columnResizeMode="fit"
          globalFilter={globalFilter1}
          header={header1}
        >
          <Column field="name" header="Name" expander sortable />
          <Column field="size" header="Size" sortable />
          <Column field="type" header="Type" sortable />
        </TreeTable>
      </div>
    </div>
  );
};

export default TreeTableFilterDemo;
