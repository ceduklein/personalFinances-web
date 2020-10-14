import React from 'react';

export default function NavBarItem({render, ...props}) {

  if(render) {
    return(
      <li className="nav-item">
        <a className="nav-link" onClick={props.onClick} href={props.href}>{props.title}</a>
      </li>
    )
  } else {
    return false;
  }


}