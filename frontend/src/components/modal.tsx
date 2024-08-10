import React from 'react';
import { Wallet } from '../app/dashboard';

interface AppProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  wallets: Wallet[];
}

const App: React.FC<AppProps> = ({ showModal, setShowModal, wallets }) => {
  if (!showModal) {
    return null; // Return null instead of false if the modal should not be shown
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-[80%] max-h-[70vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-white mb-4">Generated Wallets</h2>
        <ul>
          {wallets.map((wallet, index) => (
            <li key={index} className="mb-3 p-2 border-b border-gray-700">
              <div className="text-gray-300">
                <strong>Blockchain:</strong> {wallet.blockchain}
              </div>
              <div className="text-gray-400">
                <strong>Public Key:</strong> {wallet.publicKey}
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowModal(false)}
          className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default App;
