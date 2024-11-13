import { parseImage } from './helpers';
import { Svg } from './Svg';
import styles from './InputImageControls.module.css'

export function InputImageControls({
  content,
  setImageHandled,
  setContent,
  editContent,
  isNewImageDisabled,
}) {
  const images = content
    .map(elementObj => parseImage(elementObj.markdown))
    .filter(item => item.isImage)
    .map(obj => obj.obj);
  const lastNameNubmer = +images[images.length - 1]?.name?.split('-')[1] || 0;
  const newName = 'image-' + (lastNameNubmer + 1);

  return (
    <div>
      {images.map(image => (
        <InputImageWithFile
          image={image}
          content={content}
          setImageHandled={setImageHandled}
          setContent={setContent}
          key={image.name}
        />
      ))}

      <InputImage
        name={newName}
        setImageHandled={setImageHandled}
        editContent={editContent}
        isNewImageDisabled={isNewImageDisabled}
      />
      <label
        type='button'
        htmlFor={newName}
        className={isNewImageDisabled ? styles.disabled : ''}
      >
        <Svg id='image'/>
      </label>
    </div>
  );
}

function InputImage({
  name,
  setImageHandled,
  editContent,
  isNewImageDisabled,
}) {
  function handlePickImage({ target }) {
    const { name } = target;
    const url = URL.createObjectURL(target.files[0]);
    const markdown = `![${name}](${url})`;

    editContent(markdown);
    setImageHandled(name);
  }

  return (
    <input
      className='hidden'
      type='file'
      name={name}
      id={name}
      onChange={handlePickImage}
      disabled={isNewImageDisabled}
    />
  );
}

function InputImageWithFile({ image, setImageHandled, content, setContent }) {
  function handlePickImage({ target }) {
    const { name } = target;
    const url = URL.createObjectURL(target.files[0]);
    const newMarkdown = `![${name}](${url})`;
    const imagePositionInContent = content.findIndex(
      elementObj => parseImage(elementObj.markdown)?.name === image.name
    );
    const key = content[imagePositionInContent].key;

    URL.revokeObjectURL(image.url);

    setContent(c =>
      c.toSpliced(imagePositionInContent, 1, { key, markdown: newMarkdown })
    );
    setImageHandled(name);
  }

  return (
    <input
      className='hidden'
      type='file'
      name={image.name}
      id={image.name}
      onChange={handlePickImage}
    />
  );
}
