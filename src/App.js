import React, { Component } from 'react';

import styled from 'styled-components'

const CustomElement = styled.div`
  color: green;
  font-size: 50px;
`

const BlueElement = CustomElement.extend`
  color: blue;
`

class App extends Component {
  render() {
    return (
      <div>
        <CustomElement>
          Hello!
        </CustomElement>
        <BlueElement>
          Blue one!
        </BlueElement>
      </div>
    )
  }
}

export default App;
