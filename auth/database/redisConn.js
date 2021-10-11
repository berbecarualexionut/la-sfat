import redis from "redis";

const client = redis.createClient({
    host: "redis",
    port: 6379,
    db: 1
})

// save user token, ttl will be 31 day for each REGEN token
const addRefreshToken = (token) => {
    client.set(token, "0", 'EX', 31 * 60 * 60)
}

const deleteRefreshToken = (token, callback) => {
    client.del(token, callback)
}

const getToken = (token, callback) => {
    client.get(token, callback)
}


export { addRefreshToken, deleteRefreshToken, getToken }