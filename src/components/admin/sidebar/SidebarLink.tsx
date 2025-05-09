
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { NavLinkProps } from './types';

interface SidebarLinkProps {
  link: NavLinkProps;
  openSubMenu: string | null;
  toggleSubMenu: (text: string) => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ link, openSubMenu, toggleSubMenu }) => {
  const location = useLocation();
  const hasSublinks = link.subLinks && link.subLinks.length > 0;

  if (hasSublinks) {
    return (
      <div>
        <button
          className="flex items-center justify-between w-full py-2 px-4 rounded hover:bg-gym-dark transition-colors duration-200"
          onClick={() => toggleSubMenu(link.text)}
        >
          <div className="flex items-center">
            <link.icon className="mr-2 h-4 w-4" />
            <span>{link.text}</span>
          </div>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              openSubMenu === link.text ? 'rotate-180' : ''
            )}
          />
        </button>
        {/* Submenu */}
        <ul
          className={cn(
            'ml-4 mt-1 overflow-hidden transition-all duration-300',
            openSubMenu === link.text ? 'max-h-96' : 'max-h-0'
          )}
        >
          {link.subLinks.map((subLink) => (
            <li key={subLink.text} className="mb-1">
              <Link
                to={subLink.href}
                className={cn(
                  'block py-2 px-4 rounded hover:bg-gym-dark transition-colors duration-200',
                  location.pathname === subLink.href
                    ? 'text-gym-orange'
                    : 'text-white/80'
                )}
              >
                {subLink.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <Link
      to={link.href}
      className={cn(
        'flex items-center py-2 px-4 rounded hover:bg-gym-dark transition-colors duration-200',
        location.pathname === link.href ? 'text-gym-orange' : 'text-white/80'
      )}
    >
      <link.icon className="mr-2 h-4 w-4" />
      <span>{link.text}</span>
    </Link>
  );
};

export default SidebarLink;
