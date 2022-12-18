import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthProvider';

interface Props {
  component: React.ReactNode;
  redirect: string;
}

const RouteAuthGuard: React.FC<Props> = ({ component, redirect }) => {
  const { state: authUser } = useAuthContext();

  if (!authUser.isSignedIn) {
    return (
      <Navigate to={redirect} state={{ from: useLocation() }} replace={false} />
    );
  }

  return <>{component}</>;
};

export default RouteAuthGuard;
