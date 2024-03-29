const GUARDAR_TURNO_URL = "http://localhost:8080/turno/guardar";

function submitForm(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const idOdontologo = formData.get("idOdontologo");
  const idPaciente = formData.get("idPaciente");
  const fecha = formData.get("fecha");
  const hora = formData.get("hora");

  guardarTurno(GUARDAR_TURNO_URL, idOdontologo, idPaciente, fecha, hora);
  form.reset();
}

function guardarTurno(apiUrl = null, idOdontologo, idPaciente, fecha, hora) {
  const turnoData = {
    odontologo: {
      id: idOdontologo,
    },
    paciente: {
      id: idPaciente,
    },
    fecha,
    hora,
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(turnoData),
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error(`Error response status ${respuesta.status}`);
      }
      return respuesta.json();
    })
    .then((datos) => {
      Swal.fire({
        title: "Guardar",
        text: "Turno guardado exitosamente",
        icon: "success",
      });
    })
    .catch((error) => {
      console.error(error);
      Swal.fire({
        title: "Guardar",
        text: "Error al guardar. Consulta la consola para más detalles.",
        icon: "error",
      });
    });
}

function onLoad() {
  fetch("/odontologo/listar")
    .then((response) => response.json())
    .then((data) => {
      const select = document.getElementById("odontologoSelect");
      data.forEach((odontologo) => {
        const option = document.createElement("option");
        option.value = odontologo.id;
        option.textContent = `${odontologo.nombre} ${odontologo.apellido}`;
        select.appendChild(option);
      });
    })
    .catch((error) => console.error("Error al obtener odontólogos:", error));

  fetch("/paciente/listar")
    .then((response) => response.json())
    .then((data) => {
      const select = document.getElementById("pacienteSelect");
      data.forEach((paciente) => {
        const option = document.createElement("option");
        option.value = paciente.id;
        option.textContent = `${paciente.nombre} ${paciente.apellido}`;
        select.appendChild(option);
      });
    })
    .catch((error) => console.error("Error al obtener pacientes:", error));

  const form = document.getElementById("formCrearTurno");
  form.addEventListener("submit", submitForm);
}

document.addEventListener("DOMContentLoaded", onLoad);
