import axios from "axios";

export class NodeService {
  getTreeTableNodes() {
    return axios.get("./treetablenodes.json").then((res) => res.data.root);
  }

  getTreeNodes() {
    return axios.get("./treenodes.json").then((res) => res.data.root);
  }
}
