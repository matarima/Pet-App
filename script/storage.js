'use strict';

// Function để lấy dữ liệu từ localStorage
// Nhận vào 2 tham số: key (tên của item trong localStorage) và defaultVal (giá trị mặc định trả về nếu item không tồn tại)
function getFromStorage(key, defaultVal) {
    // Lấy giá trị item dựa theo key từ localStorage
    const value = localStorage.getItem(key);
    if (value) { // Kiểm tra xem giá trị có tồn tại không
        // Biến đổi giá trị từ JSON sang JavaScript Object
        const arr = JSON.parse(value);
        // Kiểm tra xem giá trị có phải là một mảng không, nếu có thì loại bỏ các phần tử null ra khỏi mảng
        return Array.isArray(arr) ? arr.filter(item => item !== null) : arr;
    } else {
        // Nếu item không tồn tại, trả về giá trị mặc định
        return defaultVal;
    }
}

// Function để lưu dữ liệu vào localStorage
// Nhận vào 2 tham số: key (tên của item trong localStorage) và value (giá trị cần lưu)
function saveToStorage(key, value) {
    // Biến đổi giá trị từ JavaScript Object sang JSON và lưu vào localStorage
    localStorage.setItem(key, JSON.stringify(value));
}