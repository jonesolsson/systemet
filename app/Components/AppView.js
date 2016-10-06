import React, { Component } from 'react'
import { observer } from 'mobx-react/native'
import SearchFilters from './SearchFilters'
import ProductsList from './ProductsList'

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ListView,
    ActivityIndicator
} from 'react-native'

@observer
class AppView extends Component {

  dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
  })

  render() {
    return (
        <View style={styles.container}>
          <TextInput
              style={styles.inputSearch}
              onChangeText={(text) => this.updateSearchParams({name: text})}
              onSubmitEditing={() => this.performSearch()}/>

          <View>
            <SearchFilters />
          </View>

          {this.props.store.isLoading ?
              <View style={styles.loading}>
                <ActivityIndicator
                    size="large"/>
              </View> :

              <ListView
                  automaticallyAdjustContentInsets={false}
                  dataSource={this.dataSource.cloneWithRows(this.props.store.searchResults.slice())}
                  renderRow={row => <ProductsList navigator={this.props.navigator} data={row}/>}
                  enableEmptySections={true}
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
              />
          }
        </View>
    )
  }

  updateSearchParams(param) {
    Object.assign(this.props.store.params, param)
  }

  performSearch() {
    this.props.store.isLoading = true
    this.props.store.get('product')
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#eee'
  },
  inputSearch: {
    height: 55,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 75,
    fontSize: 24,
    paddingLeft: 10,
    backgroundColor: '#fff'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

module.exports = AppView
