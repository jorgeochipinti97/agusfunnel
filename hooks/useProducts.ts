import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '../interfaces';



export const useProducts = (url: string, config: SWRConfiguration = {}) => {
    const { data, error } = useSWR<IProduct[]>(`/api${url}`, config);

    return {
        products: data && data || [],
        isLoading: !error && !data,
        isError: error
    }

}