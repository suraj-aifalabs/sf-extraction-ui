import React, { useState } from 'react';

const AdminPage: React.FC = () => {
  const [sfUsername, setSfUsername] = useState('');
  const [sfPassword, setSfPassword] = useState('');
  const [sfToken, setSfToken] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      // Replace with your actual API endpoint for updating secrets
      const response = await fetch('https://sample-fargate-api-url.com/update-secrets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sfUsername, sfPassword, sfToken }),
      });
      if (!response.ok) throw new Error('Failed to update secrets.');
      setMessage('Secrets updated successfully!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage('Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Admin: Update Salesforce Credentials</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Salesforce Username</label>
          <input
            type="text"
            value={sfUsername}
            onChange={e => setSfUsername(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Salesforce Password</label>
          <input
            type="password"
            value={sfPassword}
            onChange={e => setSfPassword(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Salesforce User Token</label>
          <input
            type="text"
            value={sfToken}
            onChange={e => setSfToken(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        {message && <div className="mb-2 text-blue-600">{message}</div>}
        <button
          type="submit"
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default AdminPage;