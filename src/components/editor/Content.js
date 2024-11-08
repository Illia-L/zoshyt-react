import { useEffect, useRef } from 'react';
import { convertInlineMarkupToHTML, parseImage } from './helpers';

export function Content({
  content,
  editedIndex,
  imageHandled,
  setContent,
  setEditedIndex,
  setImageHandled,
}) {
  const contentRef = useRef(null);

  function scrollContent() {
    const renderedContent = contentRef.current;

    if (renderedContent && renderedContent.scrollHeight > window.innerHeight) {
      renderedContent.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  useEffect(scrollContent, [content]);

  useEffect(() => {
    console.log(imageHandled);
    if (!imageHandled) return;

    console.log('handling image loading runs...');

    const image = document.getElementById(`${imageHandled}-img`);

    console.log(image);

    if (image.complete) return scrollContent();

    image.addEventListener('load', () => {
      console.log('load event fired...');
      scrollContent()
    });

    setImageHandled(null)

    return () => image.removeEventListener('load', scrollContent);
  }, [imageHandled]);

  return (
    <div
      className='editor-content'
      ref={contentRef}
    >
      {content.map((elementObj, index) => (
        <ContentItem
          markdown={elementObj.markdown}
          index={index}
          setContent={setContent}
          setEditedIndex={setEditedIndex}
          key={elementObj.key}
        />
      ))}
    </div>
  );
}

function ContentItem({ markdown, index, setContent, setEditedIndex }) {
  return (
    <div className='editor-content-item'>
      <ContentElement
        markdown={markdown}
        index={index}
      />

      <ContentElementButtons
        index={index}
        markdown={markdown}
        setContent={setContent}
        setEditedIndex={setEditedIndex}
      />
    </div>
  );
}

function ContentElement({ markdown }) {
  const inlineHTML = numToCut => ({
    __html: convertInlineMarkupToHTML(markdown.slice(numToCut)),
  });

  if (markdown.startsWith('[] ')) {
    return (
      <label className='content-checkbox'>
        <input
          type='checkbox'
          className='content-checkbox-input'
        />
        <span className='content-checkbox-custom'></span>
        <span dangerouslySetInnerHTML={inlineHTML(3)} />
      </label>
    );
  }

  if (markdown.startsWith('[x] ')) {
    return (
      <label className='content-checkbox'>
        <input
          type='checkbox'
          className='content-checkbox-input'
          checked={true}
        />
        <span className='content-checkbox-custom'></span>
        <span dangerouslySetInnerHTML={inlineHTML(4)} />
      </label>
    );
  }

  if (markdown.startsWith('- '))
    return <li dangerouslySetInnerHTML={inlineHTML(2)} />;

  if (markdown.startsWith('# '))
    return <h1 dangerouslySetInnerHTML={inlineHTML(2)} />;

  if (markdown.startsWith('## '))
    return <h2 dangerouslySetInnerHTML={inlineHTML(3)} />;

  if (markdown.startsWith('### '))
    return <h3 dangerouslySetInnerHTML={inlineHTML(4)} />;

  if (markdown.startsWith('#### '))
    return <h4 dangerouslySetInnerHTML={inlineHTML(5)} />;

  const imageData = markdown.match(/^!\[(.*)\]\((.*)\)$/);

  if (imageData)
    return (
      <img
        className='editor-content-image'
        src={imageData[2]}
        alt={imageData[1]}
        id={imageData[1] + '-img'}
      />
    );

  return <p dangerouslySetInnerHTML={inlineHTML(0)} />;
}

function ContentElementButtons({
  index,
  markdown,
  setContent,
  setEditedIndex,
}) {
  const { isImage, name } = parseImage(markdown);

  return (
    <div className='content-element-buttons'>
      {isImage ? (
        <label
          form='editor-form'
          htmlFor={name}
        >
          <svg
            width='32'
            height='32'
          >
            <use href='/images/icons.svg#edit'></use>
          </svg>
        </label>
      ) : (
        <button
          type='button'
          onClick={() => setEditedIndex(index)}
        >
          <svg
            width='32'
            height='32'
          >
            <use href='/images/icons.svg#edit'></use>
          </svg>
        </button>
      )}

      <button
        type='button'
        onClick={() => setContent(c => c.toSpliced(index, 1))}
      >
        <svg
          width='32'
          height='32'
        >
          <use href='/images/icons.svg#delete'></use>
        </svg>
      </button>
    </div>
  );
}
