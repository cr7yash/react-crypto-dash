import React from 'react'
import { CoinGrid, CoinTile, CoinHeaderGrid, CoinSymbol } from './CoinList'
import styled, { css } from 'styled-components'
import { fontSizeBig, fontSize3, subtleBoxShadow, lightBlueBackground } from '../styles/Styles';

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

export default function () {
  const self = this

  return [
    <CoinGrid key={'CoinGrid'}>
      {this.state.prices.map((price, index) => {
        const sym = Object.keys(price)[0]
        const coin = price[sym]['USD']
        const tileProps = {
          key: sym,
          dashboardFavorite: sym === self.state.currentFavorite,
          onClick: () => self.setState({ currentFavorite: sym  })
        }

        return (
          index < 5 ? (
          <CoinTile {...tileProps}>
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
            <CoinTileCompact {...tileProps}>
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
    <ChartGrid>
      <PaddingBlue key={'PaddingBlue'}>
        <DashboardFavoriteName>{ this.state.coinList[this.state.currentFavorite].CoinName }</DashboardFavoriteName>
        <img style={{ height: '200px' }} src={`http://cryptocompare.com/${this.state.coinList[this.state.currentFavorite].ImageUrl}`} alt={this.state.coinList[this.state.currentFavorite].CoinName} />
      </PaddingBlue>

      <PaddingBlue>
        Chart goes here...
      </PaddingBlue>
    </ChartGrid>
  ]
}