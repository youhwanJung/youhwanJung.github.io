/* ============================================================
   MODAL — 프로젝트 상세 모달 열기/닫기 및 탭 전환
   document 에 리스너 하나만 걸어 위임 처리하므로,
   partials 가 나중에 삽입되어도 별도 재바인딩이 필요 없습니다.
============================================================ */

function openModal(overlay) {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(overlay) {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/** 같은 모달 안에서 탭 버튼과 패널의 active 를 전환한다. */
function switchTab(content, name) {
  if (!content) return;
  content.querySelectorAll('.modal-tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.tab === name);
  });
  content.querySelectorAll('.modal-tab-content').forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.panel === name);
  });
}

export function initModals() {
  document.addEventListener('click', (e) => {
    // 프로젝트 카드 → 모달 열기
    const card = e.target.closest('.project-card[data-modal]');
    if (card) {
      const overlay = document.getElementById(card.dataset.modal);
      if (overlay) openModal(overlay);
      return;
    }

    const overlay = e.target.closest('.modal-overlay');
    if (!overlay) return;

    // 닫기 버튼
    if (e.target.closest('.modal-close')) {
      closeModal(overlay);
      return;
    }

    // 탭 버튼
    const tab = e.target.closest('.modal-tab[data-tab]');
    if (tab) {
      switchTab(tab.closest('.modal-content'), tab.dataset.tab);
      return;
    }

    // 다른 탭으로 점프하는 본문 하단 버튼 (+ 모달 최상단으로 스크롤)
    const goto = e.target.closest('[data-goto-tab]');
    if (goto) {
      switchTab(goto.closest('.modal-content'), goto.dataset.gotoTab);
      goto.closest('.modal-box').scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 모달 바깥(오버레이 자체) 클릭 → 닫기
    if (!e.target.closest('.modal-box')) closeModal(overlay);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
  });
}
