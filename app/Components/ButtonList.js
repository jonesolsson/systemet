import React, { Component } from 'React'
import { observer } from 'mobx-react/native'
import ListStore from '../mobx/listStore'
import Helpers from './Helpers'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'

@observer
class ButtonList extends Component {
  constructor(props) {
   super(props)

   this.state = {
     activeFilter: false
   }
  }
  componentDidMount() {
    ListStore.get(this.props.endpoint)
  }

  render() {
    const helpers = new Helpers()
    const endpoint = helpers.stringToVariable(this.props.endpoint)
    const b = this

    const ButtonList = endpoint.map(function (item, i) {
      let paramObject = {}
        paramObject[b.props.endpoint] = item.id

      let buttonStyles = []

      if (item.active) {
        buttonStyles.push(styles.active)
      }

      return <TouchableOpacity
          key={i}
          style={ (i !== 0) ? styles.filterBox : [styles.filterBox, styles.noMargin, buttonStyles] }
          onPressIn={() => b.updateSearchParams(paramObject, item, endpoint)}
          onPress={() => b.filterSearch()} >
            <Text style={ (item.active) ? {color: '#fff'} : {color: '#333'}}>{item.name}</Text>
          </TouchableOpacity>
    })

    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {ButtonList}
        </View>
    )
  }

  objectExists(obj, key, value) {
    return obj.hasOwnProperty(key) && obj[key] == value;
  }

  updateSearchParams(params, filterItem, endpoint) {
    let currentParams = JSON.parse(JSON.stringify(params))

    for (let paramKey in currentParams) {
      if (this.objectExists(ListStore.params, paramKey, currentParams[paramKey])) {
        if (currentParams[paramKey] !== "") {
          currentParams[paramKey] = ''
        }
      }
    }
    console.log(typeof endpoint)
    console.log(ListStore.filters.tag)

    if (!filterItem.active) {
      filterItem.active = true
    } else {
      filterItem.active = false
    }

    this.setState({
      activeFilter: true
    })

    Object.assign(ListStore.params, currentParams)
  }

  filterSearch() {
    ListStore.get('product')
  }
}

const styles = StyleSheet.create({
  filterBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 80,
    marginLeft: 10,
    height: 50,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noMargin: {
    marginLeft: 0
  },
  active: {
    backgroundColor: '#333',
  }
})

module.exports = ButtonList