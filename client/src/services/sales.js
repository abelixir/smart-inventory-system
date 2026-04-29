import api from './api';

export const createSale = (saleData) => api.post('/sales', saleData);
export const getAllSales = () => api.get('/sales');