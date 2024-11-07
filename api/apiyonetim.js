const API_BASE_URL = 'http://192.168.56.1:3000';

export const fetchRoles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/roller`);
    return await response.json();
  } catch (error) {
    console.error('Roller alınamadı:', error);
    throw error;
  }
};

export const fetchPersonnel = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/personel`);
    return await response.json();
  } catch (error) {
    console.error('API’den veriler alınamadı:', error);
    throw error;
  }
};

export const addPersonnel = async (personnelData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/personel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(personnelData),
    });
    if (!response.ok) {
      throw new Error('Personel eklenemedi');
    }
    return await response.json();
  } catch (error) {
    console.error('API’ye bağlanırken hata oluştu: ', error);
    throw error;
  }
};

export const deletePersonnel = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/personel/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Personel silinemedi');
    }
  } catch (error) {
    console.error('API’den silme işlemi yapılamadı:', error);
    throw error;
  }
};
