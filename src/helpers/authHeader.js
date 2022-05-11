export function authHeader() {
    var token = JSON.parse(localStorage.getItem("token"));
    if (token && token.access_token) {
      return { Authorization: "Bearer " + token.access_token };
    } else {
      return {};
    }
}