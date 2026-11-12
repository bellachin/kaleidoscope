import './MarkedText.css';

type MarkedTextProps = {
  text: string;
  /** Word inside `text` that gets the gold underline. */
  highlight?: string;
};

export default function MarkedText({ text, highlight }: MarkedTextProps) {
  const word = highlight ?? '';
  const index = word ? text.indexOf(word) : -1;

  if (index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <span className="marked">{word}</span>
      {text.slice(index + word.length)}
    </>
  );
}
