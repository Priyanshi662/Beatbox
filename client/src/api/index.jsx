import axios from 'axios';

export const client=axios.create(
    {
        baseURL:"https://beatbox-server.vercel.app/"
        // baseURL:"http://localhost:3000"
    }
)