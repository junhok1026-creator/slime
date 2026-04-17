// game.js 수정본 일부
function createItem(level, color) {
    const item = document.createElement('div');
    item.classList.add('item');
    item.dataset.level = level;
    item.dataset.color = color;
    const prefix = colorPrefix[color];
    item.style.backgroundImage = `url('image/${prefix}${level}.png')`;

    // --- 모바일 터치 대응 로직 ---
    item.addEventListener('touchstart', (e) => {
        draggedItem = item;
        item.style.opacity = '0.5';
        // 모바일 스크롤 방지
        e.preventDefault(); 
    }, { passive: false });

    item.addEventListener('touchend', (e) => {
        item.style.opacity = '1';
        // 손가락이 떨어진 위치의 좌표 구하기
        const touch = e.changedTouches[0];
        // 해당 좌표에 있는 실제 요소(Cell) 찾기
        const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
        
        if (dropTarget) {
            // handleDrop 함수를 재사용하여 처리 (this를 dropTarget으로 바인딩)
            handleDrop.call(dropTarget, e);
        }
        draggedItem = null;
    });

    // 기존 마우스 이벤트 유지
    item.addEventListener('dragstart', () => { draggedItem = item; item.style.opacity = '0.5'; });
    item.addEventListener('dragend', () => { item.style.opacity = '1'; });

    return item;
}