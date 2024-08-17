import axios from 'axios';

export const sendLog = async (data: object, description?: string) => {
  try {
    const res = await axios.post('/api/googleSheet', { description, ...data });
    if (!res.data.success) {
      throw new Error('Failed to send log');
    }
  } catch (e) {
    console.error(e);
  }
};

export const getIsOnLoadSheet = async () => {
  try {
    const res = await axios.get('/api/googleSheet');
    if (!res.data.success) {
      throw new Error('Failed to get isOnLoadSheet');
    }

    console.info('isOnLoadSheet:', res.data.isOnLoadSheet);
  } catch (e) {
    console.error(e);
  }
};
