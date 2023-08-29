import React from 'react';

function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="logo">Kanban Board Task Management</div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Profile</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
