import { useEffect, useRef } from 'react';
import { parseImage } from './helpers';

export default function Menu({
  content,
  indexMenuOn,
  menuCoords,
  setIndexMenuOn,
  setEditedIndex,
  setContent,
  setKeyToAddAfterOrFirst,
}) {
  const menuRef = useRef(null);

  const markdown = content[indexMenuOn].markdown;
  const image = parseImage(markdown);

  function handleClickOutside(e) {
    if (!menuRef.current.contains(e.target)) setIndexMenuOn(null);
  }

  function handleEsc(e) {
    if (e.key === 'Escape') setIndexMenuOn(null);
  }

  function onEditOption() {
    setEditedIndex(indexMenuOn);
    setIndexMenuOn(null);
  }

  function onAddFirstOption() {
    setKeyToAddAfterOrFirst('_add-first');
    setIndexMenuOn(null);
  }

  function onAddAfterOption() {
    setKeyToAddAfterOrFirst(content[indexMenuOn].key);
    setIndexMenuOn(null);
  }

  function onDeleteOption() {
    setContent(c => c.toSpliced(indexMenuOn, 1));
    setIndexMenuOn(null);
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [indexMenuOn]);

  return (
    <ul
      ref={menuRef}
      className='editor-menu'
      style={{ top: menuCoords.y, left: menuCoords.x }}
    >
      <li>
        {image.isImage ? (
          <label
            className='editor-menu-item'
            form='editor-form'
            htmlFor={image.name}
          >
            <svg
              width='32'
              height='32'
            >
              <use href='/images/icons.svg#edit'></use>
            </svg>
            Edit
          </label>
        ) : (
          <p
            className='editor-menu-item'
            onClick={onEditOption}
          >
            <svg
              width='32'
              height='32'
            >
              <use href='/images/icons.svg#edit'></use>
            </svg>
            Edit
            <span className='hot-keys'>Double click</span>
          </p>
        )}
      </li>

      {indexMenuOn === 0 && (
        <li
          className='editor-menu-item'
          onClick={onAddFirstOption}
        >
          <svg
            width='32'
            height='32'
          >
            <use href='/images/icons.svg#insert-above'></use>
          </svg>
          Add before me
        </li>
      )}

      <li
        className='editor-menu-item'
        onClick={onAddAfterOption}
      >
        <svg
          width='32'
          height='32'
        >
          <use href='/images/icons.svg#insert-below'></use>
        </svg>
        Add after me
        <span className='hot-keys'>Click</span>
      </li>

      <li
        className='editor-menu-item'
        onClick={onDeleteOption}
      >
        <svg
          width='32'
          height='32'
        >
          <use href='/images/icons.svg#delete'></use>
        </svg>
        Delete
      </li>
    </ul>
  );
}
