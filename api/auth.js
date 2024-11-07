const API_BASE_URL = 'http://192.168.56.1:3000/api'; // API URL'inizi güncelleyin

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/personel/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ kullanici_adi: username, sifre: password }),
  });

  if (!response.ok) {
    throw new Error('Geçersiz kullanıcı adı veya şifre');
  }

  return await response.json();
};
