import { useContext, useEffect, useState } from "react";
import { getUserProfile } from "../services/apis/User";
import { AuthContext } from "./AuthContext";
import { UserContext } from "./UserContext";

const UserContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("userDetails", userDetails);
  useEffect(() => {
    let isMounted = true;

    const fetchUserProfile = async () => {
      if (user?.email) {
        console.log(user?.email);
        try {
          setIsLoading(true);
          setError(null);
          const data = await getUserProfile();
          if (isMounted && data && data.data.user) {
            setUserDetails(data.data.user);
            console.log("User profile fetched:", data.data.user);
          } else if (isMounted) {
            setError("User data not found");
          }
        } catch (error) {
          if (isMounted) {
            setError("Failed to fetch user profile");
            console.error("Error fetching user profile:", error);
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchUserProfile();

    return () => {
      isMounted = false;
    };
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

export default UserContextProvider;
