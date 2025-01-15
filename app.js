document.addEventListener('DOMContentLoaded', function() {
    fetch('https://openapi.gg.go.kr/ChildhouseKndrgrM?KEY=48875f6a42044c04a5de1ec542dc4b78&Type=json&pIndex=1&pSize=10')
        .then(response => response.json())
        .then(data => {
            const dataDiv = document.getElementById('data');
            dataDiv.innerHTML = JSON.stringify(data);
        })
        .catch(error => {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        });
});
