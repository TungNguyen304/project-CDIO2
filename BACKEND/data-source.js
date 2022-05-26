import "reflect-metadata"

export const sqlconfig = {
    user: "sa",
    password: "30042001",
    database: "SearchJob",
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

