'use strict';

// Tìm kiếm các phần tử HTML bằng ID của chúng và lưu vào các biến tương ứng
const findBtn = document.getElementById("find-btn");
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
                    </td>`;                  
     tableBodyEl.appendChild(row);
    }
}

// Hàm để tạo options cho thẻ select
function renderBreed(breeds) {
    breedInput.innerHTML = "";
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.text = breed.name;
        breedInput.appendChild(option);

    });
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

// Hàm lọc và hiển thị thú cưng dựa trên tiêu chí người dùng nhập vào
function findPets() {
    const id = idInput.value;
    const name = nameInput.value && nameInput.value.toLowerCase();
    const type = typeInput.value;
    const breed = breedInput.value;
    const isVaccinated = vaccinatedInput.checked;
    const isDewormed = dewormedInput.checked;
    const isSterilized = sterilizedInput.checked;
  
    const filteredPets = petArr.filter(pet => {
        const idMatch = !id || pet.id.includes(id);
        const nameMatch = !name || pet.name.toLowerCase().includes(name.toLowerCase());
        const typeMatch = !type || pet.type === type;
        const breedMatch = !breed || pet.breed === breed;
        const vaccinatedMatch = !isVaccinated || pet.heathyPet.vaccinated;
        const dewormedMatch = !isDewormed || pet.heathyPet.dewormed;
        const sterilizedMatch = !isSterilized || pet.heathyPet.sterilized;
        
        return idMatch && nameMatch && typeMatch && breedMatch && vaccinatedMatch && dewormedMatch && sterilizedMatch;
    });
  
    if (filteredPets.length === 0) {
        alert("No pets found matching these criteria.");
    } else {
        tableBodyEl.innerHTML = "";
        renderTableData(filteredPets);
    }
}

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

// Nếu người dùng nhấn vào nút tìm kiếm, hàm findPets() sẽ được gọi
findBtn.addEventListener('click', findPets);

// Hiển thị danh sách giống khi trang được tải lên
renderTableData(petArr);