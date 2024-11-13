import axios from "axios"

const url = process.env.REACT_APP_EMAIL_API
// console.log(url)
export const allEmail = axios.create({
    baseURL: url
})

export const emailBody = axios.create({
    baseURL: `${url}`
})