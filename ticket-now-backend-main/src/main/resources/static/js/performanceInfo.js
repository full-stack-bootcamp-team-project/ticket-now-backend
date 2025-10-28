
/*
// URL 예시: http://localhost:8080/performance?category=music
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category"); // "music"



html
<div>
    <button onclick="updateCategory('music')">음악</button>
    <button onclick="updateCategory('drama')">드라마</button>
    <button onclick="updateCategory('concert')">콘서트</button>
  </div>

  <p id="category"></p>

script
 function getCategoryFromUrl() {
      const params = new URLSearchParams(window.location.search);
      return params.get("category") || "all";
    }

 function renderCategory() {
      const category = getCategoryFromUrl();
      document.getElementById("category").innerText = `현재 카테고리: ${category}`;
    }


function updateCategory(newCategory) {
  // URL의 category만 교체 (페이지 리로드 없음)
  const newUrl = `${window.location.pathname}?category=${newCategory}`;
  window.history.pushState({}, '', newUrl);

  // 화면 내용 업데이트
  renderCategory();
}

// 초기 렌더링
renderCategory();
 */