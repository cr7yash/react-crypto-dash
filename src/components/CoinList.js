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
      {coinKeys.map(coin => (
        <CoinTile favorite={favorites} key={coin}>
          <CoinHeaderGrid>
            <div>{ this.state.coinList[coin].CoinName }</div>
            <CoinSymbol>{ this.state.coinList[coin].Symbol }</CoinSymbol>
          </CoinHeaderGrid>
          <img style={{height: '50px'}} src={`http://cryptocompare.com/${this.state.coinList[coin].ImageUrl}`} alt={this.state.coinList[coin].CoinName} />
        </CoinTile>
      ))}
    </CoinGrid>
  )
}