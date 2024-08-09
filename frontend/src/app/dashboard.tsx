import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [mnemonic, setMnemonic] = useState('');
  const [wallets, setWallets] = useState<{ blockchain: string; publicKey: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleGenerateMnemonic = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVICE_BASE_URL}${process.env.REACT_APP_MNEMONIC_ENDPOINT}`);
      setMnemonic(response.data.mnemonic);
      setError(null);
    } catch (err) {
      setError('Error generating mnemonic');
    }
  };

  const handleCreateWallets = async () => {
    if (!mnemonic) {
      setError('Mnemonic is required to generate wallets');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVICE_BASE_URL}${process.env.REACT_APP_WALLET_ENDPOINT}`, { mnemonic });
      setWallets(response.data);
      setShowModal(true);
      setError(null);
    } catch (err) {
      setError('Error creating wallets');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-6">Wallet Manager</h1>

        <div className="mb-6">
          <button
            onClick={handleGenerateMnemonic}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Generate Mnemonic
          </button>
          {mnemonic && (
            <div className="mt-6 p-4 border border-gray-700 rounded-lg bg-gray-900">
              <h2 className="text-lg font-semibold text-white mb-2">Mnemonic:</h2>
              <p className="text-gray-400">{mnemonic}</p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <button
            onClick={handleCreateWallets}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            Create Wallets
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 border border-red-600 rounded-lg bg-red-900 text-red-300">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-[80%]">
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
      )}
    </div>
  );
};

export default App;
