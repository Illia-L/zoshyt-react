export function convertInlineMarkupToHTML(text) {
  text = text.replace(
    /\*\*\*(.+?)\*\*\*/g,
    (match, content) => `<b><i>${content}</i></b>`
  );

  text = text.replace(
    /\*\*(.+?)\*\*/g,
    (match, content) => `<b>${content}</b>`
  );

  text = text.replace(/\*(.+?)\*/g, (match, content) => `<i>${content}</i>`);

  text = text.replace(
    /\[(.+?)\]\((https?:\/\/[^\s]+?)\)/g,
    (match, textContent, url) =>
      `<a href='${url}' target='_blank'>${textContent}</a>`
  );


  return text;
}

export function parseImage(markdown) {
  const regex = /^!\[(.+?)\]\((.+?)\)$/;
  const match = markdown?.match(regex);

  if (match) {
    return {
      name: match[1],
      url: match[2],
      obj: { name: match[1], url: match[2] },
      isImage: true,
    };
  } else {
    return {
      name: null,
      url: null,
      obj: null,
      isImage: false,
    };
  }
}
