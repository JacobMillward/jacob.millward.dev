import { useRef, useEffect, useCallback } from 'preact/hooks';
import './TermContent.scss';

interface TermContentProps {
    content: string[];
    processInput: (input: string) => void;
}

const TermContent = ({ content, processInput }: TermContentProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleFocus = (event: FocusEvent) => {
          if ((event.target as Element)?.closest('.term-container')) {
            inputRef.current?.focus();
          }
        };
    
        document.addEventListener('focusin', handleFocus);
    
        return () => {
          document.removeEventListener('focusin', handleFocus);
        };
      }, []);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (outputRef.current)
            outputRef.current.scrollTop = outputRef.current?.scrollHeight;
    }, [content]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === '`') {
            event.preventDefault();
            return;
        }
    
        if (event.key === 'Enter') {
            var input = (event.target as HTMLInputElement);
            if (!input.value.trim()) return;
            
           processInput(input.value);

            input.value = '';
        }
    }, []);

    return (
        <div className="term-container" tabIndex={-1}>
            <div className="term-output" ref={outputRef}>
                {content.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
            <div className="term-prompt">
                &gt;{' '}
                <input
                    ref={inputRef}
                    type="text"
                    className="term-input"
                    onKeyDown={handleKeyDown}
                />
            </div>

        </div>
    );
};

export default TermContent;