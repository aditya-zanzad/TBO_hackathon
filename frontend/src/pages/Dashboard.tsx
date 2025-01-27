

const Sidebar = () => (

  <div className="bg-gray-800 w-64 h-full flex flex-col p-4 space-y-6">
    <h1 className="text-xl font-bold">Admin Dashboard</h1>
    <nav className="flex flex-col space-y-4">
      <a href="#" className="text-gray-300 hover:text-white">Dashboard</a>
      <a href="#" className="text-gray-300 hover:text-white">User Info</a>
      <a href="#" className="text-gray-300 hover:text-white">Itinerary</a>
      <a href="#" className="text-gray-300 hover:text-white">Settings</a>
    </nav>
  </div>
);

const Header = () => (
  <header className="bg-gray-800 h-16 flex items-center px-6 justify-between">
    <h2 className="text-2xl font-semibold">Welcome, User</h2>
    <button className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600">Logout</button>
  </header>
);

const Dashboard = () => {
  const userInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  };

  const itinerary = [
    { id: 1, location: "New York", date: "2025-02-10" },
    { id: 2, location: "Paris", date: "2025-03-15" },
    { id: 3, location: "Tokyo", date: "2025-04-20" },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 space-y-6">

          <section className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">User Information</h3>
            <div className="space-y-2">
              <p><span className="font-bold">Name:</span> {userInfo.name}</p>
              <p><span className="font-bold">Email:</span> {userInfo.email}</p>
              <p><span className="font-bold">Phone:</span> {userInfo.phone}</p>
            </div>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Itinerary</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-3">ID</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {itinerary.map((item) => (
                  <tr key={item.id} className="odd:bg-gray-800 even:bg-gray-700">
                    <td className="p-3">{item.id}</td>
                    <td className="p-3">{item.location}</td>
                    <td className="p-3">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>

  );
};

export default Dashboard;
