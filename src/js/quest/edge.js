
import Node                 from "./Node"
import { removeNamedItem }  from "./helpers"


export default class Edge {
  constructor(name){
    this.name         = name          // Hopefully a string or int
    this.origin       = null          // Node
    this.destination  = null          // Node
    this.actions      = []            // List of Actions
    this.validateConfiguration();
  }

  addAction(action){
    this.actions.push(action);
  }

  removeAction(action){
    removeNamedItem(this.actions, action)
  }

  setOrigin(origin){
    this.origin = origin
    this.checkNode("origin")
  }

  setDestination(destination){
    this.destination = destination
    this.checkNode("destination")
  }

  checkNode(key){
    let node = this[key]
    if (!node && !(node instanceof Node)) {
      console.error(`Edge: ${key} was of type ${typeof node}`)
      console.error(`Edge: ${key} was ${node}`)
      throw `Edge: ${key} was invalid`
    }
  }

  validateConfiguration(){
    if (!this.name) throw "Edge: name is required."
    if (!Array.isArray(this.actions)) throw "Edge: actions was not an Array"
  }

  executeActions(){
    for (let action in this.actions){
      action.execute()
    }
  }
}