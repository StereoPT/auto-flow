import { useContext } from 'react';
import { FlowValidationContext } from '../context/FlowValidationContext';

export const useFlowValidation = () => {
  const context = useContext(FlowValidationContext);
  if (!context) {
    throw new Error(
      'useFlowValidation must be used within FlowValidationContext',
    );
  }

  return context;
};
