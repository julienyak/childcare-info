// add.js
document.addEventListener("DOMContentLoaded", function() {
    // 네이버 지도 초기화
    const map = new naver.maps.Map('naverMap', {
        center: new naver.maps.LatLng(37.5665, 126.9780),
        zoom: 11
    });

    // 기본 마커 추가 예시
    const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5665, 126.9780),
        map: map
    });

    // 검색 버튼 이벤트 리스너
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = document.getElementById('searchInput').value;
        alert(`검색어: ${query}`);
    });
});
