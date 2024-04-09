'use strict';

// Tìm kiếm các phần tử HTML bằng ID của chúng và lưu vào các biến tương ứng
const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");
const importInput = document.getElementById('input-file');

// Lấy danh sách giống đã lưu trong localStorage. Nếu không tìm thấy, sẽ trả về một mảng rỗng
let petArr = getFromStorage("petArr", []);
// Biến lưu file được chọn
let selectedFile;

// Xử lý Export Data
exportBtn.addEventListener("click", function() {
    // Biến đổi dữ liệu từ dạng Javascript Object sang JSON
    const jsonString = JSON.stringify(petArr);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Tải file xuống
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pets.json';
    a.click();
});


// Cập nhật biến 'selectedFile' khi người dùng chọn file
importInput.addEventListener('change', function(e) {
    selectedFile = e.target.files[0];
});

// Khi nút Import được nhấn
importBtn.addEventListener('click', function() {
    if(selectedFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const newPets = JSON.parse(event.target.result);

            newPets.forEach(newPet => {
                 // Tìm thú cưng có ID khớp với thú cưng mới
                const existingPet = petArr.find(pet => pet.id === newPet.id);
                if (existingPet) {
                    // Nếu thú cưng đã tồn tại, ghi đè giá trị
                    Object.assign(existingPet, newPet);
                } else {
                    // Nếu thú cưng mới, thêm vào mảng                    
                    petArr.push(newPet)
                }
            });

            // Cập nhật localStorage
            saveToStorage("petArr", petArr);
            alert('Data imported successfully');
        };
        reader.readAsText(selectedFile);
    } else {
        alert('No file selected. Please select a file for import.');
    }
});

// // Đặt sự kiện nhấn nút import
// importBtn.addEventListener('click', function() {
//     // Trigger the 'click' event on the importInput element
//     importInput.click();
// });

// importInput.addEventListener('change', function(e) {
//     const file = e.target.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             const newPets = JSON.parse(e.target.result);
            
//             newPets.forEach(newPet => {
//                 // Tìm thú cưng có ID khớp với thú cưng mới
//                 const existingPet = petArr.find(pet => pet.id === newPet.id);
//                 if (existingPet) {
//                     // Nếu thú cưng đã tồn tại, ghi đè giá trị
//                     Object.assign(existingPet, newPet);
//                 } else {
//                     // Nếu thú cưng mới, thêm vào mảng
//                     petArr.push(newPet)
//                 }
//             });

//             // Cập nhật localStorage
//             saveToStorage("petArr", petArr);
//             alert('Data imported successfully')
//         };
//         reader.readAsText(file);
//     }
// });