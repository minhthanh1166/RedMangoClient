import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { SD_Roles } from "../Utility/SD";

const withAdminAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("token") ?? "";

    useEffect(() => {
      const checkAdminAuth = () => {
        if (accessToken) {
          const decode: { role: string } = jwtDecode(accessToken);

          if (decode.role !== SD_Roles.ADMIN) {
            // Navigate to the accessDenied page if the user is not an admin
            navigate("/accessDenied");
          }
        } else {
          // Navigate to the login page if there is no access token
          navigate("/login");
        }
      };

      checkAdminAuth();
    }, [accessToken, navigate]);

    // Render the wrapped component with the provided props
    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
