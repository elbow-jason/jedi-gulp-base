
import { removeNamedItem } from "./helpers"

export default class Choice {
  constructor(name, config){
    this.name     = name
    this.config   = config
    this.actions  = []
  }

  addAction(action){
    this.actions.push(action);
  }

  removeAction(action){
    removeNamedItem(this.actions, action)
  }

}