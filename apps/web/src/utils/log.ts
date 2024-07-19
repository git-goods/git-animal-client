import axios from 'axios';

export const sendLog = async (data: any) => {
  try {
    const res = await axios.post('/api/googleSheet', data);
    if (!res.data.success) {
      throw new Error('Failed to send log');
    }
  } catch (e) {
    console.error(e);
  }
};
