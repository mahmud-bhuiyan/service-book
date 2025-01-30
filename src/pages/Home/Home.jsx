import { useContext } from "react";
import { Link } from "react-router-dom";
import DynamicHelmet from "../../components/Custom/DynamicHelmet";
import { AuthContext } from "../../context/AuthContext";
import { FaAngleRight } from "react-icons/fa";

const Home = () => {
  const { user } = useContext(AuthContext);

  const cards = [
    {
      title: "Profile",
      description: "View and edit your profile",
      link: "/profile",
      color: "from-blue-600 to-blue-400",
    },
    {
      title: "Car Loan Form",
      description: "Apply for a car loan",
      link: "/car-loan",
      color: "from-green-600 to-green-400",
    },
    {
      title: "Insurance",
      description: "Manage your insurance policies",
      link: "/insurance",
      color: "from-purple-600 to-purple-400",
    },
    {
      title: "Service History",
      description: "View your service history",
      link: "/service-history",
      color: "from-orange-600 to-orange-400",
    },
    {
      title: "Appointments",
      description: "Schedule and manage appointments",
      link: "/appointments",
      color: "from-pink-600 to-pink-400",
    },
    {
      title: "Support",
      description: "Get help and support",
      link: "/support",
      color: "from-indigo-600 to-indigo-400",
    },
  ];

  return (
    <div className="mx-auto mt-10 py-12 px-4 sm:px-6 lg:px-8">
      <DynamicHelmet title={"Home | ServiceBook"} />

      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              {user?.displayName}!
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Manage your automotive services in one place
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10 group-hover:opacity-20 transition-opacity rounded-xl`}
              />

              {/* Card Content */}
              <div className="p-8 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{card.description}</p>
                  </div>
                  <FaAngleRight className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2">
              <span>New Service Request</span>
            </button>
            <button className="flex-1 bg-gray-50 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center justify-center space-x-2 border border-gray-200">
              <span>View Documents</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
