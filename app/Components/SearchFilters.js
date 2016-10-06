import React, { Component } from 'React'
import ListStore from '../mobx/listStore'
import ButtonList from './ButtonList'

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native'

class SearchFilters extends Component {
  render() {
    const filters = Object.keys(ListStore.filters).map(function (filter, i) {
      return <ScrollView
          key={i}
          contentContainerStyle={styles.content}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          automaticallyAdjustContentInsets={false}
        >
        <ButtonList endpoint={filter} />
      </ScrollView>
    })

    return (
        <View>
          { filters }
        </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
  }
})

module.exports = SearchFilters
