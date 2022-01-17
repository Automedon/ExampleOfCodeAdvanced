export interface Row {
  id: string;
  name: string;
  format: string;
  position: string;
  price: number;
  children?: Row[];
  parentId?: string;
  isExpanded?: boolean;
}

export interface Action {
  type: "toggleSubRow" | "deleteSubRow";
  id: string;
}
