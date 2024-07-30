const authService = {
  getToken() {
    return localStorage.getItem("token");
  },

  setToken(token) {
    localStorage.setItem("token", token);
  },

  removeToken() {
    localStorage.removeItem("token");
  },

  getAuthHeader() {
    return { headers: { Authorization: `Bearer ${this.getToken()}` } };
  },
};

export default authService;
