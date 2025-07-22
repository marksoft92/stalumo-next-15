import { Metadata } from 'next';
import descriptionsJson from '@/data/cityDescriptions.json';

const descriptions = descriptionsJson as Record<string, Record<string, string>>;

type Props = {
  params: {
    slugCity: string;
  };
};

export async function generateStaticParams() {
  const uslugi = [
    'balustrady-stalowe',
    'ogrodzenia-metalowe',
    'bramy-metalowe',
    'konstrukcje-stalowe',
    'grille-ogrodowe',
    'paleniska-metalowe',
    'malowanie-proszkowe',
    'balustrady-szklane',
    'furtki-metalowe',
    'schody-stalowe',
    'poręcze-stalowe',
    'zadaszenia-ze-szkla',
    'bramy-segmentowe',
    'balustrady-nierdzewne',
    'ogrodzenia-panelowe',
    'konstrukcje-spawane',
    'elementy-dekoracyjne-stalowe',
    'zadaszenia-metalowe',
    'bramy-przemysłowe',
    'meble-ogrodowe-metalowe',
  ];

  const miasta = [
    // Dolnośląskie
    'wroclaw', 'legnica', 'walbrzych', 'jelenia-gora', 'lubin', 'glogow', 'zgorzelec', 'swidnica', 'dzierzoniow', 'oleśnica',
    'kłodzko', 'lubawka', 'milicz', 'trzebnica', 'strzelin', 'polkowice', 'namyslow', 'olesnica', 'chodziez', 'nowa-ruda', 'zlotoryja',
  
    // Kujawsko-pomorskie
    'bydgoszcz', 'torun', 'wloclawek', 'grudziadz', 'inowroclaw', 'koronowo', 'naklo', 'swiecie', 'ciechocinek', 'solca-kamienna',
    'tuchola', 'szubin', 'debica', 'rabka-zdroj', 'chelmza', 'zoliborz', 'biale-blota', 'lipno', 'mrocza', 'radziejow', 'radom',
  
    // Lubelskie
    'lublin', 'chelm', 'zagorze', 'pulawy', 'biala-podlaska', 'zamosc', 'kraśnik', 'lubartow', 'krasnystaw', 'swidnik',
    'opole-lubelskie', 'janow-lubelski', 'wlodawa', 'hrubieszow', 'krasnik', 'tomaszow-lubelski', 'szczebrzeszyn', 'lukow', 'parczew', 'zamosc', 'krasnik',
  
    // Lubuskie
    'zielona-gora', 'gorzow-wielkopolski', 'nowa-sol', 'zagan', 'slubice', 'sulechow', 'wschowa', 'lubiszyn', 'szprotawa', 'miedzyrzecz',
    'strzelce-krajenskie', 'sulęcin', 'bytom-ozdowski', 'międzyrzecz', 'sieniawa', 'szczaniec', 'nowa-sol', 'krosno-odrzanskie', 'wolsztyn', 'slubice',
  
    // Łódzkie
    'lodz', 'piotrkow-trybunalski', 'belchatow', 'skierniewice', 'pabianice', 'zduńska-wola', 'kutno', 'zgierz', 'tomaszow-mazowiecki', 'radomsko',
    'pabianice', 'skierniewice', 'lowicz', 'piotrkow-trybunalski', 'brzeziny', 'gora-kalwaria', 'koluszki', 'opoczno', 'rawa-mazowiecka', 'skierniewice',
  
    // Małopolskie
    'krakow', 'nowy-sacz', 'tarnow', 'chrzanow', 'olkusz', 'wadowice', 'zakopane', 'oswiecim', 'brzesko', 'gorlice',
    'limanowa', 'muszyna', 'myślenice', 'bochnia', 'krakow', 'tyniec', 'andrychow', 'krakow', 'kalwaria-zebrzydowska', 'alwernia', 'krakow',
  
    // Mazowieckie
    'warszawa', 'radom', 'plock', 'siedlce', 'ostroleka', 'czestochowa', 'piaseczno', 'nowy-dwor-mazowiecki', 'pruszkow', 'warszawa',
    'warszawa', 'grodzisk-mazowiecki', 'pultusk', 'sochaczew', 'mazowieckie', 'wyszkow', 'legionowo', 'pruszkow', 'piaseczno', 'nowy-dwor-mazowiecki',
  
    // Opolskie
    'opole', 'krapkowice', 'prudnik', 'klodzko', 'namyslow', 'brzeg', 'nysa', 'glubczyce', 'ozimek', 'kędzierzyn-kozle',
    'opolskie', 'krapkowice', 'prudnik', 'klodzko', 'namyslow', 'brzeg', 'nysa', 'glubczyce', 'ozimek', 'kędzierzyn-kozle',
  
    // Podkarpackie
    'rzeszow', 'stalowa-wola', 'przemysl', 'krosno', 'jaslo', 'mielec', 'sanok', 'tarnobrzeg', 'leżajsk', 'kolbuszowa',
    'lesko', 'lubaczow', 'dębica', 'rzeszow', 'stalowa-wola', 'przemysl', 'krosno', 'jaslo', 'mielec', 'sanok', 'tarnobrzeg',
  
    // Podlaskie
    'bialystok', 'lomza', 'suwałki', 'augustów', 'sokółka', 'sejny', 'goniadz', 'kolno', 'wysokie-mazowieckie', 'ryki',
    'bialystok', 'lomza', 'suwałki', 'augustów', 'sokółka', 'sejny', 'goniadz', 'kolno', 'wysokie-mazowieckie', 'ryki',
  
    // Pomorskie
    'gdansk', 'gdynia', 'sopot', 'starogard-gdanski', 'wejherowo', 'slupsk', 'tczew', 'kwidzyn', 'bytow', 'malbork',
    'pruszcz-gdanski', 'cieszyn', 'czestochowa', 'lębork', 'chojnice', 'człuchów', 'starogard-gdanski', 'wejherowo', 'slupsk', 'tczew',
  
    // Śląskie
    'katowice', 'gliwice', 'cieszyn', 'czestochowa', 'bielsko-biala', 'rybnik', 'rydułtowy', 'tarnowskie-gory', 'zabrze', 'chorzow',
    'myslowice', 'jastrzebie-zdroj', 'piekary-slaskie', 'bytom', 'czeladz', 'rydułtowy', 'myslowice', 'cieszyn', 'czestochowa', 'rybnik',
  
    // Świętokrzyskie
    'kielce', 'ostrowiec-swietokrzyski', 'starachowice', 'skarzysko-kamienna', 'busko-zdroj', 'staszow', 'pińczów', 'jedrzejow', 'sandomierz', 'kowala',
    'kielce', 'ostrowiec-swietokrzyski', 'starachowice', 'skarzysko-kamienna', 'busko-zdroj', 'staszow', 'pińczów', 'jedrzejow', 'sandomierz', 'kowala',
  
    // Warmińsko-mazurskie
    'olsztyn', 'elblag', 'dzialdowo', 'morag', 'braniewo', 'bartoszyce', 'giżycko', 'wegorzewo', 'lubawa', 'nowe-miasto-lubawskie',
    'olecko', 'ketrzyn', 'szczytno', 'pisz', 'nidzica', 'dobrzyn', 'warminsko-mazurskie', 'giżycko', 'wegorzewo', 'olsztyn', 'elblag',
  
    // Wielkopolskie
    'poznan', 'kalisz', 'konin', 'piła', 'leszno', 'gniezno', 'ostrow-wielkopolski', 'grodzisk-wielkopolski', 'wrzesnia', 'jarocin',
    'szamotuly', 'krotoszyn', 'slupca', 'wolsztyn', 'ostrow-wielkopolski', 'czarnkow', 'oborniki', 'kolobrzeg', 'międzychód', 'wolsztyn',
  
    // Zachodniopomorskie
    'szczecin', 'koszalin', 'kolobrzeg', 'stargard', 'drawsko-pomorskie', 'miedzyzdroje', 'pruszcz-gdanski', 'police', 'mysliborz', 'choszczno',
    'goleniów', 'pyrzyce', 'kamien-pomorski', 'kamien-pomorski', 'miedzyzdroje', 'pruszcz-gdanski', 'police', 'mysliborz', 'slawno', 'goleniów',
  ];


  return uslugi.flatMap((slug) =>
    miasta.map((city) => ({
      slugCity: `${slug}~${city}`,
    }))
  );
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const [slug, city] = params.slugCity.split('~');
  const formattedSlug = slug.replace(/-/g, ' ');
  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);

  const cityDescriptions = descriptions[city.toLowerCase()];
console.log(cityDescriptions?.[slug])
  const description = cityDescriptions?.[slug]
    ? cityDescriptions[slug]
    : `Zamów ${formattedSlug} w ${formattedCity}. Profesjonalny montaż i nowoczesny design.`;
    console.log(description)
  return {
    title: `${formattedSlug} w ${formattedCity} - Stalumo`,
    description,
    openGraph: {
      title: `${formattedSlug} w ${formattedCity} - Stalumo`,
      description,
      images: ['https://stalumo.com/images/stalumo_logo_black.png'],
    },
  };
}

export default function Page({ params }: Props) {
  const [slug, city] = params.slugCity.split('~');
  const formattedSlug = slug.replace(/-/g, ' ');
  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);

  const cityDescriptions = descriptions[city.toLowerCase()];
  const description = cityDescriptions?.[slug]
    ? cityDescriptions[slug]
    : `Stalumo oferuje ${formattedSlug} w ${formattedCity}. Skontaktuj się z nami, aby otrzymać darmową wycenę.`;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        {formattedSlug} w {formattedCity}
      </h1>
      <p className="mt-4">{description}</p>
    </div>
  );
}
