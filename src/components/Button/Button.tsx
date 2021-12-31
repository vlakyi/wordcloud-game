import { ButtonHTMLAttributes } from 'react';
import './Button.scss';

// can be extended in the future, for now it's just a simple component
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: Props): JSX.Element => {
  const { children, className = 'game-button', ...rest } = props;

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};

export default Button;
