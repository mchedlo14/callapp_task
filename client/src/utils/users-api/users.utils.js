import axios from "axios";

const PORT = "3000"
const BASE_URL = "http://localhost"
const ROOT_URL = `${BASE_URL}:${PORT}`
const USERS_URL = `${ROOT_URL}/api/users`
const SPECIFIC_USER_URL = (userId) => `${USERS_URL}/${userId}`
const USER_ANALYTICS_URL = `${ROOT_URL}/api/analytics`


export const listUsers = async () => {
  const req = await axios.get(USERS_URL)
  return req.data
}

export const deleteUser = async (userId) => {
  const req = await axios.delete(SPECIFIC_USER_URL(userId))
  return await req.data
}

export const updateUser = async (userId, dataToUpdateWith) => {
  const req = await axios.put(SPECIFIC_USER_URL(userId), dataToUpdateWith)
  return await req.data
}

export const createUser = async (userData) => {
  const req = await axios.post(USERS_URL, userData)
  return await req.data
}

export const getUsersCitiesPopulationAnalytics = async () => {
  const req = await axios.get(USER_ANALYTICS_URL)
  return await req.data
}