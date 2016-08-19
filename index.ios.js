import React, { Component } from 'react'

import ListStore from './app/mobx/listStore'
import App from './app/Components/App'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native'

class Systemet extends Component {
  renderScene (route, navigator) {
    return <route.component {...route.passProps} navigator={navigator} />
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
        initialRoute={{
          component: App,
          passProps: {
            store: ListStore
          }
      }} />
    );
  }

  // get() {
  //   const name = 'oppigårds'
  //   fetch(`https://karlroos-systemet.p.mashape.com/product?name=${name}`, {
  //     headers: {
  //       'X-Mashape-Key': 'H7dgx6EtehmshcRlZLmvFO0Nf5olp1yw0XEjsnwKIPnfW4qEHE'
  //     }
  //   })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log(responseJson)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  //     .done()
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})

AppRegistry.registerComponent('Systemet', () => Systemet)
