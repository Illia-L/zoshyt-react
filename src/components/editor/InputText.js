import { useEffect, useRef, useState } from 'react';

export function InputText({ editContent, editedMarkdown, textareaRef }) {
  const [text, setText] = useState(editedMarkdown || '');
  // const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto'; // Reset height to calculate new scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
  }, [text]);

  useEffect(() => {
    setText(editedMarkdown || '');
  }, [editedMarkdown]);

  function handleKeyDown(e) {
    if(e.altKey && e.key === '3') {setText(t => t + '#')}
    if(e.altKey && e.key === 'х') {setText(t => t + '[')}
    if(e.altKey && e.key === 'ї') {setText(t => t + ']')}
      
    if (e.key === 'Enter') {
      e.preventDefault();
      editContent(e.target.value);
      setText('');
    }
  }

  return (
    <textarea
      autoFocus
      ref={textareaRef}
      className='editor-input-text'
      value={text}
      onChange={e => setText(e.target.value)}
      onKeyDown={handleKeyDown}
    ></textarea>
  );
}
