/* ============================================================
   PARTIALS — 숨겨진 모달 HTML 조각을 불러와 삽입
   주의: fetch 는 file:// 에서 차단됩니다. 로컬 확인 시 로컬 서버를 쓰세요.
         예) python3 -m http.server 8000  →  http://localhost:8000
============================================================ */

const PARTIALS = [
  'partials/modal-jeongjik.html',
  'partials/modal-attendance.html',
  'partials/modal-campuslife.html',
];

export async function loadPartials(root) {
  if (!root) throw new Error('마운트 지점(#modal-root)을 찾을 수 없습니다.');

  const htmls = await Promise.all(
    PARTIALS.map(async (path) => {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`${path}: ${res.status} ${res.statusText}`);
      return res.text();
    })
  );

  root.insertAdjacentHTML('beforeend', htmls.join('\n'));
}
