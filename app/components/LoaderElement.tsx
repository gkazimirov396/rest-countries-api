import { Loader } from 'lucide-react';

export default function LoaderElement() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Loader className="size-8 text-indigo-500 animate-spin" />
    </div>
  );
}
