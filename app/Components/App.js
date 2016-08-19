import React, { Component } from 'react'
import { observer } from 'mobx-react/native'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'

@observer
class App extends Component {
  render() {
    return (
      <View style={styles.container}>
          <TextInput
            style={styles.inputSearch} />
      </View>
    )
  }

  get() {
    const name = 'oppigårds'
    fetch(`https://karlroos-systemet.p.mashape.com/product?name=${name}`, {
      headers: {
        'X-Mashape-Key': 'H7dgx6EtehmshcRlZLmvFO0Nf5olp1yw0XEjsnwKIPnfW4qEHE'
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      })
      .catch((error) => {
        console.log(error)
      })
      .done()
  }

  // addListItem() {
  //   this.props.store.addListItem('Numero dos')
  // }
  //
  // render() {
  //   const { list } = this.props.store
  //
  //   console.log(list)
  //   return (
  //     <View style={styles.container}>
  //       {list.map((l, i) => {
  //         return <View key={i} style={styles.itemContainer}>
  //                 <Text>{i} - {l.name.toUpperCase()}</Text>
  //               </View>
  //       })}
  //     <TouchableOpacity onPress={this.addListItem.bind(this)}>
  //       <Text>Click ME</Text>
  //     </TouchableOpacity>
  //     </View>
  //   )
  // }
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
    backgroundColor: '#fff'
  }
})

module.exports = App
