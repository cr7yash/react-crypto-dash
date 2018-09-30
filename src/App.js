import React, { Component } from 'react'
import './App.css'

// Components
import Bar from './components/Bar'
import CoinList from './components/CoinList'
import Search from './components/Search'

// Libs
import styled from 'styled-components'
import _ from 'lodash'
import { ConfirmButton } from './styles/ConfirmButton';
const cc = require('cryptocompare')


const AppLayout = styled.div`
  padding: 40px;
`

const CenterDiv = styled.div`
  display: grid;
  justify-content: center;
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

const MAX_FAVORITES = 10

class App extends Component {

  state = {
    page: 'settings',
    favorites: ['ETH', 'BTC', 'XMR', 'EOS', 'DOGE'],
    filteredCoins: false,
    ...checkFirstVisit(),
  }


  displayingDashboard = () => this.state.page === 'dashboard'
  displayingSettings  = () => this.state.page === 'settings'

  firstVisitMessage = () => (
    this.state.firstVisit ? <div>Welcome to CryptoDash, please select your favorite coins to begin.</div> : false
  )

  confirmFavorites = () => {
    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites: this.state.favorites
    }))
    this.setState({ firstVisit: false, page: 'dashboard' })
  }

  isInFavorites = coinKey => _.includes(this.state.favorites, coinKey)

  addCoinToFavorites = (coinKey) => {
    let favorites = [...this.state.favorites]
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(coinKey)
      this.setState({ favorites })
    }
  }

  removeCoinToFavorites = (coinKey) => {
    let favorites = [...this.state.favorites]
    _.pull(favorites, coinKey)
    this.setState({ favorites  })
  }

  settingsContent = () => (
    <div>
      { this.firstVisitMessage() }
      <div>
        { CoinList.call(this, true) }
        <CenterDiv>
          <ConfirmButton onClick={this.confirmFavorites}>
              Confirm Favorites
          </ConfirmButton>
        </CenterDiv>
        { Search.call(this) }
        { CoinList.call(this) }
      </div>
    </div>
  )

  loadingContent = () => (
    !this.state.coinList ? <div>Loading coins...</div> : false
  )

  handleFilter = _.debounce((inputValue) => {
    const regex = new RegExp(inputValue.trim(), 'i')
    const filteredCoins = {}
    for (let coinSymbol in this.state.coinList) {
      const coin = this.state.coinList[coinSymbol]
      if (regex.test(coin.CoinName) || regex.test(coin.Symbol)) {
        filteredCoins[coinSymbol] = coin
      }
    }
    this.setState({ filteredCoins })
  }, 500)

  filterCoins = (e) => {
    const inputValue = _.get(e, 'target.value')
    if (inputValue)
      this.handleFilter(inputValue)
    else
      this.setState({ filteredCoins: false })
  }

  fetchCoins = async () => {
    try {
      const coinList = (await cc.coinList()).Data
      this.setState({ coinList: coinList })
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
