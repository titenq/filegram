import { backendBaseUrl } from '@/helpers/baseUrl';
import getCredentials from '@/helpers/getCredentials';

const deleteFile = async (id: string, messageId: string) => {
  try {
    const response = await fetch(`${backendBaseUrl}/files/${id}/${messageId}`, {
      method: 'DELETE',
      headers: {
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

export default deleteFile;
