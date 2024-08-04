import { useState, useEffect, useCallback, useMemo } from 'preact/hooks';
import TermContent from './TermContent';
import { executeCommand } from './Commands';

import './Term.scss';

const Term = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  const [content, setContent] = useState<string[]>([]);

  const termControl = useMemo(() => ({
    exitTerm: () => setIsVisible(false),
  }), []);

  const processInput = useCallback((input: string) => {
    const newLine = `> ${input}`;
    setContent(lines => [...lines, newLine]);

    // Process input
    const output = executeCommand(input, termControl);
    setContent(lines => [...lines, ...output]);
  }
    , []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '`') {
        if (!isVisible) {
          setIsRendered(true);
          setTimeout(() => setIsVisible(true), 10);
        } else {
          setContent(lines => [
            ...lines,
            `--- Session disconnected ${new Date().toUTCString()} ---`,
          ]);
          setIsVisible(false);
          setTimeout(() => setIsRendered(false), 300);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  // Load content from local storage on first render
  useEffect(() => {
    const storedContent = localStorage.getItem('term-content');
    if (storedContent) {
      const parsedContent = JSON.parse(storedContent);
      if (Array.isArray(parsedContent)
        && parsedContent.every((item: any) => typeof item === 'string')) {
        setContent(parsedContent);
      }
    }
  }, []);

  // Save content to local storage
  useEffect(() => {
    localStorage.setItem('term-content', JSON.stringify(content));
  }, [content]);

  if (!isRendered) return null;

  return (
    <div className={`term ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="term-content">
        <TermContent content={content} processInput={processInput} />
      </div>
    </div>
  );
};

export default Term;