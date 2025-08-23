export function login(username, role) {
    localStorage.setItem('user', JSON.stringify({ username, role }));
    localStorage.setItem('isLoggedIn', 'true');
}

export function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
}

export function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

export function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}