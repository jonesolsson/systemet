import React, { Component } from 'react'
import { observer } from 'mobx-react/native'

import ProductsList from './ProductsList'

import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    ListView
} from 'react-native'

@observer
class FavouritesView extends Component {
  dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
  })

  render() {
    const favouriteProducts = this.props.store.favouriteProductsList
    return(
        <View style={styles.container}>
          <ListView
              automaticallyAdjustContentInsets={false}
              dataSource={this.dataSource.cloneWithRows(favouriteProducts.slice())}
              renderRow={row => <ProductsList navigator={this.props.navigator} data={row} />}
              enableEmptySections={true}
              renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          />
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
  texten: {
    color: 'dodgerblue'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  }
})

module.exports = FavouritesView