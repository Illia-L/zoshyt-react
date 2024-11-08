import { useEffect, useRef, useState } from 'react';

export function InputText({ editContent, editedMarkdown }) {
  const [text, setText] = useState(editedMarkdown || '');
  const textareaRef = useRef(null)

  useEffect(() => {
    const textarea = textareaRef.current
    textarea.style.height = 'auto'; // Reset height to calculate new scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
  }, [text])

  useEffect(() => {
    setText(editedMarkdown || '');
  }, [editedMarkdown]);

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return;

    e.preventDefault();
    editContent(e.target.value);
    setText('');
  }

  return (
    <textarea
      ref={textareaRef}
      className='editor-input-text'
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
    ></textarea>
  );
}
