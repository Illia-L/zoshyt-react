import { useEffect, useRef } from 'react';
import { parseImage } from './helpers';
import { Svg } from './Svg';
import styles from './Menu.module.css'

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
      className={styles.menu}
      style={{ top: menuCoords.y, left: menuCoords.x }}
    >
      <li>
        {image.isImage ? (
          <label
            className={styles.item}
            form='editor-form'
            htmlFor={image.name}
          >
            <Svg id='edit' />
            Edit
          </label>
        ) : (
          <p
            className={styles.item}
            onClick={onEditOption}
          >
            <Svg id='edit' />
            Edit
            <span className={styles['hot-keys']}>Double click</span>
          </p>
        )}
      </li>

      {indexMenuOn === 0 && (
        <li
          className={styles.item}
          onClick={onAddFirstOption}
        >
          <Svg id='insert-above' />
          Add before me
        </li>
      )}

      <li
        className={styles.item}
        onClick={onAddAfterOption}
      >
        <Svg id='insert-below' />
        Add after me
        <span className={styles['hot-keys']}>Click</span>
      </li>

      <li
        className={styles.item}
        onClick={onDeleteOption}
      >
        <Svg id='delete' />
        Delete
      </li>
    </ul>
  );
}
