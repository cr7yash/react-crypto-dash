import styled from 'styled-components'
import { fontSize1, greenBoxShadow } from './Styles';

export const ConfirmButton = styled.button`
  margin: 20px;
  width: auto;
  ${fontSize1}
  font-family: 'Exo 2', sans-serif;
  padding: 5px;
  background-color: transparent;
  color: #42ff3a !important;
  border: none;
  padding: 10px 30px;
  &:hover {
    ${greenBoxShadow}
    cursor: pointer;
  }
`