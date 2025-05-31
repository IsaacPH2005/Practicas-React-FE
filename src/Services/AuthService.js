import { urlBase, http } from "./http";

export function loginBe (credenciales) {
  return http().post(`${urlBase}login`, credenciales);
}
export function registerBe (datosUsuario) {
  return http().post(`${urlBase}register`, datosUsuario);
}
export function logoutBe () {
  return http().post(`${urlBase}logout`);
}