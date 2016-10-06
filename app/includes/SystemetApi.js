import ListStore from '../mobx/listStore'

import {
    AsyncStorage
} from 'react-native'

class SystemetApi {
  getData(endpoint, params) {

    if (params !== '') {
      params = Object.keys(params).map(function (prop) {
        return [prop, params[prop]].map(encodeURIComponent).join('=')
      }).join('&')
    }

    fetch(`https://karlroos-systemet.p.mashape.com/${endpoint}/?${params}`, {
      headers: {
        'X-Mashape-Key': 'H7dgx6EtehmshcRlZLmvFO0Nf5olp1yw0XEjsnwKIPnfW4qEHE'
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.prepareApiResult(responseJson, endpoint)
      })
      .catch((error) => {
        console.log(error)
      })
      .done()
  }

  prepareApiResult(result, endpoint) {
    switch(endpoint) {
      case 'tag':
        ListStore.filters.tag = result
        break;

      case 'country':
        ListStore.filters.country = result
        break;

      case 'product':
        ListStore.buildSearchResults(result)
        break;
    }
  }
}

module.exports = SystemetApi
