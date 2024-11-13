import { convertInlineMarkupToHTML } from './helpers';

export function ContentElement({ markdown }) {
  const inlineHTML = numToCut => ({
    __html: convertInlineMarkupToHTML(markdown.slice(numToCut)),
  });

  if (markdown.startsWith('[] ')) {
    return (
      <label className='content-element content-checkbox'>
        <input
          type='checkbox'
          className='content-checkbox-input'
          disabled
        />
        <span className='content-checkbox-custom'></span>
        <span dangerouslySetInnerHTML={inlineHTML(3)} />
      </label>
    );
  }

  if (markdown.startsWith('[x] ')) {
    return (
      <label className='content-element content-checkbox'>
        <input
          type='checkbox'
          className='content-checkbox-input'
          checked={true}
          disabled
        />
        <span className='content-checkbox-custom'></span>
        <span dangerouslySetInnerHTML={inlineHTML(4)} />
      </label>
    );
  }

  if (markdown.startsWith('- '))
    return (
      <li
        className='content-element'
        dangerouslySetInnerHTML={inlineHTML(2)}
      />
    );

  if (markdown.startsWith('# '))
    return (
      <h1
        className='content-element'
        dangerouslySetInnerHTML={inlineHTML(2)}
      />
    );

  if (markdown.startsWith('## '))
    return (
      <h2
        className='content-element'
        dangerouslySetInnerHTML={inlineHTML(3)}
      />
    );

  if (markdown.startsWith('### '))
    return (
      <h3
        className='content-element'
        dangerouslySetInnerHTML={inlineHTML(4)}
      />
    );

  if (markdown.startsWith('#### '))
    return (
      <h4
        className='content-element'
        dangerouslySetInnerHTML={inlineHTML(5)}
      />
    );

  const imageData = markdown.match(/^!\[(.*)\]\((.*)\)$/);

  if (imageData)
    return (
      <img
        className='content-element editor-content-image'
        src={imageData[2]}
        alt={imageData[1]}
        id={imageData[1] + '-img'}
      />
    );

  return (
    <p
      className='content-element'
      dangerouslySetInnerHTML={inlineHTML(0)}
    />
  );
}
