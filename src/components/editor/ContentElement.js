import { convertInlineMarkupToHTML } from './helpers';
import styles from './contentElement.module.css';

export function ContentElement({ markdown }) {
  const inlineHTML = numToCut => ({
    __html: convertInlineMarkupToHTML(markdown.slice(numToCut)),
  });

  if (markdown.startsWith('[] ')) {
    return (
      <label className={styles.checkbox}>
        <input
          type='checkbox'
          className={styles['checkbox-input']}
          disabled
        />
        <span className={styles['checkbox-custom']}></span>
        <span dangerouslySetInnerHTML={inlineHTML(3)} />
      </label>
    );
  }

  if (markdown.startsWith('[x] ')) {
    return (
      <label className={styles.checkbox}>
        <input
          type='checkbox'
          className={styles['checkbox-input']}
          checked={true}
          disabled
        />
        <span className={styles['checkbox-custom']}></span>
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
        src={imageData[2]}
        alt={imageData[1]}
        id={imageData[1] + '-img'}
      />
    );

  return <p dangerouslySetInnerHTML={inlineHTML(0)} />;
}
