import { useRef, useState } from 'react';
import { ContentElement } from './ContentElement';
import { parseImage } from './helpers';

export function ContentItem({
  elementObj,
  index,
  draggedIndex,
  keyToAddAfterOrFirst,
  indexMenuOn,
  setContent,
  setEditedIndex,
  setDraggedIndex,
  handleDrop,
  setKeyToAddAfterOrFirst,
  setIndexMenuOn,
  setMenuCoords,
}) {
  const [dragOverClass, setDragOverClass] = useState(null);
  const [clickTimeout, setClickTimeout] = useState(null);
  const labelRef = useRef(null)

  const image = parseImage(elementObj.markdown);

  function handleDragStart() {
    setDraggedIndex(index);
  }

  function handleDragOver(e) {
    e.preventDefault();

    let className = '';

    if (draggedIndex > index) className = 'drag-over top';
    if (draggedIndex < index) className = 'drag-over bottom';

    setDragOverClass(className);
  }

  function onDrop() {
    setDragOverClass(null);
    handleDrop(index);
  }

  function handleClick() {
    if (clickTimeout) clearTimeout(clickTimeout);

    const timeoutId = setTimeout(() => {
      if (draggedIndex) return;

      setKeyToAddAfterOrFirst(elementObj.key);
      setClickTimeout(null);
    }, 200);

    setClickTimeout(timeoutId);
  }

  function handleDoubleClick() {
    if (clickTimeout === null) return;

    clearTimeout(clickTimeout);
    setClickTimeout(null);

    if(image.isImage) {
      labelRef.current.click()
    } else {
      setEditedIndex(index);
    }
  }

  function handleContext(e) {
    e.preventDefault();
    setMenuCoords({ x: e.pageX, y: e.pageY });
    setIndexMenuOn(index);
  }

  return (
    <div
      draggable
      className={`editor-content-item ${
        (dragOverClass ? dragOverClass : '') +
        (elementObj.key === keyToAddAfterOrFirst ? ' insert-after' : '') +
        (keyToAddAfterOrFirst === '_add-first' && index === 0
          ? ' insert-first'
          : '') +
        (indexMenuOn === index ? ' menu-open' : '')
      }`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={() => setDragOverClass(null)}
      onDrop={onDrop}
      onContextMenu={handleContext}
    >
      <ContentElement
        markdown={elementObj.markdown}
        index={index}
      />

      {image.isImage && (
        <label
          ref={labelRef}
          htmlFor={image.name}
          form='editor-form'
          className='hidden'
        ></label>
      )}
    </div>
  );
}
