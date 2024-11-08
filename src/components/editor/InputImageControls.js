import { parseImage } from './helpers';

const imageNameAndUrlOrFalse = /^!\[(.*)\]\((.*)\)$/;

export function InputImageControls({
  content,
  setImageHandled,
  setContent,
  editContent,
  isNewImageDisabled
}) {
  const images = content
    .map(elementObj => elementObj.markdown.match(imageNameAndUrlOrFalse))
    .filter(item => item)
    .map(match => ({ name: match[1], url: match[2] }));
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
        className={isNewImageDisabled ? 'disabled' : ''}
      >
        <svg width='32' height='32'><use href='/images/icons.svg#image'></use></svg>
      </label>
    </div>
  );
}

function InputImage({ name, setImageHandled, editContent, isNewImageDisabled }) {
  function handlePickImage({ target }) {
    const { name } = target;
    const url = URL.createObjectURL(target.files[0]);
    const markdown = `![${name}](${url})`;

    editContent(markdown);
    setImageHandled(name)
  }

  return (
    <input
      className='editor-input-image'
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
    const key = content[imagePositionInContent].key

    URL.revokeObjectURL(image.url);

    setContent(c => c.toSpliced(imagePositionInContent, 1, {key, markdown: newMarkdown}));
    setImageHandled(name)
  }

  return (
    <input
      className='editor-input-image'
      type='file'
      name={image.name}
      id={image.name}
      onChange={handlePickImage}
    />
  );
}
