 // entrega 3
//formulario con guardado en local storage
// const iniciarForm = document.getElementById("iniciar-form")
// const inputNameForm = document.getElementById("nameForm")
// const inputUserForm = document.getElementById("userForm")
// const inputEmailForm = document.getElementById("emailForm")
// const inputPasswordForm = document.getElementById("passwordForm")
// const inputButtonForm = document.getElementById("sendData")
// const DatosTerminados = document.getElementById("datosGuardadosBien")
// // nuevos botones
// const nuevobotton = document.getElementById("boton-nuevo")
// const nuevoBoton2 = document.getElementById("boton-nuevo2")

// recupero los datos al cargar la página
// window.onload = function() {
//     const datosGuardados = localStorage.getItem("DatosDelForm");
//     if (datosGuardados) {
//         const datos = JSON.parse(datosGuardados);
//         DatosTerminados.innerHTML = "Bienvenido " + datos.nombre + ". Tus datos han sido guardados correctamente.";
//     }
// }

// inputButtonForm.addEventListener("click", function(event){
//     event.preventDefault();
    
//     let DatosDelForm = {
//         nombre: inputNameForm.value,
//         usuario: inputUserForm.value,
//         email: inputEmailForm.value,
//         contrasenia: inputPasswordForm.value,
//     }

//     if (Object.values(DatosDelForm).some(value => !value.trim())) {
//         Swal.fire({
//             icon: "error",
//             title: "lo siento",
//             text: "completa tus datos correctamente",
//             footer: '<a href="#">Why do I have this issue?</a>'
//             });;
//         return;
//     } else {
//         Swal.fire({
//             position: "center",
//             icon: "success",
//             title: "tus datos han sido guardados correctamente",
//             showConfirmButton: false,
//             timer: 1500
//             });;
//     }

//     DatosTerminados.innerHTML = "Bienvenido " + DatosDelForm.nombre + ". Tus datos han sido guardados correctamente";
//     let resultado = JSON.stringify(DatosDelForm);
//     localStorage.setItem("DatosDelForm", resultado);
// });