import { useEffect } from 'react';
import { messageContext } from './AppContextHolder';

export default function ConnectionMode() {
  useEffect(() => {
    const handleStatusChange = () => {
      const status = navigator?.onLine;
      if (!status) {
        messageContext?.info(
          "You're offline. Please check your internet connection."
        );
      } else {
        messageContext?.success("We're back online.");
      }
    };

    window.addEventListener('online', handleStatusChange);

    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);

      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);
  return null;
}
