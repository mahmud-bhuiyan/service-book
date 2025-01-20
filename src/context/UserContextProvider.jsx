import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile } from "../services/apis/User";
import { AuthContext } from "./AuthContextProvider";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [allUsers, setAllUsers] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.email) {
        try {
          setIsLoading(true);
          setError(null);
          const data = await getUserProfile();
          console.log("getUserProfile", data);
          if (data && data.user) {
            setUserDetails(data.user);
          } else {
            setError("User data not found");
          }
        } catch (error) {
          setError("Failed to fetch user profile");
          console.error("Error fetching user profile:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [user?.email]);

  const authInfo = {
    userDetails,
    setUserDetails,
    isLoading,
    setIsLoading,
    allUsers,
    setAllUsers,
    error,
  };

  return (
    <UserContext.Provider value={authInfo}>{children}</UserContext.Provider>
  );
};
