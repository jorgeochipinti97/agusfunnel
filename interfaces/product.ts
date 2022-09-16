export interface IProduct {
    _id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ISize[];
    slug: string;
    tags: string[];
    title: string;
    type: IType;
    popular: boolean;
    destacados: boolean;
    createdAt: string;
    updatedAt: string;

}

export type ISize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL' | 'Unique' | '7.5' | '8' | '8.5' | '9' | '9.5' | '10' | '10.5' | '11' | '11.5' | '12' | '12.5' | '13' | '14' | '15';
export type IType = 'remeras' | 'bodys' | 'tops' | 'vestidos' | 'zapatos' | 'zapatillas' | 'gorros' | 'carteras' | 'buzos'
