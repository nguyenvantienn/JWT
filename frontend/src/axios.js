
import axios from "axios";

const instance = axios.create({
    baseURL : process.env.SERVER_BASE_URL
});

export default instance;