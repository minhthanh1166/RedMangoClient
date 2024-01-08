import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("token");

    useEffect(() => {
      if (!accessToken) {
        // Redirect to the login page if the user is not authenticated
        navigate("/login");
      }
    }, [accessToken, navigate]);

    // Render the wrapped component with the provided props
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
