import React from 'react';
import Question from './Question';
import Success from './Success';
import Error from './Error';
import Warning from './Warning';
import Info from './Info';

export function Icon({icon = 'info'}) {
  const Component = () => {
    switch (icon) {
      default: {
        return <Success />;
      }
      case 'question': {
        return <Question />;
      }
      case 'success': {
        return <Success />;
      }
      case 'error': {
        return <Error />;
      }
      case 'warning': {
        return <Warning />;
      }
      case 'info': {
        return <Info />;
      }
    }
  };
  return <Component />;
}

export default React.memo(Icon);
