import React from 'react'
import styled from 'styled-components'
import { bgColor2, fontSize2 } from '../styles/Styles'
import { WhiteText } from '../styles/Text'

const SearchContainer = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  grid-gap: 20px;
`
const SearchInput = styled.input`
  width: 200px;
  ${bgColor2}
  color: #1163c9;
  border: 1px solid;
  ${fontSize2}
  margin: 5px;
  height: 25px;
  outline: none;
`

export default function () {
  return (
    <SearchContainer>
      <WhiteText>Search all coins</WhiteText>
      <SearchInput onKeyUp={this.filterCoins} />
    </SearchContainer>
  )
}