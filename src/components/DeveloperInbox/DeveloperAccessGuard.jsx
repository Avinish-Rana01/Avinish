import React, { useState, useEffect } from 'react';
import DeveloperAccessDialog from './DeveloperAccessDialog';
import DeveloperInbox from './DeveloperInbox';

const DeveloperAccessGuard = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Ctrl + Shift + M
      if (e.ctrlKey && e.shiftKey && (e.key === 'm' || e.key === 'M')) {
        e.preventDefault();
        
        if (!isAuthenticated) {
          setIsDialogOpen((prev) => !prev);
        } else {
          // If already authenticated, toggle inbox visibility (or maybe just keep it open?
          // The prompt says "Open a small command palette". We'll just toggle authentication to off if they press it again,
          // or we can handle inbox closing within the inbox itself. Let's just open the dialog if not authenticated.)
          setIsDialogOpen(false);
          // Optional: if they press the shortcut again while authenticated, do they want to close it?
          // We can just let the Inbox's own Close button handle closing.
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isAuthenticated]);

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setIsAuthenticated(true);
  };

  const handleCloseInbox = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      {children}
      
      <DeveloperAccessDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />

      <DeveloperInbox
        isOpen={isAuthenticated}
        onClose={handleCloseInbox}
      />
    </>
  );
};

export default DeveloperAccessGuard;
