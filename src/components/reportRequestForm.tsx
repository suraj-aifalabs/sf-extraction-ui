
import React, { useState } from 'react';

const ORGANIZATIONS = ['Org A', 'Org B', 'Org C'];
const PROGRAMS = ['Program 1', 'Program 2'];

const FARGATE_API_URL = 'https://sample-fargate-api-url.com/trigger-job'; // Placeholder

const ReportRequestForm: React.FC = () => {
  const [organization, setOrganization] = useState('');
  const [program, setProgram] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    if (!organization) return 'Please select an organization.';
    if (!program) return 'Please select a program.';
    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) return 'Please enter a valid email.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(FARGATE_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organization, program, email }),
      });
      if (!response.ok) throw new Error('Failed to trigger report generation.');
      setSuccess('Report generation started! You will receive an email when it is ready.');
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Something went wrong.');
          }
        } finally {
          setLoading(false);
        }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Request Salesforce Report</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Organization</label>
        <select
          value={organization}
          onChange={e => setOrganization(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Select organization</option>
          {ORGANIZATIONS.map(org => (
            <option key={org} value={org}>{org}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Program</label>
        <select
          value={program}
          onChange={e => setProgram(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Select program</option>
          {PROGRAMS.map(prog => (
            <option key={prog} value={prog}>{prog}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border rounded px-2 py-1"
          placeholder="your.email@jnj.com"
        />
      </div>
      {error && <div className="mb-2 text-red-600">{error}</div>}
      {success && <div className="mb-2 text-green-600">{success}</div>}
    <button
        type="submit"
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
    </button>
    </form>
  );
};

export default ReportRequestForm;