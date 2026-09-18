/* ============================================================
   ENTRY — 초기화 순서를 한곳에서 관리
============================================================ */

import { initNav } from './nav.js';
import { loadPartials } from './partials.js';
import { initModals } from './modal.js';

// 헤더 높이 보정이 초기 레이아웃에 필요하므로 먼저 실행한다.
initNav();

// 모달은 위임 방식이라 조각 삽입 전에 켜 두어도 안전하다.
initModals();

loadPartials(document.getElementById('modal-root')).catch((err) => {
  console.error('[portfolio] 모달 조각을 불러오지 못했습니다. 로컬 서버로 실행했는지 확인하세요.', err);
});
