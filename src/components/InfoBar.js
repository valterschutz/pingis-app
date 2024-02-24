export default function InfoBar({ text, modifier }) {
  return <div className="section">
    <div className={`notification ${modifier}`}>
      {text}
    </div>
  </div>
}
