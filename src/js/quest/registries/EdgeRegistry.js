
import Edge from "../Edge";

export default class EdgeRegistry {
  constructor(){
    this.edges = {};
  }

  addEdge(edge){
    if (edge instanceof Edge) {
      this.edges[edge.name] = edge
    }
  }

}
