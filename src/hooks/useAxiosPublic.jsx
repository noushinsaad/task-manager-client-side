import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000'
    // baseURL: 'https://task-management-server-site-pvonlwphr-saads-projects-002d07dd.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;