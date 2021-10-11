import crypto from 'crypto'

const hashPassword = (password) => {
    const hash = crypto.createHash('sha256').update(password).digest('hex')

    return hash
}

export { hashPassword }