import DatabaseRestApi from "./database";

const DatabasePage = () => {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">REST API Database</h1>
          <p className="text-gray-400">Visualizing database operations through REST endpoints</p>
        </div>
        
        <div className="flex justify-center">
          <DatabaseRestApi />
        </div>
      </div>
    </div>
  );
};

export default DatabasePage;