import React from 'react';
import Menu from './ComponentLayout/Menu';

export default function Layout(props) {
  return (
    <div className="parent">
      <img className="logo" src="/assets/logo/logo.png" alt="logo" />
      <Menu />
      <div className="content-wrapper">
        <div className="content-container">
          <div className="content">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
