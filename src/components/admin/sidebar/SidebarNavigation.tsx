
import React from 'react';
import SidebarLink from './SidebarLink';
import { navLinks } from './navlinks';

const SidebarNavigation: React.FC = () => {
  return (
    <nav className="flex-grow p-4">
      <ul className="space-y-1">
        {navLinks.map((link) => (
          <li key={link.title} className="mb-1">
            <SidebarLink
              link={{
                icon: link.icon,
                text: link.title,
                href: link.href,
              }}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNavigation;
