import React, { Component } from 'react'
import ListStore from '../mobx/listStore'

class Helpers extends Component {
  fixPrice(price) {
    let str = String(price)
    str = str.replace('.', ':')

    return str
  }

  fixVolume(volume) {
    return volume * 1000
  }

  stringToVariable(string) {
    let varibales = {}
      varibales['tag'] = ListStore.filters.tag
      varibales['country'] = ListStore.filters.country

    return varibales[string]
  }
}

module.exports = Helpers