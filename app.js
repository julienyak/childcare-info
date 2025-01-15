// app.js

// API 키 설정
const apiKey = '48875f6a42044c04a5de1ec542dc4b78';

// 데이터 가져오기
async function fetchData() {
    const response = await fetch(`https://openapi.gg.go.kr/ChildhouseKndrgrM?Key=${apiKey}&Type=json&pIndex=1&pSize=100`);
    const data = await response.json();
    return data.ChildhouseKndrgrM[1].row;
}

// 지도 초기화
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.5665, lng: 126.9780 }, // 초기 중심 좌표 (서울)
        zoom: 10
    });
    return map;
}

// 마커 추가
function addMarker(map, facility) {
    const marker = new google.maps.Marker({
        position: { lat: parseFloat(facility.REFINE_WGS84_LAT), lng: parseFloat(facility.REFINE_WGS84_LOGT) },
        map: map,
        title: facility.FACLT_NM
    });

    const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${facility.FACLT_NM}</h3><p>${facility.REFINE_ROADNM_ADDR}</p><p>전화번호: ${facility.TELNO}</p>`
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

// 시설 목록 표시
function displayFacilities(facilities) {
    const list = document.getElementById('facility-list');
    facilities.forEach(facility => {
        const listItem = document.createElement('li');
        listItem.textContent = `${facility.FACLT_NM} - ${facility.REFINE_ROADNM_ADDR}`;
        list.appendChild(listItem);
    });
}

// 메인 함수
async function main() {
    const facilities = await fetchData();
    const map = initMap();
    facilities.forEach(facility => {
        addMarker(map, facility);
    });
    displayFacilities(facilities);
}

// 페이지 로드 시 실행
window.onload = main;
