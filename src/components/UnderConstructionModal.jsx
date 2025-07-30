import { useEffect, useState } from 'react';

export default function UnderConstructionNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('visited');
    if (!hasVisited) {
      setShow(true);
      localStorage.setItem('visited', 'true');
    }
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed bottom-6 right-4 z-50 bg-gray-800 px-2 py-1 text-xs text-white cursor-pointer transition-opacity duration-300 hover:opacity-90"
      onClick={() => setShow(false)}
    >
      Este sitio está en construcción
    </div>
  );
}
