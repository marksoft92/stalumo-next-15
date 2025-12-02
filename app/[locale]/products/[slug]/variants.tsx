import { useState } from "react";
import { useRouter } from "next/navigation";

// Import JSON z wariantami
import productsData from "@/data/christmas-products.json";

type VariantSelectorProps = {
    productType: any;
    currentColor: any;
    currentSize: any;
    locale: 'pl' | 'en' | 'de';
};

const colorNames = {
    pl: {
        champagne: 'Szampański',
        silver: 'Srebrny',
        black: 'Czarny',
        copper: 'Miedziany',
        gold: 'Złoty'
    },
    en: {
        champagne: 'Champagne',
        silver: 'Silver',
        black: 'Black',
        copper: 'Copper',
        gold: 'Gold'
    },
    de: {
        champagne: 'Champagner',
        silver: 'Silber',
        black: 'Schwarz',
        copper: 'Kupfer',
        gold: 'Gold'
    }
};

const sizeNames = {
    pl: {
        small: 'Mały',
        medium: 'Średni',
        large: 'Duży'
    },
    en: {
        small: 'Small',
        medium: 'Medium',
        large: 'Large'
    },
    de: {
        small: 'Klein',
        medium: 'Mittel',
        large: 'Groß'
    }
};

const colorClasses = {
    champagne: 'bg-gradient-to-br from-amber-200 to-amber-300',
    silver: 'bg-gradient-to-br from-gray-300 to-gray-400',
    black: 'bg-gradient-to-br from-gray-800 to-gray-900',
    copper: 'bg-gradient-to-br from-orange-400 to-orange-600',
    gold: 'bg-gradient-to-br from-yellow-400 to-yellow-600'
};

export default function VariantSelector({
    productType,
    currentColor,
    currentSize,
    locale
}: VariantSelectorProps) {
    const router = useRouter();
    const [selectedColor, setSelectedColor] = useState(currentColor);
    const [selectedSize, setSelectedSize] = useState(currentSize);

    // Znajdź produkt w JSON
    const product = productsData.products.find((p: any) => p.type === productType);

    if (!product) return null;

    const colors = product.variants.colors;
    const sizes = product.variants.sizes;

    const handleVariantChange = (color: string, size: string) => {
        const url = (product.urls as any)[locale][size][color];

        router.push(url);
    };

    const handleColorClick = (color: string) => {
        setSelectedColor(color);
        handleVariantChange(color, selectedSize);
    };

    const handleSizeClick = (size: string) => {
        setSelectedSize(size);
        handleVariantChange(selectedColor, size);
    };

    return (
        <div className="space-y-6 bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm p-6 rounded-2xl border border-yellow-700/30">
            {/* Color Selection */}
            <div>
                <h3 className="text-lg font-semibold text-yellow-300 mb-4">
                    {locale === 'pl' ? 'Kolor' : locale === 'en' ? 'Color' : 'Farbe'}:
                    <span className="ml-2 text-white">{colorNames[locale][selectedColor as keyof typeof colorNames.pl]}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                    {colors.map((color: string) => (
                        <button
                            key={color}
                            onClick={() => handleColorClick(color)}
                            className={`relative w-12 h-12 rounded-full transition-all duration-300 ${colorClasses[color as keyof typeof colorClasses]
                                } ${selectedColor === color
                                    ? 'ring-4 ring-yellow-500 ring-offset-2 ring-offset-neutral-900 scale-110'
                                    : 'hover:scale-105 ring-2 ring-neutral-700'
                                }`}
                            title={colorNames[locale][color as keyof typeof colorNames.pl]}
                        >
                            {selectedColor === color && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Size Selection */}
            <div>
                <h3 className="text-lg font-semibold text-yellow-300 mb-4">
                    {locale === 'pl' ? 'Rozmiar' : locale === 'en' ? 'Size' : 'Größe'}:
                    <span className="ml-2 text-white">{sizeNames[locale][selectedSize as keyof typeof sizeNames.pl]}</span>
                </h3>
                <div className="grid grid-cols-3 gap-3">
                    {sizes.map((size: string) => (
                        <button
                            key={size}
                            onClick={() => handleSizeClick(size)}
                            className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedSize === size
                                ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white border-2 border-yellow-500 shadow-lg shadow-yellow-500/30 scale-105'
                                : 'bg-neutral-800 text-neutral-300 border-2 border-neutral-700 hover:border-yellow-600/50 hover:text-white'
                                }`}
                        >
                            {sizeNames[locale][size as keyof typeof sizeNames.pl]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Info text */}
            <p className="text-sm text-neutral-400 italic">
                {locale === 'pl'
                    ? '* Wybierz kolor i rozmiar aby zobaczyć dostępność'
                    : locale === 'en'
                        ? '* Select color and size to check availability'
                        : '* Wählen Sie Farbe und Größe, um die Verfügbarkeit zu prüfen'}
            </p>
        </div>
    );
}