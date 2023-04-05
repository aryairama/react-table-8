import axios from 'axios';

export const actionGetProducts = async (search = '', page = 1, limit = 5, fieldOrder, order = 'DESC') => {
  try {
    const response = await (
      await axios.get(
        `https://api-tokoku.arya-irama-wahono.xyz/products?page=${page}&limit=${limit}&search=${search}&order=${order}&fieldOrder=${fieldOrder}`
      )
    ).data;
    return response;
  } catch (error) {
    console.log(error?.response?.data);
  }
};
