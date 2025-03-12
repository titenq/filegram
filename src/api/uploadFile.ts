import { backendBaseUrl } from '@/helpers/baseUrl';
import getCredentials from '@/helpers/getCredentials';

const uploadFile = async (formData: FormData) => {
  try {
    const response = await fetch(`${backendBaseUrl}/files/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${getCredentials()}`
      },
      body: formData
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

export default uploadFile;
