function openTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');

    // 모든 탭 숨기기
    tabs.forEach(tab => tab.classList.remove('active'));
    // 모든 버튼 비활성화
    buttons.forEach(btn => btn.classList.remove('active'));

    // 선택된 탭 활성화
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}