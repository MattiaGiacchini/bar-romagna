// utils/menu.ts
// Menu data with prices
// Separated from i18n because prices change independently from translations

export interface MenuItem {
    id: string
    price: number
    indent?: boolean
    isVariant?: boolean // Para variantes de una categoría principal
}

export interface MenuSection {
    id: string
    price?: number // Precio de la categoría principal (ej: Café 1.40€)
    items: MenuItem[]
}

export interface MenuCategory {
    id: string
    tag: string
    sections: MenuSection[]
}

export const menuData: MenuCategory[] = [
    // Caffetteria
    {
        id: 'caffetteria',
        tag: 'cafeteria',
        sections: [
            {
                id: 'caffe',
                price: 1.40, // Precio base del café
                items: [
                    { id: 'caffe_deca', price: 1.50, isVariant: true },
                    { id: 'caffe_orzo', price: 1.50, isVariant: true },
                    { id: 'caffe_americano', price: 1.50, isVariant: true },
                    { id: 'caffe_corretto', price: 2.00, isVariant: true },
                    { id: 'caffe_shakerato', price: 2.50, isVariant: true },
                    { id: 'caffe_shakerato_corretto', price: 3.80, isVariant: true }
                ]
            },
            {
                id: 'cappuccino',
                price: 1.80, // Precio base del cappuccino
                items: [
                    { id: 'cappuccino_soia', price: 2.00, isVariant: true },
                    { id: 'cappuccione', price: 3.00, isVariant: true },
                    { id: 'cappuccino_vegetale', price: 2.20, isVariant: true }
                ]
            },
            {
                id: 'no_title', // Sin título de sección
                items: [
                    { id: 'mokaccino', price: 1.70 },
                    { id: 'nocciolino', price: 1.70 },
                    { id: 'ginseng', price: 1.70 },
                    { id: 'cioccolata', price: 3.50 },
                    { id: 'te_tisane', price: 2.00 },
                    { id: 'schiumina', price: 0.50 }
                ]
            }
        ]
    },
    // Bevande
    {
        id: 'bevande',
        tag: 'drinks',
        sections: [
            {
                id: 'no_title',
                items: [
                    { id: 'succo_frutta', price: 2.50 },
                    { id: 'spremuta', price: 4.00 },
                    { id: 'acqua_menta', price: 2.00 },
                    { id: 'analcolico', price: 3.00 },
                    { id: 'bicchiere_acqua', price: 0.50 }
                ]
            }
        ]
    },
    // Alcolici
    {
        id: 'alcolici',
        tag: 'alcohol',
        sections: [
            {
                id: 'no_title',
                items: [
                    { id: 'birra_piccola', price: 3.30 },
                    { id: 'birra_media', price: 4.50 },
                    { id: 'prosecco_vino', price: 4.00 },
                    { id: 'spritz', price: 6.00 },
                    { id: 'tassoni_aperol', price: 5.00 },
                    { id: 'americano', price: 6.00 },
                    { id: 'campari', price: 3.00 },
                    { id: 'campari_prosecco', price: 4.00 },
                    { id: 'moscow_mule', price: 3.50 },
                    { id: 'gin_tonic', price: 8.00 },
                    { id: 'gin_tonic_premium', price: 10.00 },
                    { id: 'negroni', price: 7.00 },
                    { id: 'jack_daniel', price: 5.00 },
                    { id: 'rum', price: 6.00 },
                    { id: 'ponch_rum', price: 6.00 },
                    { id: 'bombardino', price: 3.50 },
                    { id: 'grappa', price: 4.00 }
                ]
            },
            {
                id: 'amaro',
                price: 3.50, // Precio base de amari
                items: [
                    { id: 'sturalavandini', price: 4.00, isVariant: true },
                    { id: 'petrus', price: 4.00, isVariant: true },
                    { id: 'braulio', price: 4.00, isVariant: true }
                ]
            }
        ]
    }
]