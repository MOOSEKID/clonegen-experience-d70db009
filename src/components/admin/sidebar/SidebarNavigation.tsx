
import React, { useState } from 'react';
import SidebarLink from './SidebarLink';
import { sidebarLinks } from './navlinks';

const SidebarNavigation: React.FC = () => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (text: string) => {
    setOpenSubMenu(openSubMenu === text ? null : text);
  };

  return (
    <nav className="flex-grow p-4">
      <ul>
        {sidebarLinks.map((link) => (
          <li key={link.text} className="mb-1">
            <SidebarLink
              link={link}
              openSubMenu={openSubMenu}
              toggleSubMenu={toggleSubMenu}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNavigation;
