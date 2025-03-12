import { backendBaseUrl } from '@/helpers/baseUrl';
import getCredentials from '@/helpers/getCredentials';

const getFiles = async () => {
  try {
    const response = await fetch(`${backendBaseUrl}/files`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${getCredentials()}`
      }
    });

    if (!response.ok) {
      return { error: response.status };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default getFiles;
