import React from 'react'
import { CoinGrid, CoinTile, CoinHeaderGrid, CoinSymbol } from './CoinList'
import styled, { css } from 'styled-components'
import {
  fontSizeBig, fontSize3, subtleBoxShadow, lightBlueBackground, bgColor2, fontSize2 } from '../styles/Styles';

import highchartsConfig from '../config/Highchart'
import highchartTheme from '../styles/HighchartsTheme'
import * as ReactHighcharts from 'react-highcharts'

ReactHighcharts.Highcharts.setOptions(highchartTheme)

const numberFormat = number => +(number + '').slice(0, 7)

const ChangePct = styled.div`
  color: green;
  ${props => props.red && css`
    color: red;
  `}
`

const TickerPrice = styled.div`
  ${fontSizeBig}
`

const CoinTileCompact = CoinTile.extend`
  ${fontSize3}
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(3, 1fr);
  justify-items: right;
`

const PaddingBlue = styled.div`
  ${subtleBoxShadow}
  ${lightBlueBackground}
  padding: 10px;
`

const ChartGrid = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 30px;
  grid-template-columns: 1fr 4fr;
`

const DashboardFavoriteName = styled.h2`
  margin: 0 0 10px 0;
`

const ChartSelect = styled.select`
  width: 100px;
  ${bgColor2}
  color: #1163c9;
  border: 1px solid;
  ${fontSize2}
  margin: 5px;
  height: 25px;
  outline: none;
  float: right;
`


export default function () {
  const self = this
  
  const updateCurrentFavorite = async sym => {
    await this.setState({ currentFavorite: sym, historical: null })
    localStorage.setItem('cryptoDash', JSON.stringify({
      ...JSON.parse(localStorage.getItem('cryptoDash')),
      currentFavorite: sym
    }))
    this.fetchHistorical()
  }

  return [
    <CoinGrid key={'coin-grid'}>
      {this.state.prices.map((price, index) => {
        const sym = Object.keys(price)[0]
        const coin = price[sym]['USD']
        const tileProps = {
          dashboardFavorite: sym === self.state.currentFavorite,
          onClick: () => updateCurrentFavorite(sym)
        }

        return (
          index < 5 ? (
          <CoinTile key={sym} {...tileProps}>
            <CoinHeaderGrid>
              <div>{ sym }</div>
              <CoinSymbol>
                <ChangePct red={coin.CHANGEPCT24HOUR < 0}>
                  { numberFormat(coin.CHANGEPCT24HOUR) }%
                </ChangePct>
              </CoinSymbol>
            </CoinHeaderGrid>
            <TickerPrice>${ numberFormat(coin.PRICE) }</TickerPrice>
          </CoinTile>) : (
            <CoinTileCompact key={sym} {...tileProps}>
              <div style={{ justifySelf: 'left' }}>{ sym }</div>
              <CoinSymbol>
                <ChangePct red={coin.CHANGEPCT24HOUR}>
                  { numberFormat(coin.CHANGEPCT24HOUR) }
                </ChangePct>
              </CoinSymbol>
              <div>${numberFormat(coin.PRICE)}</div>
            </CoinTileCompact>
          )
        )
      })}
    </CoinGrid>,
    <ChartGrid key={'chart-grid'}>
      <PaddingBlue>
        <DashboardFavoriteName>{ this.state.currentFavorite && this.state.coinList[this.state.currentFavorite].CoinName }</DashboardFavoriteName>
        <img style={{ height: '200px' }} src={this.state.currentFavorite && `http://cryptocompare.com/${this.state.coinList[this.state.currentFavorite].ImageUrl}`} alt={this.state.currentFavorite && this.state.coinList[this.state.currentFavorite].CoinName} />
      </PaddingBlue>
      <PaddingBlue>
        <ChartSelect
          defaultValue="months"
          onChange={async e => {
            await this.setState({ chartIntervalTime: e.target.value, historical: null })
            this.fetchHistorical()
          }}>
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
        </ChartSelect>
        {this.state.historical ? <ReactHighcharts config={highchartsConfig.call(this)} /> : <div>Loading historical data...</div>}
      </PaddingBlue>
    </ChartGrid>
  ]
}