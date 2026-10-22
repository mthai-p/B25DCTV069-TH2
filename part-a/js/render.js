// Dựng giao diện bằng createElement + textContent (không dùng innerHTML với dữ liệu người dùng)
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function createBookCard(book, isFav) {
  const card = el('article', 'card');
  card.dataset.id = book.id;

  card.append(
    el('h3', '', book.title),
    el('p', '', `Tác giả: ${book.author}`),
    el('p', '', `Thể loại: ${book.genre}`),
    el('p', '', `Năm xuất bản: ${book.year}`)
  );

  const actions = el('div', 'card-actions');
  const favBtn = el('button', 'btn-fav' + (isFav ? ' active' : ''), isFav ? '★ Đã thích' : '☆ Yêu thích');
  favBtn.type = 'button';
  favBtn.dataset.action = 'favorite';
  const delBtn = el('button', 'btn-delete', 'Xóa');
  delBtn.type = 'button';
  delBtn.dataset.action = 'delete';
  actions.append(favBtn, delBtn);

  card.append(actions);
  return card;
}

export function renderBooks(container, books, favorites) {
  container.replaceChildren();
  if (books.length === 0) {
    container.append(el('p', 'message', 'Không có cuốn sách nào phù hợp.'));
    return;
  }
  const frag = document.createDocumentFragment();
  books.forEach((b) => frag.append(createBookCard(b, favorites.has(b.id))));
  container.append(frag);
}

export function showMessage(container, text, isError = false) {
  container.replaceChildren(el('p', 'message' + (isError ? ' error-msg' : ''), text));
}

// Danh sách thể loại tạo bằng Set; firstLabel là option mặc định
export function renderGenreOptions(select, books, firstLabel) {
  const current = select.value;
  const genres = new Set(books.map((b) => b.genre));
  select.replaceChildren();
  const first = el('option', '', firstLabel);
  first.value = '';
  select.append(first);
  [...genres].sort().forEach((g) => {
    const opt = el('option', '', g);
    opt.value = g;
    select.append(opt);
  });
  select.value = current;
}

export function setStatus(node, shown, total) {
  node.textContent = `Đang hiển thị ${shown} / ${total} cuốn`;
}
