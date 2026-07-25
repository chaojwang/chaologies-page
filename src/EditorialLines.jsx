import "./editorial-lines.css";

export default function EditorialLines({ as: Tag = "p", className = "", lines = [] }) {
  return (
    <Tag className={["editorial-lines", className].filter(Boolean).join(" ")}>
      {lines.map((line, index) => (
        <span className="editorial-line" key={`${index}-${line}`}>
          {line}
        </span>
      ))}
    </Tag>
  );
}
