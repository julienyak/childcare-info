const API_URL = "http://localhost:4000/api";

document.getElementById("search-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const sigunName = document.getElementById("sigun-name").value;
    if (!sigunName) return alert("시군명을 입력하세요!");

    const url = `${API_URL}?sigun=${encodeURIComponent(sigunName)}&page=1&size=10`;
    console.log("요청 URL:", url);

    try {
        const response = await fetch(url);
        const data = await response.json();

        displayDaycareList(data.ChildhouseKndrgrM[1].row);
    } catch (error) {
        console.error("데이터 가져오기 오류:", error);
        alert("데이터를 가져오는 중 문제가 발생했습니다.");
    }
});

function displayDaycareList(rows) {
    const container = document.getElementById("daycare-list");
    container.innerHTML = ""; // 초기화

    if (!rows || rows.length === 0) {
        container.innerHTML = "<p>검색 결과가 없습니다.</p>";
        return;
    }

    rows.forEach((item) => {
        const div = document.createElement("div");
        div.className = "daycare-item";
        div.innerHTML = `
            <h3>${item.FACLT_NM}</h3>
            <p><strong>전화번호:</strong> ${item.TELNO || "없음"}</p>
            <p><strong>주소:</strong> ${item.REFINE_ROADNM_ADDR || "없음"}</p>
            <p><strong>위치:</strong> (${item.REFINE_WGS84_LAT}, ${item.REFINE_WGS84_LOGT})</p>
        `;
        container.appendChild(div);
    });
}
