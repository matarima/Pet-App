'use strict';

// Tìm kiếm các phần tử HTML bằng ID của chúng và lưu vào các biến tương ứng
const submitBtn = document.getElementById("submit-btn");
const heathyBtn = document.getElementById("healthy-btn");
const calculateBtn = document.getElementById("calculate-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const navBar = document.getElementById("sidebar");
const editForm = document.getElementById("container-form");

// Lấy danh sách giống đã lưu trong localStorage. Nếu không tìm thấy, sẽ trả về một mảng rỗng
let petArr = getFromStorage("petArr", []);
let breedArr = getFromStorage("breedArr", []);
let heathyCheck = false;
let heathyPetArr = [];

// Hàm kiểm tra một giá trị có nằm trong khoảng giữa 2 số min và max không
function checkBetween(name,val, min , max) {
    if (val >= min && val <= max) {
        return true;
    }
    alert(`${name} must be between ${min} and ${max}!`);    
    return false;
}

// Hàm kiểm tra Type có phải là loại ['Dog', 'Cat'] không
function checkType(type) {
    if (type !== 'Dog' && type !== 'Cat') {
        alert('Please select Type!.');
        return false;
    }
    return true;
}

// Hàm kiểm tra Breed có được chọn hay không
function checkBreed(type) {
    if (type === undefined || type === null || type === 'Select Breed'){
        alert('Please select Breed!.');
        return false;
    }
    return true;
}

// Hàm chỉnh sửa thông tin một Pet dựa vào ID
function editPet(data) {
    const petIndex = petArr.findIndex(pet => pet.id === idInput.value);
    if (petIndex != -1) {
        petArr[petIndex] = {...petArr[petIndex], ...data};
    }
    saveToStorage("petArr", petArr);
    renderTableData(petArr);
}

// Hàm sắp xếp lại môi trường nhập liệu để chỉnh sửa thông tin một Pet
function startEditPet(petId) {
    const pet = petArr.find(pet => pet.id === petId); 
    idInput.value = petId;
    nameInput.value = pet.name;
    typeInput.value = pet.type;
    ageInput.value = pet.age;
    lengthInput.value = pet.lenght;
    weightInput.value = pet.weight;
    colorInput.value = pet.color;
    vaccinatedInput.checked = pet.heathyPet.vaccinated;
    dewormedInput.checked = pet.heathyPet.dewormed;
    sterilizedInput.checked = pet.heathyPet.sterilized;
    updateBreedList(pet.type);
    breedInput.value = pet.breed;

    editForm.style.display = 'block';

}

// Hàm cập nhật danh sách giống của một loại động vật cụ thể
function updateBreedList(type) {
    const breedSelect = breedInput;
    const breeds = breedArr.filter(breed => breed.type === type);
    breedSelect.innerHTML = breeds.map(breed => `<option>${breed.name}</option>`).join('');
}

// Hàm tạo các thẻ option cho thẻ select chứa thông tin giống động vật
function renderBreed(breeds) {
    breedInput.innerHTML = "";
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.text = breed.name;
        breedInput.appendChild(option)
    })
}

// Hàm để hiển thị dữ liệu lên bảng
function renderTableData(petArr) {
    tableBodyEl.innerHTML = "";
    const check = 'bi bi-check-circle-fill';
    const noncheck = 'bi bi-x-circle-fill'
    for (let i = 0; i < petArr.length; i++) {      
    const row = document.createElement('tr');
    let pet = petArr[i];
    row.innerHTML = `
                    <th scope="row">${pet.id}</th>
                    <td>${pet.name}</td>
                    <td>${pet.age}</td>
                    <td>${pet.type}</td>
                    <td>${pet.weight}</td>
                    <td>${pet.lenght}</td>
                    <td>${pet.breed}</td>
                    <td>
                        <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
                    </td>
                    <td><i class="${pet.heathyPet.vaccinated ? check : noncheck}"></i></td>
                    <td><i class="${pet.heathyPet.dewormed ? check : noncheck}"></i></td>
                    <td><i class="${pet.heathyPet.sterilized ? check : noncheck}"></i></td>
                    <td>${pet.date}</td>
                    <td><button class="btn btn-warning" onclick="startEditPet('${ pet.id }')">Edit</button>
                    </td>`;                  
     tableBodyEl.appendChild(row);
    }
}

// Hàm để xoá dữ liệu trong các trường nhập khi đã nhập đầy đủ và reset các input
function clearInput() {
    idInput.value = "";
    nameInput.value = "";
    typeInput.value = "Select Type";
    ageInput.value = "";
    weightInput.value = "";
    lengthInput.value = "";
    breedInput.value = "Select Breed";
    colorInput.value = "#000000";
    vaccinatedInput.checked = false;
    sterilizedInput.checked = false;
    dewormedInput.checked = false;
}

// Hàm kiểm tra các điều kiện khi nhập dữ liệu
function validateData(data) {
    if (checkBetween('Age',data.age, 1, 15)
    && checkBetween('Weight',data.weight, 1 , 15)
    && checkBetween('Length',data.lenght, 1 , 100)
    && checkType(data.type)
    && checkBreed(data.breed))
    return true;
    return false;
}

// Thêm sự kiện khi người dùng nhấn nút submit
submitBtn.addEventListener('click', function(e) {
    const data = {
        
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseInt(weightInput.value),
        lenght: parseInt(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        heathyPet: {
            vaccinated: vaccinatedInput.checked,
            dewormed: dewormedInput.checked,
            sterilized: sterilizedInput.checked,
        },
        id: idInput.value,
        date: new Date().toLocaleDateString('vi-VN')
    };
    const validate = validateData(data);

    // Lấy data từ dữ liệu form
    if (validate) {
        let userConfirm = confirm("Bạn có muốn chỉnh sửa thông tin này không?");
        if (userConfirm == true) {
            editPet(data);
            editForm.style.display = 'none';
            // clearInput();
            // if (data.heathyPet.dewormed 
            //     && data.heathyPet.sterilized
            //     && data.heathyPet.vaccinated) 
            //     heathyPetArr.push(data);
        }
        // Thêm thông báo khi hoàn thành chỉnh sửa
        alert('Chỉnh sửa thành công!');
    }
});

// Khi người dùng nhấn vào navBar, class 'active' sẽ được thêm vào hoặc bị xóa đi
navBar.addEventListener('click', function (e) {
    this.classList.toggle('active');
});

// Khi người dùng thay đổi lựa chọn loại động vật, hàm sẽ lọc ra các giống tương ứng để hiển thị trong select box
typeInput.addEventListener('change', function (e) {
    const selectedType = e.target.value;
    const filteredBreeds = breedArr.filter(breed => breed.type === selectedType);
    renderBreed(filteredBreeds);
});

// Hiển thị danh sách giống khi trang được tải lên
renderTableData(petArr);