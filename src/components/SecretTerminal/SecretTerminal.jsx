import { useState, useEffect } from 'preact/hooks';
import './SecretTerminal.css';

const Terminal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === '`')
        setIsVisible((prev) => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={`secret-terminal ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="secret-terminal-content">
        {/* Terminal content goes here */}
        <p>Terminal Window</p>
      </div>
    </div>
  );
};

export default Terminal;