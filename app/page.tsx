import ScopusSearch from "@/components/ScopusSearch";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Scopus API Search</h1>
      <ScopusSearch />
    </div>
  );
}
