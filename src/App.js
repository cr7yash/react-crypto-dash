import React, { Component } from 'react';
import './App.css'
import styled from 'styled-components'
import Bar from './components/Bar'
const cc = require('cryptocompare')

const AppLayout = styled.div`
  padding: 40px;
`

const Content = styled.div`
`

const checkFirstVisit = () => {
  const cryptoDashData = localStorage.getItem('cryptoDash')
  if (!cryptoDashData) {
    return {
      firstVisit: true,
      page: 'settings',
    }
  }

  return {}
}

class App extends Component {

  state = {
    page: 'settings',
    ...checkFirstVisit()
  }

  displayingDashboard = () => this.state.page === 'dashboard'
  displayingSettings  = () => this.state.page === 'settings'

  firstVisitMessage = () => (
    this.state.firstVisit ? <div>Welcome to CryptoDash, please select your favorite coins to begin.</div> : false
  )

  confirmFavorites = () => {
    localStorage.setItem('cryptoDash', 'true')
    this.setState({ firstVisit: false, page: 'dashboard' })
  }

  settingsContent = () => (
    <div>
      { this.firstVisitMessage() }
      <div onClick={this.confirmFavorites}>
        Confirm Favorites
      </div>
    </div>
  )

  loadingContent = () => (
    !this.state.coinsList ? <div>Loading coins...</div> : false
  )

  fetchCoins = async () => {
    try {
      const coinsList = (await cc.coinList()).Data
      this.setState({ coinsList: coinsList })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount = () => {
    this.fetchCoins()
  }

  render() {
    return (  
      <AppLayout>
        { Bar.call(this) }

        {this.loadingContent() ||
          <Content>
            { this.displayingSettings() && this.settingsContent() }
          </Content>}

      </AppLayout>
    )
  }
}

export default App;
