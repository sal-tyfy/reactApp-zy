import { useEffect } from 'react';
export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    setTimeout(() => {
      document.title = title;
    }, 0);
  }, [title]);
};
