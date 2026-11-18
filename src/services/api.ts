import axios from 'axios';
import type { BeneficiarioRequest } from '../types/beneficiario';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function cadastrarBeneficiario(
  payload: BeneficiarioRequest,
  offlineMode = false,
): Promise<void> {
  if (offlineMode) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return;
  }
  await api.post('/beneficiarios', payload);
}

export default api;
