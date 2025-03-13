
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Check for user preference when component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`theme-toggle ${isDark ? 'dark' : ''}`}
    >
      {isDark ? (
        <Moon className="h-5 w-5 text-muted-foreground" />
      ) : (
        <Sun className="h-5 w-5 text-muted-foreground" />
      )}
    </Button>
  );
};

export default AdminThemeToggle;
