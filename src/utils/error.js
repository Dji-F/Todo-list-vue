const ERROR_CODES = {
    INVALID_PASSWORD: 'Invalid password.',
    EMAIL_NOT_FOUND: 'Invalid email.',
    EMAIL_EXISTS: 'The email address is already in use by another account.',
    auth: 'Please login.'
}

export function error(code) {
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Error not defined'
}
