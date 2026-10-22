// Tải danh sách sách bằng fetch + async/await
export async function fetchBooks(url = './books.json') {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Lỗi HTTP ${res.status}`);
  return res.json();
}
