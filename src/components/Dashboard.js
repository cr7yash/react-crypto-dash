import React from 'react'
import { CoinGrid, CoinTile, CoinHeaderGrid, CoinSymbol } from './CoinList'
import styled, { css } from 'styled-components'
import { fontSizeBig, fontSize3 } from '../styles/Styles';

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

export default function () {

  return (
    <CoinGrid>
      {this.state.prices.map((price, index) => {
        const sym = Object.keys(price)[0]
        const coin = price[sym]['USD']

        return (
          index < 5 ? (<CoinTile key={sym}>
            <CoinHeaderGrid>
              <div>{ sym }</div>
              <CoinSymbol>
                <ChangePct red={coin.CHANGEPCT24HOUR < 0}>
                  { numberFormat(coin.CHANGEPCT24HOUR) }%
                </ChangePct>
              </CoinSymbol>
            </CoinHeaderGrid>
            <TickerPrice>${numberFormat(coin.PRICE)}</TickerPrice>
          </CoinTile>) : (
            <CoinTileCompact>
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
    </CoinGrid>
  )
}