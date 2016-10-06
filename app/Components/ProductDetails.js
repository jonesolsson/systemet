import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Helpers from './Helpers'
import { observer } from 'mobx-react/native'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'

@observer
class ProductDetails extends Component {
  saveProduct(product) {
    const newList = this.props.store.favouriteProductsList
    let exists = false

    newList.map(function(item, i) {
      if (item.product_number === product.product_number) {
        newList.remove(item)
        exists = true
      }
    })

    if (!exists) {
      newList.push(product)
    }

    product.favourite = !exists ? true : false

    // AsyncStorage.setItem('favourites', JSON.stringify([]))
    AsyncStorage.setItem('favourites', JSON.stringify(newList))
  }

  findFavourites(product) {
    const favourites = this.props.store.favouriteProductsList

    for (key in favourites.slice()) {
      if (favourites[key].product_number === product.product_number) {
        product = favourites[key]
      }
    }

    return product
  }

  render() {
    const helpers = new Helpers
    const product = this.findFavourites(this.props.product)

    return (
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.productName}>{ product.name }</Text>
            <Text>Nr { product.product_number }</Text>
            {product.name_2 ?
                <Text style={styles.productSubName}>{ product.name_2 }</Text> :
                false
            }
            <Text style={styles.country}>Tillverkad i { product.country.name }</Text>
          </View>
          <View style={styles.rightContainer}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.productPrice}>{ helpers.fixPrice(product.price) }:-</Text>
              <Text>{ helpers.fixVolume(product.volume) }ml</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.saveProduct(product)}>
          <View style={[styles.saveButtonContainer, product.favourite && styles.active]}>
            <Icon name="star" style={[styles.saveButton, product.favourite && styles.activeButton]}></Icon>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    flexDirection: 'column',
    backgroundColor: '#eee',
  },
  detailsContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row'
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
  saveButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  saveButton: {
    fontSize: 30,
    padding: 10,
    color: '#333'
  },
  active: {
    backgroundColor: '#333',
  },
  activeButton: {
    color: '#fff'
  }
})

module.exports = ProductDetails
