import React, { Component } from 'react'
import AppNavigator from './app/Navigation/AppNavigator'
import Icon from 'react-native-vector-icons/FontAwesome'
import ListStore from './app/mobx/listStore'
import AppView from './app/Components/AppView'
import FavouritesView from './app/Components/FavouritesView'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS
} from 'react-native'

class Systemet extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedTab: 'AppView'
    }
  }

  render() {
    return (
        <TabBarIOS
            selectedTab={this.state.selectedTab}>
          <Icon.TabBarItemIOS
            selected={this.state.selectedTab === 'AppView'}
            title={''}
            iconName='home'
            onPress={() => this.setState({selectedTab: 'AppView'})} >
            <AppNavigator
                initialRoute={{
                  component: AppView,
                  title: 'Systemet',
                  passProps: {
                    store: ListStore
                  }
                }}/>
        </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
              selected={this.state.selectedTab === 'FavouritesView'}
              title={''}
              iconName='star'
              onPress={() => this.setState({selectedTab: 'FavouritesView'})} >
          <AppNavigator
              initialRoute={{
                component: FavouritesView,
                title: 'Favoriter',
                passProps: {
                  store: ListStore
                }
              }} />
          </Icon.TabBarItemIOS>
        </TabBarIOS>
    )
  }
}

AppRegistry.registerComponent('Systemet', () => Systemet)
