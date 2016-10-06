import React, { Component } from 'react'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    NavigatorIOS
} from 'react-native'

class AppNavigator extends Component {
  renderScene(route, navigator) {
    return <route.component {...route.passProps} navigator={navigator} />
  }

  render() {
    return (
        <NavigatorIOS
            initialRoute={ this.props.initialRoute }
            ref="appNavigator"
            style={styles.navigatorStyles}
            renderScene={(route, navigator) => { return this.renderScene(route, navigator) }}
            configureScene={(route) => ({
              ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight
            })} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  navigatorStyles: {
    flex: 1
  }
})

module.exports = AppNavigator