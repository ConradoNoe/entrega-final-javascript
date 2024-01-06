
// formulario con guardado en local storage
const iniciarForm = document.getElementById("iniciar-form")
const inputNameForm = document.getElementById("nameForm")
const inputUserForm = document.getElementById("userForm")
const inputEmailForm = document.getElementById("emailForm")
const inputPasswordForm = document.getElementById("passwordForm")
const inputButtonForm = document.getElementById("sendData")
const DatosTerminados = document.getElementById("datosGuardadosBien")
// nuevos botones
const nuevobotton = document.getElementById("boton-nuevo")
const nuevoBoton2 = document.getElementById("boton-nuevo2")

// recupero los datos al cargar la página
window.onload = function() {
    const datosGuardados = localStorage.getItem("DatosDelForm");
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        DatosTerminados.innerHTML = "Bienvenido " + datos.nombre + ". Tus datos han sido guardados correctamente.";
    }
}

inputButtonForm.addEventListener("click", function(event){
    event.preventDefault();
    
    let DatosDelForm = {
        nombre: inputNameForm.value,
        usuario: inputUserForm.value,
        email: inputEmailForm.value,
        contrasenia: inputPasswordForm.value,
    }

    if (Object.values(DatosDelForm).some(value => !value.trim())) {
        Swal.fire({
            icon: "error",
            title: "lo siento",
            text: "completa tus datos correctamente",
            footer: '<a href="#">Why do I have this issue?</a>'
            });;
        return;
    } else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "tus datos han sido guardados correctamente",
            showConfirmButton: false,
            timer: 1500
            });;
    }

    DatosTerminados.innerHTML = "Bienvenido " + DatosDelForm.nombre + ". Tus datos han sido guardados correctamente";
    let resultado = JSON.stringify(DatosDelForm);
    localStorage.setItem("DatosDelForm", resultado);
});



// clima api

const result = document.querySelector('.result');
const formApi = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

formApi.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nameCity.value === '' || nameCountry.value === '') {
        showError('Ambos campos son obligatorios...');
        return;
    }

    callAPI(nameCity.value, nameCountry.value);
    
})

function callAPI(city, country){
    const apiId = 'd6558a0b932da6e03c088f4b10c7173a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                showError('Ciudad no encontrada...');
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
            
        })
        .catch(error => {
            console.log(error);
        })
}

function showWeather(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;

    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
    `;

    result.appendChild(content);

    console.log(name);
    console.log(temp);
    console.log(temp_max);
    console.log(temp_min);
    console.log(arr.icon); 
}

function showError(message){
    //console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    formApi.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}