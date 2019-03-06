import React from 'react';
import './Button.scss';

const Button = ({ shape = 'primary', children }) => (
    <button className={`Button Button--${shape}`}>{children}</button>
);

export default Button;
