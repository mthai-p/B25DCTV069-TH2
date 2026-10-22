// Dùng children để bọc nội dung bất kỳ bên trong
export default function Section({ title, children }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
