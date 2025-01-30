import { useState, useContext } from "react";
import DynamicHelmet from "../../components/Custom/DynamicHelmet";
import { UserContext } from "../../context/UserContext";

const CarLoan = () => {
  const { userDetails } = useContext(UserContext);
  console.log("userDetails", userDetails);

  const [formData, setFormData] = useState({
    fullName: userDetails?.fullName || "",
    email: userDetails?.email || "",
    phoneNumber: "",
    loanAmount: "",
    loanTerm: "",
    employmentStatus: "",
    annualIncome: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    // For now, we'll just show an alert
    alert("Form saved successfully!");
  };

  const handlePreview = () => {
    // Here you would typically navigate to a preview page or show a modal
    console.log("Preview data:", formData);
    // For now, we'll just show an alert with the form data
    alert("Preview: " + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <DynamicHelmet title="Car Loan Application | ServiceBook" />
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Car Loan Application
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label
            htmlFor="loanAmount"
            className="block text-sm font-medium text-gray-700"
          >
            Loan Amount ($)
          </label>
          <input
            type="number"
            name="loanAmount"
            id="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label
            htmlFor="loanTerm"
            className="block text-sm font-medium text-gray-700"
          >
            Loan Term (months)
          </label>
          <input
            type="number"
            name="loanTerm"
            id="loanTerm"
            value={formData.loanTerm}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label
            htmlFor="employmentStatus"
            className="block text-sm font-medium text-gray-700"
          >
            Employment Status
          </label>
          <select
            name="employmentStatus"
            id="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          >
            <option value="">Select status</option>
            <option value="employed">Employed</option>
            <option value="self-employed">Self-employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="retired">Retired</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="annualIncome"
            className="block text-sm font-medium text-gray-700"
          >
            Annual Income ($)
          </label>
          <input
            type="number"
            name="annualIncome"
            id="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="flex justify-between pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handlePreview}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Preview
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarLoan;
