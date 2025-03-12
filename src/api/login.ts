import { backendBaseUrl } from '@/helpers/baseUrl';

const login = async (username: string, password: string) => {
  try {
    const response = await fetch(`${backendBaseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
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

export default login;
