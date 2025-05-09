
import React, { useState } from 'react';
import SidebarLink from './SidebarLink';
import { navLinks } from './navlinks';

const SidebarNavigation: React.FC = () => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (text: string) => {
    setOpenSubMenu(openSubMenu === text ? null : text);
  };

  return (
    <nav className="flex-grow p-4">
      <ul>
        {navLinks.map((link) => (
          <li key={link.title} className="mb-1">
            <SidebarLink
              link={{
                icon: link.icon,
                text: link.title,
                href: link.href,
                subLinks: link.subItems?.map(item => ({ 
                  text: item.title, 
                  href: item.href 
                }))
              }}
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
