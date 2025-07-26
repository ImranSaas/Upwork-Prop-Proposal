import React from "react";

interface AccountVerificationScreenProps {
  onVerificationComplete: () => Promise<void>;
  onGoBack?: () => void;
  email: string;
}

const AccountVerificationScreen: React.FC<AccountVerificationScreenProps> = ({ onVerificationComplete, onGoBack, email }) => {
  return (
    <div>
      <h2>Account Verification Screen Placeholder</h2>
      <p>Email: {email}</p>
      <button onClick={onVerificationComplete}>Complete Verification</button>
      {onGoBack && <button onClick={onGoBack}>Go Back</button>}
    </div>
  );
};

export default AccountVerificationScreen; 