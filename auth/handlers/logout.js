import  { deleteRefreshToken } from './../database/redisConn.js'

const logoutHandler = (request, response) => {
    const {token} = request.body

    deleteRefreshToken(token, (_, resp) => {
        if (resp == 1) {
            return response.json({'status': 'ok'})
        } else {
            return response.status(400).json({'error': 'Failed to delete token'})
        }
    })

}

export { logoutHandler }