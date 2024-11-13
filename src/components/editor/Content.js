import { useEffect, useRef, useState } from 'react';
import { ContentItem } from './ContentItem';
import Menu from './Menu';

export function Content({
  content,
  editedIndex,
  imageHandled,
  keyToAddAfterOrFirst,
  textareaRef,
  setContent,
  setEditedIndex,
  setImageHandled,
  setKeyToAddAfterOrFirst,
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [indexMenuOn, setIndexMenuOn] = useState(null);
  const [menuCoords, setMenuCoords] = useState({ x: 0, y: 0 });
  const contentRef = useRef(null);

  function handleDrop(index) {
    if (index === null || index === draggedIndex) return;

    const updatedContent = [...content];
    const [draggedItem] = updatedContent.splice(draggedIndex, 1);

    updatedContent.splice(index, 0, draggedItem);

    const dropKey = content[index].key;
    const isDropAfterAnAddAfter = dropKey === keyToAddAfterOrFirst;
    const isDropAfterLast = index === content.length - 1;

    if (isDropAfterAnAddAfter && isDropAfterLast)
      setKeyToAddAfterOrFirst(draggedIndex);

    const draggedKey = content[draggedIndex].key
    const isDraggedAnAddAfter = draggedKey === keyToAddAfterOrFirst;
    const isDraggedNotFirst = draggedIndex > 0;

    if (isDraggedAnAddAfter && isDraggedNotFirst)
      setKeyToAddAfterOrFirst(content[draggedIndex - 1].key);
    
    if (isDraggedAnAddAfter && !isDraggedNotFirst)
      setKeyToAddAfterOrFirst(content[1].key);

    setContent(updatedContent);
    setDraggedIndex(null);
  }

  function scrollContent() {
    const renderedContent = contentRef.current;

    if (renderedContent && renderedContent.scrollHeight > window.innerHeight) {
      renderedContent.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  useEffect(scrollContent, [content]);

  useEffect(() => {
    if (!imageHandled) return;

    const image = document.getElementById(`${imageHandled}-img`);

    if (image.complete) return scrollContent();

    image.addEventListener('load', () => {
      scrollContent();
    });

    setImageHandled(null);

    return () => image.removeEventListener('load', scrollContent);
  }, [imageHandled]);

  return (
    <>
      {indexMenuOn !== null && (
        <Menu
          content={content}
          indexMenuOn={indexMenuOn}
          menuCoords={menuCoords}
          setIndexMenuOn={setIndexMenuOn}
          setContent={setContent}
          setEditedIndex={setEditedIndex}
          setKeyToAddAfterOrFirst={setKeyToAddAfterOrFirst}
        />
      )}

      <div
        className='editor-content'
        ref={contentRef}
      >
        {content.map((elementObj, index) => (
          <ContentItem
            elementObj={elementObj}
            index={index}
            draggedIndex={draggedIndex}
            keyToAddAfterOrFirst={keyToAddAfterOrFirst}
            indexMenuOn={indexMenuOn}
            setContent={setContent}
            setEditedIndex={setEditedIndex}
            setDraggedIndex={setDraggedIndex}
            handleDrop={handleDrop}
            setKeyToAddAfterOrFirst={setKeyToAddAfterOrFirst}
            setIndexMenuOn={setIndexMenuOn}
            setMenuCoords={setMenuCoords}
            key={elementObj.key}
          />
        ))}
      </div>
    </>
  );
}
