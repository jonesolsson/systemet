import { observable } from 'mobx'

let index = 0

class ObservableListStore {
  @observable list = [{
    name: 'item one',
    items: [],
    index
  }]

  addListItem (item) {
    this.list.push({
      name: item,
      items: [],
      index
    })
    index++
  }
}

const observableListStore = new ObservableListStore()
export default observableListStore
