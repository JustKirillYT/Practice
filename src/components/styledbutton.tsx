import styled from 'styled-components';

interface ButtonProps {
  backgroundColor?: string;
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) => props.backgroundColor || 'blue'};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
`;

const Button = () => {
  return <StyledButton backgroundColor="green">Click me</StyledButton>;
};
export default StyledButton;