
import { removeItem } from "./helpers"

export default class Action {
  constructor(name, functions){
    this.name      = name
    this.functions = functions
  }

  addFunction(fn){
    this.functions.push(fn)
  }

  removeFunction(fn){
    removeItem(this.functions, fn)
  }

  execute(){
    for (let fn in this.functions){ fn() }
  }
}