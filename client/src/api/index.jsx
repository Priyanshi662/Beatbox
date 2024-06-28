import axios from 'axios';

export const client=axios.create(
    {
        // baseURL:"https://melody-mix-server.vercel.app/"
        baseURL:"http://localhost:3000"
    }
)