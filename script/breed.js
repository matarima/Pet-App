'use strict';

// Tìm kiếm các phần tử HTML bằng ID của chúng và lưu vào các biến tương ứng
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
const inputBreed = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");

// Lấy danh sách giống đã lưu trong localStorage. Nếu không tìm thấy, sẽ trả về một mảng rỗng
let breedArr = getFromStorage("breedArr", []);

// Hàm hiển thị danh sách giống lên các hàng của bảng HTML
function renderBreedTable(breedArr) {
    tableBodyEl.innerHTML = "";
    for (let i = 0; i < breedArr.length; i++) {      
        const row = document.createElement('tr');
        let breed = breedArr[i];
        row.innerHTML = `
                <td>${i + 1}</td>
                <td>${breed.name}</td>
                <td>${breed.type}</td>
                <td><button class="btn btn-danger" onclick="deleteBreed('${ breed.id }')">Delete</button>`;                  
         tableBodyEl.appendChild(row);
    }
}

// Thêm sự kiện khi người dùng nhấn nút submit
submitBtn.addEventListener("click", function() {
    const name = inputBreed.value;
    const type = inputType.value;

    const isExisting = breedArr.some(breed => breed.name === name && breed.type === type);

    if (!name || type == "Select Type" || isExisting) {
        alert("Name and Type fields must not be empty and must not already exist!");
    } else {
        const newBreed = { name, type };
        breedArr.push(newBreed);
        saveToStorage("breedArr", breedArr);
        renderBreedTable(breedArr);
    }
});

// Hàm xóa một giống khỏi danh sách
function deleteBreed(breedId) {
    breedArr.splice(breedId, 1);
    saveToStorage("breedArr", breedArr);
    renderBreedTable(breedArr);
}

// Hiển thị danh sách giống khi trang được tải lên
renderBreedTable(breedArr);