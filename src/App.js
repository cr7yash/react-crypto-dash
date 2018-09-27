import React, { Component } from 'react';
import './App.css'
import styled, { css } from 'styled-components'
import Bar from './components/Bar'

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
      page: 'settings'
    }
  }

  return {}
}

class App extends Component {

  state = {
    page: 'dashboard',
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

  render() {
    return (  
      <AppLayout>
        { Bar.call(this) }
        <Content>
          { this.displayingSettings() && this.settingsContent() }
        </Content>
      </AppLayout>
    )
  }
}

export default App;
