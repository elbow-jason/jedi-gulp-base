
import Node from "../Node";

const errors ={
  nameNotString: `Expected a string as the only arg.`,
  invalidNode: `Node was not valid (not a Node nor a node name).`,
  notFound: `NodeRegistry could not find node`,
}

export default class NodeRegistry {
  constructor(){
    this.nodes = {}
  }

  addNode(node){
    if (!isNode(node)) throw errors.invalidNode + ` Got: ${node}`
    this.nodes[node.name] == node;
  }

  removeNodeByName(name){
    if (!this.nodes[name]) console.error(errors.notFound +` '${name}'`)
    if (!isString(name))  { throw errors.nameNotString + ` Got: ${name}`}
    return delete this.nodes[name]
  }

  removeNode(node){
    if (isString(node)) return this.removeNodeByName(node)
    if (isNode(node))   return this.removeNodeByName(node.name)
    throw "NodeRegistry: " + errors.invalidNode
  }

}

const isString = (thing) => (typeof thing === "string")
const isNode   = (thing) => (thing instanceof Node)
