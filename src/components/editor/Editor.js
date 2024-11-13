import { useEffect, useRef, useState } from 'react';
import './editor.css';
import { InputText } from './InputText';
import { InputImageControls } from './InputImageControls';
import { Content } from './Content';
import Tooltip from './Tooltip';

export default function Editor() {
  const [content, setContent] = useState([]);
  const [keyToAddAfterOrFirst, setKeyToAddAfterOrFirst] =
    useState('_add-first');
  const [editedIndex, setEditedIndex] = useState(null);
  const [imageHandled, setImageHandled] = useState(null);
  const isEditorMode = editedIndex || editedIndex === 0;
  const editedMarkdown = isEditorMode ? content[editedIndex].markdown : null;
  const keyCounter = useRef(0);
  const textareaRef = useRef(null);
  const getNextKey = () => 'element-' + keyCounter.current++;

  function editContent(markdown) {
    if (isEditorMode) {
      const key = content[editedIndex].key;

      setContent(c => c.toSpliced(editedIndex, 1, { key, markdown }));
      setEditedIndex(null);
      return;
    }

    const newKey = getNextKey();
    const newElementObj = { key: newKey, markdown };

    if (keyToAddAfterOrFirst === '_add-first') {
      setContent(c => [newElementObj, ...content]);
    } else {
      const positionToInsert = content.findIndex(
        item => item.key === keyToAddAfterOrFirst
      );

      setContent(c => c.toSpliced(positionToInsert + 1, 0, newElementObj));
    }

    setKeyToAddAfterOrFirst(newKey);
  }

  useEffect(() => {
    if (content.length === 0) return;
    if (keyToAddAfterOrFirst === '_add-first') return;

    const isInContent = !!content.find(
      item => item.key === keyToAddAfterOrFirst
    );

    if (isInContent) return;

    setKeyToAddAfterOrFirst(content.at(-1).key);
  }, [content]);

  useEffect(() => {
    textareaRef.current.focus()
  }, [content, editedIndex, keyToAddAfterOrFirst])

  return (
    <div className='editor'>
      <Content
        content={content}
        imageHandled={imageHandled}
        editedIndex={editedIndex}
        keyToAddAfterOrFirst={keyToAddAfterOrFirst}
        textareaRef={textareaRef}
        setContent={setContent}
        setEditedIndex={setEditedIndex}
        setImageHandled={setImageHandled}
        setKeyToAddAfterOrFirst={setKeyToAddAfterOrFirst}
      />

      <form
        id='editor-form'
        className='editor-controls'
      >
        <InputText
          editContent={editContent}
          editedMarkdown={editedMarkdown}
          textareaRef={textareaRef}
        />

        <InputImageControls
          content={content}
          setImageHandled={setImageHandled}
          setContent={setContent}
          editContent={editContent}
          isNewImageDisabled={!!editedIndex}
        />

        <Tooltip><MarkdownTooltip/></Tooltip>
      </form>
    </div>
  );
}

function MarkdownTooltip() {
  return (
    <ul className='markdown-tooltip'>
      <li><span>#&nbsp;</span> Header 1</li>
      <li><span>##&nbsp;</span> Header 2</li>
      <li><span>###&nbsp;</span> Header 3</li>
      <li><span>####&nbsp;</span> Header 4</li>
      <li><span>-&nbsp;</span> List item</li>
      <li><span>[]&nbsp;</span> Checkbox</li>
      <li><span>[click me](url)</span> Link <span className='fake-link'>click me</span></li>
      <li><span>**bold**</span> <b>bold</b> text</li>
      <li><span>*italic*</span> <i>italic</i> text</li>
      <li><span>***bold italic***</span> <b><i>bold italic</i></b> text</li>
      <p>When on ukrainian keyboard:</p>      
      <ul>
        <li><span>[</span> - use (Alt + х)</li>
        <li><span>]</span> - use (Alt + ї) </li>
        <li><span>#</span> - use (Alt + 3) </li>
      </ul>
    </ul>
  )
}