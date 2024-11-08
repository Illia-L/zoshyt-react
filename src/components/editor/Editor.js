import { useRef, useState } from 'react';
import './editor.css';
import { InputText } from './InputText';
import { InputImageControls } from './InputImageControls';
import { Content } from './Content';

export default function Editor() {
  const [content, setContent] = useState([]);
  const [insertPosition, setInsertPosition] = useState(0);
  const [editedIndex, setEditedIndex] = useState(null);
  const [imageHandled, setImageHandled] = useState(null);
  const isEditorMode = editedIndex || editedIndex === 0;
  const editedMarkdown = isEditorMode ? content[editedIndex].markdown : null;
  const keyCounter = useRef(0);
  const getNextKey = () => 'element-' + keyCounter.current++;

  function editContent(markdown) {
    if (isEditorMode) {
      const key = content[editedIndex].key;

      setContent(c => c.toSpliced(editedIndex, 1, { key, markdown }));
      setEditedIndex(null);
      return;
    }

    const newElementObj = { key: getNextKey(), markdown };

    setContent(c => c.toSpliced(insertPosition, 0, newElementObj));
    setInsertPosition(i => i + 1);
  }

  return (
    <div className='editor'>
      <Content
        content={content}
        imageHandled={imageHandled}
        editedIndex={editedIndex}
        setContent={setContent}
        setEditedIndex={setEditedIndex}
        setImageHandled={setImageHandled}
      />

      <form
        id='editor-form'
        className='editor-controls'
      >
        <InputText
          editContent={editContent}
          editedMarkdown={editedMarkdown}
        />

        <InputImageControls
          content={content}
          setImageHandled={setImageHandled}
          setContent={setContent}
          editContent={editContent}
          isNewImageDisabled={!!editedIndex}
        />
      </form>
    </div>
  );
}
