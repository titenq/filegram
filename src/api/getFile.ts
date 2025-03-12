import { backendBaseUrl } from '@/helpers/baseUrl';
import getCredentials from '@/helpers/getCredentials';

const getFile = async (fileId: string, filename: string) => {
  try {
    const response = await fetch(`${backendBaseUrl}/files/${fileId}/download`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${getCredentials()}`
      }
    });

    if (!response.ok) throw new Error('Erro no download');

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default getFile;
