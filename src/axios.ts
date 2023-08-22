import axiosPackage from 'axios'

const axios = axiosPackage.create({
  baseURL: process.env.SERVER_ADDRESS,
  withCredentials: true,
})

export default axios
