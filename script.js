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

// Lấy danh sách giống đã lưu trong localStorage. Nếu không tìm thấy, sẽ trả về một mảng rỗng
let petArr = getFromStorage("petArr", []);
let breedArr = getFromStorage("breedArr", []);
let heathyCheck = false;
let heathyPetArr = [];

// Hàm kiểm tra giá trị ID truyền vào
function checkInput(data) {
    let id = Number(data.id);
    if (data.id === "") {
        alert("Please enter input ID!");
        return false;
    } 
    return true;
}

// Hàm kiểm tra ID đã tồn tại hay chưa trong danh sách động vật
function checkUnique(id) {
    for (let i = 0; i < petArr.length; i++) {
        if (petArr[i] && petArr[i].id == id) {
            alert("ID must be unique!");
            return false;
        }
    }    
    return true;
}

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

// Hàm thêm một pet khỏi danh sách
function addPet(pet) {
    petArr.push(pet);
    saveToStorage("petArr", petArr);
    renderTableData(petArr);
}

// Hàm xóa một pet khỏi danh sách
function deletePet(petId) {
    if (confirm('Are you sure?')) {
        const index = petArr.findIndex(pet => pet.id === petId);
        if (index !== -1) {
            petArr.splice(index, 1);
            saveToStorage("petArr", petArr);
            renderTableData(petArr);
        } else {
            console.log('Pet not found!');
        }
    }
}

// Hàm để tạo options cho thẻ select
function renderBreed(breeds) {
    breedInput.innerHTML = "";
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.text = breed.name;
        breedInput.appendChild(option);

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
                    <td>${pet.BMI ? pet.BMI : '?'}</td>
                    <td>${pet.date}</td>
                    <td><button class="btn btn-danger" onclick="deletePet('${ pet.id }')">Delete</button>
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
    if (checkInput(data) 
    && checkUnique(data.id) 
    && checkBetween('Age',data.age, 1, 15)
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
        id: idInput.value,
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
        date: new Date().toLocaleDateString('vi-VN')
    };
    const validate = validateData(data);

    // Lấy data từ dữ liệu form
    if (validate) {
        addPet(data);
        clearInput();
    }
});

// Thêm sự kiện khi người dùng nhấn nút healthy
heathyBtn.addEventListener('click', function(e) {
    heathyCheck = !heathyCheck;
    if (heathyCheck) {
        heathyBtn.innerText = 'Show All Pet';

        heathyPetArr = petArr.filter(pet => pet.heathyPet.vaccinated && pet.heathyPet.dewormed && pet.heathyPet.sterilized);
        renderTableData(heathyPetArr);
    } else {
        heathyBtn.innerText = 'Show Healthy Pet';
        renderTableData(petArr);
    };
});

// Thêm sự kiện khi người dùng nhấn nút calculate
calculateBtn.addEventListener('click', function (e) {
    petArr.forEach(pet => {
        if (pet.type === 'Dog') {
            pet.BMI = (pet.weight * 703 / pet.lenght ** 2).toFixed(2);
        } else if (pet.type === 'Cat') {
            pet.BMI = (pet.weight * 886 / pet.lenght ** 2).toFixed(2);
        } else {
            pet.BMI = '?';
        }
    });
    renderTableData(petArr);
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