import styled from 'styled-components'
import { fontSize1, greenBoxShadow, color3 } from './Styles';

export const ConfirmButton = styled.button`
  margin: 20px;
  width: auto;
  ${fontSize1}
  font-family: 'Exo 2', sans-serif;
  padding: 5px;
  background-color: transparent;
  color: ${color3};
  border: none;
  padding: 10px 30px;
  &:hover {
    ${greenBoxShadow}
    cursor: pointer;
  }
`