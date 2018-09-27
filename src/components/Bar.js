import React from 'react';
import styled, { css } from 'styled-components'

const Logo = styled.div`
  font-size: 1.5em;
`

const ControlButton = styled.a`
  cursor: pointer;
  ${props => props.active && css`
    text-shadow: 0px 0px 60px #03ff03;
    font-size: 1.2em;
  `}
`

const Bar = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
  padding-bottom: 40px;
`


export default function() {
  return (
    <Bar>
      <Logo>
        CryptoDash
      </Logo>

      <div></div>

      {!this.state.firstVisit && (
        <ControlButton onClick={() => this.setState({ page: 'dashboard' })} active={this.displayingDashboard()}>
          Dashboard
        </ControlButton>
      )}

      <ControlButton onClick={() => this.setState({ page: 'settings' })} active={this.displayingSettings()}>
        Settings
      </ControlButton>
    </Bar>
  )
}
