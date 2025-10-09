// --- AUTH.JS ---
// Gestión de usuarios simulada usando localStorage

const MAX_USERS = 7;

// Obtiene todos los usuarios almacenados (o lista vacía)
function getUsers() {
  return JSON.parse(localStorage.getItem("usuariosTalentBridge")) || [];
}

// Guarda la lista de usuarios
function saveUsers(users) {
  localStorage.setItem("usuariosTalentBridge", JSON.stringify(users));
}

// Agrega un nuevo usuario, eliminando el más antiguo si se pasa de 7
function addUser(nuevoUsuario) {
  let users = getUsers();

  // Si ya existe ese correo
  if (users.some(u => u.email === nuevoUsuario.email)) {
    return { success: false, message: "Ya existe un usuario con ese correo." };
  }

  // Agregar y mantener máximo 7
  users.push(nuevoUsuario);
  if (users.length > MAX_USERS) {
    users.shift(); // elimina el más antiguo (primer elemento)
  }

  saveUsers(users);
  return { success: true, message: "Usuario registrado correctamente." };
}

// Simulación de login
function loginUser(email, password, tipo) {
  const users = getUsers();
  return users.find(u => u.email === email && u.password === password && u.tipo === tipo);
}
