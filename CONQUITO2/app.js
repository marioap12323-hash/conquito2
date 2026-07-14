const API_URL = "https://reqres.in/api/users?page=1";
const btnCargar = document.getElementById("btnCargar");
const listaContenedor = document.getElementById("listaTareas");
const mensaje = document.getElementById("mensaje");
async function obtenerUsuarios() {
  try {
    mensaje.textContent = "Cargando usuarios...";
    let respuesta = await fetch(API_URL);
    let usuarios = [];
    if (respuesta.ok) {
      let datosConvertidos = await respuesta.json();
      usuarios = datosConvertidos.data || [];
    } else {
      console.warn(`API principal falló: ${respuesta.status}. Intentando respaldo.`);
      // Intentar API de respaldo (jsonplaceholder) y mapear campos
      let respaldo = await fetch("https://jsonplaceholder.typicode.com/users");
      if (respaldo.ok) {
        let datosResp = await respaldo.json();
        usuarios = datosResp.map((u) => {
          const parts = (u.name || "").split(" ");
          return {
            avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(u.email)}`,
            first_name: parts[0] || "",
            last_name: parts.slice(1).join(" ") || "",
            email: u.email || "",
          };
        });
      } else {
        throw new Error(`HTTP error ${respuesta.status}`);
      }
    }
    mensaje.textContent = "";
    listaContenedor.innerHTML = "";
    usuarios.forEach((usuario) => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta-item";
      tarjeta.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px">
          <img src="${usuario.avatar}" alt="Avatar" class="avatar">
          <div>
            <h3>${usuario.first_name} ${usuario.last_name}</h3>
            <p>${usuario.email}</p>
          </div>
        </div>
      `;
      listaContenedor.appendChild(tarjeta);
    });
  } catch (error) {
    mensaje.textContent = "Error al cargar los usuarios.";
    console.error("Error:", error);
  }
}

  if (btnCargar) {
    btnCargar.addEventListener("click", obtenerUsuarios);
  }