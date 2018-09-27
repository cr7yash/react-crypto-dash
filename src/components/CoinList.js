import React from 'react'
import styled, { css } from 'styled-components'
import { subtleBoxShadow, greenBoxShadow, lightBlueBackground, redBoxShadow } from '../styles/Styles'

const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
  margin-top: 40px;
`

const CoinTile = styled.div`
  ${subtleBoxShadow}
  ${lightBlueBackground}
  padding: 10px;
  cursor: pointer;

  &:hover {
    ${greenBoxShadow};
  }

  ${props => props.favorite && css`
    &:hover {
      ${redBoxShadow}
    }
  `}
`

const CoinHeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const CoinSymbol =  styled.div`
  justify-self: right;
`

export default function (favorites = false) {
  const coinKeys = favorites ? this.state.favorites : Object.keys(this.state.coinList).slice(0, 50)
  return (
    <CoinGrid>
      {coinKeys.map(coinKey => (
        <CoinTile 
          favorite={favorites} 
          key={coinKey} 
          onClick={favorites ? () => this.removeCoinToFavorites(coinKey) : () => this.addCoinToFavorites(coinKey)}>

          <CoinHeaderGrid>
            <div>{ this.state.coinList[coinKey].CoinName }</div>
            <CoinSymbol>{ this.state.coinList[coinKey].Symbol }</CoinSymbol>
          </CoinHeaderGrid>

          <img style={{height: '50px'}} src={`http://cryptocompare.com/${this.state.coinList[coinKey].ImageUrl}`} alt={this.state.coinList[coinKey].CoinName} />
        </CoinTile>
      ))}
    </CoinGrid>
  )
}