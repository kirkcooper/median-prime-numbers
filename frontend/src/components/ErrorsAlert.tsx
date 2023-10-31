import React from 'react';

type ErrorsAlertProps = {
  errors: string[];
};

export const ErrorsAlert: React.FC<ErrorsAlertProps> = ({ errors }) => {
  if (errors.length === 0) {
    // Don't render when there are no errors!
    return <></>;
  }

  return (
    <div className="alert alert-error text-xs shadow-sm">
      {/* Error icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <ul>
        {errors.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    </div>
  );
};
