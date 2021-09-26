import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

export default function Menu() {
  const dispatch = useDispatch();
  const {route} = useSelector((state) => state.routes);
  const menus = [
    {name: 'All Pokemon', to: '/'},
    {name: 'My Collections', to: '/my-collections'},
  ];

  return (
    <div className="menu">
      {menus.map((val, idx) => (
        <Link
          key={idx}
          className={`menu-item ${route === val.to ? 'selected' : ''}`}
          onClick={() => {
            dispatch({type: 'CHANGE_ROUTE', payload: val.to});
          }}
          to={val.to}
        >
          <span className="menu-text">{val.name}</span>
        </Link>
      ))}
    </div>
  );
}
