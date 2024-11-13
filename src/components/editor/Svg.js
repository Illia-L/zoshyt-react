export function Svg({ id }) {
  return (
    <svg
      width='32'
      height='32'
    >
      <use href={`/images/icons.svg#${id}`}></use>
    </svg>
  );
}
