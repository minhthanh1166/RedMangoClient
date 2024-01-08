import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../Components/Page/Common";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!accessToken) {
        // Redirect to the login page if the user is not authenticated
        navigate("/login");
      }
      setLoading(false);
    }, [accessToken, navigate]);


    if (loading) {
      return <MainLoader />;
    }
    // Render the wrapped component with the provided props
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
