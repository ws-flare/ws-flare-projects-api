const {MYSQL_HOST, MYSQL_PORT} = process.env;

export const config = {
    name: 'mysql',
    connector: 'mysql',
    url: '',
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: 'test',
    password: 'test',
    database: 'projects'
};
