import React, { useState, useCallback } from 'react';
import { Calculator, IndianRupee, Calendar, Percent } from 'lucide-react';

interface EMIDetails {
  emi: number;
  totalInterest: number;
  totalAmount: number;
}

function App() {
  const [principal, setPrincipal] = useState<string>('100000');
  const [interest, setInterest] = useState<string>('10');
  const [tenure, setTenure] = useState<string>('12');
  const [emiDetails, setEmiDetails] = useState<EMIDetails | null>(null);

  const calculateEMI = useCallback(() => {
    const p = parseFloat(principal);
    const r = parseFloat(interest) / 12 / 100;
    const n = parseFloat(tenure);
    
    const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - p;

    setEmiDetails({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount)
    });
  }, [principal, interest, tenure]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">EMI Calculator</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <IndianRupee className="w-4 h-4" />
                  Loan Amount
                </label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Enter loan amount"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <Percent className="w-4 h-4" />
                  Interest Rate (% per annum)
                </label>
                <input
                  type="number"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Enter interest rate"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <Calendar className="w-4 h-4" />
                  Loan Tenure (months)
                </label>
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Enter loan tenure"
                />
              </div>

              <button
                onClick={calculateEMI}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
              >
                Calculate EMI
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Loan Summary</h2>
              {emiDetails ? (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">Monthly EMI</p>
                    <p className="text-2xl font-bold text-indigo-600">₹{emiDetails.emi.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">Total Interest</p>
                    <p className="text-2xl font-bold text-indigo-600">₹{emiDetails.totalInterest.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-indigo-600">₹{emiDetails.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Fill in the details and click Calculate EMI to see the results
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;