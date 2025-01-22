import ky from '~/lib/ky';

import LoaderElement from '~/components/LoaderElement';

import type { Route } from './+types/country';
import type { Country } from '~/types/country';

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Country: ${params.countryName}` },
    { name: 'Country', content: 'Welcome to the country page.' },
  ];
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  const countryName = params.countryName;

  const data = await ky
    .get(`/name/${countryName}`, {
      searchParams: {
        fields: 'name,capital,population,region,subregion,flags',
        fullText: true,
      },
    })
    .json<Country[]>();

  return {
    name: data[0]?.name?.common || 'N/A',
    officialName: data[0]?.name?.official || 'N/A',
    region: data[0]?.region || 'N/A',
    subregion: data[0]?.subregion || 'N/A',
    capital: data[0]?.capital || 'N/A',
    population: data[0]?.population || 'N/A',
    flagUrl: data[0]?.flags?.png || '',
  };
}

export function HydrateFallback() {
  return <LoaderElement />;
}

export default function Country({ loaderData }: Route.ComponentProps) {
  const country = loaderData;

  return (
    <section className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-gray-900">{country.name}</h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Official Name:</span>{' '}
            {country.officialName}
          </p>

          <p>
            <span className="font-semibold">Capital:</span> {country.capital}
          </p>

          <p>
            <span className="font-semibold">Region:</span> {country.region}
          </p>

          <p>
            <span className="font-semibold">Subregion:</span>{' '}
            {country.subregion}
          </p>

          <p>
            <span className="font-semibold">Population:</span>{' '}
            {country.population.toLocaleString()}
          </p>
        </div>
      </div>

      {country.flagUrl && (
        <div className="flex justify-center items-center">
          <img
            src={country.flagUrl}
            className="w-56 h-auto border rounded shadow-lg"
          />
        </div>
      )}
    </section>
  );
}
