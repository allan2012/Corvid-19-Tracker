export default function isAuthenticated() {
    if (localStorage.getItem('token') !== null) {
        return true
    }
    return false
}