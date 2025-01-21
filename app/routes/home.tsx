import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'RESTExplorer' },
    { name: 'Check out country data!', content: 'Welcome to RESTExplorer.' },
  ];
}

export default function Home() {
  return (
    <section className="px-2 py-32 bg-white md:px-0">
      <div className="container items-center max-w-6xl mx-auto xl:px-5">
        <div className="flex flex-wrap items-center sm:-mx-3">
          <div className="w-full md:w-1/2 md:px-3">
            <div className="space-y-6 sm:max-w-md lg:max-w-lg">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                <span className="block xl:inline">Explore Countries with </span>
                <span className="block text-indigo-600 xl:inline">
                  Real-Time Data
                </span>
              </h1>

              <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl">
                Discover details about every country around the world – from
                capitals to regions!
              </p>

              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <Link
                  to="/countries"
                  className="flex items-center justify-center px-6 py-3 text-lg text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Explore Now
                  <ArrowRight className="ml-1" />
                </Link>

                <Link
                  to="/about"
                  className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="overflow-hidden rounded-md shadow-xl">
              <img
                src="https://image.winudf.com/v2/image/Ymx1ZWNhcC5pbWFnZXouYmVhdXRpZnVsX2NvdW50cmllc193YWxscGFwZXJzX3NjcmVlbl8wXzlpMW14OWl1/screen-0.webp?fakeurl=1&type=.webp"
                alt="Explore countries"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
