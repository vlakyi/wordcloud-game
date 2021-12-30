import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// context
import { NickNameContext } from '../contexts/NickNameContext';

interface Props {
  children: JSX.Element;
}

// We will need to add Score validation in case of global state caching.
const RequireNickName = ({ children }: Props): JSX.Element => {
  const { globalNickName } = useContext(NickNameContext);

  if (!globalNickName) {
    return <Navigate to={'/'} />;
  }

  return <>{children}</>;
};

export default RequireNickName;
