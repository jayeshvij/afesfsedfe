import React from 'react';
import QRCode from 'qrcode.react';

interface QRPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

const QRPaymentModal: React.FC<QRPaymentModalProps> = ({ isOpen, onClose, amount }) => {
  if (!isOpen) return null;

  const upiLink = `upi://pay?pa=jayeshvij2004@okaxis&pn=Jayesh%20Vij&am=${amount}&cu=INR`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Pay via UPI</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="text-center">
          <div className="mb-4">
            <QRCode value={upiLink} size={200} />
          </div>
          
          <p className="text-lg font-semibold mb-2">
            Amount: ₹{amount.toLocaleString()}
          </p>
          
          <p className="text-sm text-gray-600 mb-4">
            Scan the QR code with your UPI app to complete payment
          </p>
          
          <div className="space-y-2">
            <button
              onClick={onClose}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Payment Completed
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRPaymentModal;
