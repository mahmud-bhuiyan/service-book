import { useContext } from "react";
import { Link } from "react-router-dom";
import DynamicHelmet from "../../components/Custom/DynamicHelmet";
import { AuthContext } from "../../context/AuthContextProvider";

const Home = () => {
  const { user } = useContext(AuthContext);

  const cards = [
    {
      title: "Profile",
      description: "View and edit your profile",
      link: "/profile",
    },
    {
      title: "Car Loan Form",
      description: "Apply for a car loan",
      link: "/car-loan",
    },
    {
      title: "Insurance",
      description: "Manage your insurance policies",
      link: "/insurance",
    },
    {
      title: "Service History",
      description: "View your service history",
      link: "/service-history",
    },
    {
      title: "Appointments",
      description: "Schedule and manage appointments",
      link: "/appointments",
    },
    { title: "Support", description: "Get help and support", link: "/support" },
  ];

  return (
    <div className="mx-auto p-4">
      <DynamicHelmet title={"Home | ServiceBook"} />
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-xl font-semibold mb-2">
          Welcome, {user?.displayName}!
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="bg-white shadow-md rounded-lg p-8 hover:bg-gray-100 text-center"
          >
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p>{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
