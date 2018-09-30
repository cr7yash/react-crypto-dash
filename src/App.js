import React, { Component } from 'react'
import './App.css'

// Components
import Bar from './components/Bar'
import CoinList from './components/CoinList'
import Search from './components/Search'
import Dashboard from './components/Dashboard'

// Libs
import styled from 'styled-components'
import _ from 'lodash'
import moment from 'moment'

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
  const cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'))
  if (!cryptoDashData) {
    return {
      firstVisit: true,
      page: 'settings',
    }
  }

  const { favorites, currentFavorite } = cryptoDashData

  return {
    favorites,
    currentFavorite
  }
}

const MAX_FAVORITES = 10
const TIME_UNITS = 10

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

  confirmFavorites = async () => {
    let currentFavorite = this.state.favorites[0];
    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites: this.state.favorites,
      currentFavorite
    }))
    await this.setState({
      firstVisit: false,
      page: 'dashboard',
      prices: null,
      historical: null,
      currentFavorite,
    })
    this.fetchPrices()
    this.fetchHistorical()
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

  loadingContent = () => {
    if (!this.state.coinList)
      return <div>Loading coins...</div>

    if (!this.state.firstVisit && !this.state.prices)
      return <div>Loading prices...</div>
  }

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

  historical = () => {
    let promises = []
    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(cc.priceHistorical(this.state.currentFavorite, ['USD'], moment().subtract({months: units}).toDate() ))
    }
    return Promise.all(promises)
  }

  prices = () => {
    let promises = []
    this.state.favorites.forEach(sym => {
      promises.push(cc.priceFull(sym, 'USD'))
    })
    return Promise.all(promises)
  }

  fetchHistorical = async () => {
    if (this.state.firstVisit) return;

    const res = await this.historical()
    const historical = [{
      name: this.state.currentFavorite,
      data: res.map((coin, index) => [moment().subtract({ months: TIME_UNITS - index }).valueOf(), coin.USD])
    }]
    this.setState({ historical })
  }

  fetchPrices = async () => {
    if (this.state.firstVisit) return;

    let prices
    try {
      prices = await this.prices()
    } catch (error) {
      this.setState({ error: true })
    }
    this.setState({ prices })
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
    this.fetchPrices()
    this.fetchHistorical()
  }

  render() {
    return (  
      <AppLayout>
        { Bar.call(this) }

        {this.loadingContent() ||
          <Content>
            { this.displayingSettings() && this.settingsContent() }
            { this.displayingDashboard() && Dashboard.call(this) }
          </Content>}

      </AppLayout>
    )
  }
}

export default App;
