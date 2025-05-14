
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AdminThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  // Handle theme change with side effects
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
      variant="outline" 
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        "theme-toggle-button relative overflow-hidden transition-colors durationMinutes-300",
        isDark ? "bg-secondary border-secondary" : "bg-white border-slate-200"
      )}
    >
      <div className={cn(
        "absolute inset-0 transform transition-transform durationMinutes-500",
        isDark 
          ? "translate-y-0 bg-gradient-to-br from-slate-800 to-slate-900" 
          : "translate-y-full bg-gradient-to-br from-sky-100 to-white"
      )} />
      
      <div className={cn(
        "relative z-10 transition-all durationMinutes-500 transform",
        isDark ? "rotate-0" : "-rotate-180"
      )}>
        {isDark ? (
          <Moon className="h-5 w-5 text-yellow-300" />
        ) : (
          <Sun className="h-5 w-5 text-yellow-500" />
        )}
      </div>
      
      <span className={cn(
        "absolute bottom-0 left-0 right-0 h-0.5 transform transition-transform durationMinutes-300",
        isDark 
          ? "bg-yellow-300 scale-x-100" 
          : "bg-yellow-500 scale-x-100"
      )} />
    </Button>
  );
};

export default AdminThemeToggle;
