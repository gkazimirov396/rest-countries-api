import { useMemo } from 'react';

import ky from 'ky';
import { Link, useLoaderData, useSearchParams } from 'react-router';

import LoaderElement from '~/components/LoaderElement';

import type { Route } from './+types/countries';
import type { Country } from '~/types/country';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Countries' },
    {
      name: 'Explore country data!',
      content: 'Welcome to the countries page.',
    },
  ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const data = await ky
    .get('https://restcountries.com/v3.1/all', {
      searchParams: {
        fields: 'name,population,region,cca3',
      },
    })
    .json<Country[]>();

  return data;
}

export function HydrateFallback() {
  return <LoaderElement />;
}

export default function Countries({}: Route.ComponentProps) {
  const countries = useLoaderData<typeof clientLoader>();
  const [searchParams, setSearchParams] = useSearchParams({
    search: '',
    region: '',
  });

  const search = searchParams.get('search') ?? '';
  const region = searchParams.get('region') ?? '';

  const filteredCountries = useMemo(() => {
    return countries.filter(country => {
      const matchesRegion =
        !region || country.region.toLowerCase() === region.toLowerCase();

      const matchesSearch =
        !search ||
        country.name.common.toLowerCase().includes(search.toLowerCase());

      return matchesSearch && matchesRegion;
    });
  }, [countries, search, region]);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Countries</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={e =>
            setSearchParams(prevParams => {
              prevParams.set('search', e.target.value);

              return prevParams;
            })
          }
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:border-indigo-500"
        />
        <select
          value={region}
          onChange={e =>
            setSearchParams(prevParams => {
              prevParams.set('region', e.target.value);

              return prevParams;
            })
          }
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:border-indigo-500"
        >
          <option value="">All Regions</option>
          <option value="africa">Africa</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>

      {filteredCountries.length === 0 ? (
        <div> No countries match your filters. </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCountries.map(country => (
            <li
              key={country.cca3}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <Link
                to={`/countries/${country.name.common}`}
                className="text-indigo-600 hover:underline text-lg font-semibold"
              >
                {country.name.common}
              </Link>

              <div className="text-gray-600 text-sm mt-1">
                Region: {country.region} <br />
                Population: {country.population.toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
