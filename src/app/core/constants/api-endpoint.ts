import { ALPHA_VANTAGE_API_KEY } from '../../../environments/environment';

export const API_ENDPOINTS = {
  stock: {
    quote: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=${ALPHA_VANTAGE_API_KEY}`,
  }
};