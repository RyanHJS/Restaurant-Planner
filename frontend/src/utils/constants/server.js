//// const IP = "localhost";
// const SERVER_PORT = 8080;

const SERVER_IP = process.env.REACT_APP_SERVER_URL;
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
const API_ROUTE_PREFIX = "/api";

const server = {
    url: `${SERVER_IP}:${SERVER_PORT}` + API_ROUTE_PREFIX,
};

export default server;
