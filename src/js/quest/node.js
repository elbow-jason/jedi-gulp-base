
import { isNamedMember } from "./helpers"

export default class Node {
  constructor(name, config){
    this.name     = name
    this.config   = config
    this.choices  = []
    this.edges    = []
  }

  addChoice(choice) {
    this.choices.push(choice)
  }

  removeChoice(choice) {
    removeNamedItem(this.choices, choice)
  }

  addEdge(edge) {
    edge.origin = this
    this.edges.push(edge)
  }

  removeEdge(edge){
    removeNamedItem(this.edges, edge)
  }

  hasEdge(edge) {
    // check membership
    return isNamedMember(this.edges, edge);
  }

}