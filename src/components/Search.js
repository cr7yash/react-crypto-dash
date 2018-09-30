import React from 'react'
import styled from 'styled-components'
import { bgColor2, fontSize2 } from '../styles/Styles'

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
      <h2>Search all coins</h2>
      <SearchInput onKeyUp={this.filterCoins} />
    </SearchContainer>
  )
}