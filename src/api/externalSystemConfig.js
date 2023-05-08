import axios from '../utils/axios';

export async function saveExternalSystemConfig(payload) {
  await axios.post('externalSystemConfig', payload);
}

export async function getExternalSystemConfig(resourceId, resourceType, externalSystem) {
  return axios.get(`externalSystemConfig/${externalSystem}/${resourceType}/${resourceId}`);
}

export async function deleteExternalSystemConfig(resourceId, resourceType) {
  await axios.delete(`externalSystemConfig/${resourceType}/${resourceId}`);
}
