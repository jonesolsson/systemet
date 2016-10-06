import React, { Component } from 'react'
import Helpers from './Helpers'
import ProductDetails from './ProductDetails'
import ListStore from '../mobx/listStore'

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView
} from 'react-native'

class ProductsList extends Component {
  render() {
    const item = this.props.data
    const helpers = new Helpers

    return (
        <TouchableOpacity onPress={() => this.renderProductDetails(item)}>
          <View style={styles.searchResult}>
            <View style={styles.leftContainer}>
              <Text style={styles.productName}>{ item.name }</Text>
              <Text style={styles.productSubName}>{ item.name_2 }</Text>
              <Text>{ item.country.name }</Text>
            </View>
            <View style={styles.rightContainer}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.productPrice}>{ helpers.fixPrice(item.price) }:-</Text>
                <Text style={styles.productVolume}>{ helpers.fixVolume(item.volume) } ml</Text>
              </View>
            </View>
            {item.tags ?
              <View>
                { item.tags.map(function(tag, i) {
                  // TODO: render tags on product
                })}
              </View> : null }
          </View>
        </TouchableOpacity>
    )
  }

  renderProductDetails(product) {
    this.props.navigator.push({
      component: ProductDetails,
      title: product.name,
      passProps: {
        product: product,
        store: ListStore
      }
    })
  }
}

const styles = StyleSheet.create({
  searchResult: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eee'
  },
  leftContainer: {
    flex: 3,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5
  },
  productSubName: {
    marginBottom: 10
  },
  productPrice: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productVolume: {
    marginBottom: 5
  }
})

module.exports = ProductsList