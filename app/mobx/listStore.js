import { observable, computed, action } from 'mobx'
import SystemetApi from '../includes/SystemetApi'
import {
  ListView,
  AsyncStorage
} from 'react-native'

const api = new SystemetApi

class ObservableListStore {
  @observable params = {}
  @observable searchResults = []
  /*
  @observable searchResults = [
    {
      name: 'Oppigårds Everyday',
      name_2: 'name_2',
      product_number: '14420',
      country: {
        name: 'country_name'
      },
      price: 20.90,
      volume: 0.33,
      favourite: false
    }
  ]
  */

  @observable favouriteProducts = []
  @observable isLoading = false
  @observable filters = {
    tag: [],
    country: []
  }

  @observable tag = []
  @observable country = []

  get(endpoint) {
    let params = ''
    console.log(this.params)
    if (Object.keys(this.params).length) {
      params = this.params
    }

    api.getData(endpoint, params)
  }

  @computed get favouriteProductsList() {
    AsyncStorage.getItem('favourites').then((value) => {
      if (value) {
        for (let item of JSON.parse(value)) {
          this.favouriteProducts.push(item)
        }
      }
    })

    return this.favouriteProducts
  }

  @action buildSearchResults(searchResults) {
    this.searchResults = []

    for (let item of searchResults) {
      this.searchResults.push(item)
    }

    this.isLoading = false
  }
}

const observableListStore = new ObservableListStore()
export default observableListStore
