import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';

const COVERAGE_NODES = [
  { area: "Gulshan (Zone A)", status: "Active Premium Coverage", responseTime: "Immediate Concierge Dispatch", fee: "Standard Matrix Base" },
  { area: "Banani (Zone B)", status: "Active Premium Coverage", responseTime: "Immediate Concierge Dispatch", fee: "Standard Matrix Base" },
  { area: "Baridhara (Diplomatic Zone)", status: "Active Premium Coverage", responseTime: "Priority Executive Dispatch", fee: "Premium Dynamic Buffer Included" },
  { area: "Dhanmondi (Zone C)", status: "Operational Active Node", responseTime: "Standard Scheduled Window", fee: "Standard Matrix Base" },
  { area: "Uttara Sector Arrays", status: "Operational Active Node", responseTime: "Standard Scheduled Window", fee: "Outbound Logistics Surcharge" },
  { area: "Chattogram Hub Core", status: "Strategic Extended Outpost", responseTime: "48-Hour Advanced Planning Node", fee: "Custom Dedicated Scale Pricing" }
];

const CoverageMap = () => {
  const [filterQuery, setFilterQuery] = useState('');

  const mappedOutput = COVERAGE_NODES.filter(n => 
    n.area.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-8">
      <SectionHeader title="Logistics Network & Coverage Boundaries" subtitle="Operational Matrix" />

      <div className="bg-[#121212] border border-white/5 rounded-xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <h3 className="text-base font-bold text-white font-serif">Region Matrix Filter</h3>
            <p className="text-xs text-gray-500">Verify active staging support windows for your destination coordinates.</p>
          </div>
          <input 
            type="text"
            placeholder="Filter regions..."
            className="bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white w-full sm:w-64 focus:outline-none focus:border-[#D4AF37]"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full text-xs text-gray-300">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3">Operational Territory</th>
                <th>Status State</th>
                <th>Dispatch Timeline</th>
                <th className="text-right">Logistics Matrix Fee</th>
              </tr>
            </thead>
            <tbody>
              {mappedOutput.map((node, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 font-semibold text-white">{node.area}</td>
                  <td>
                    <span className="px-2.5 py-0.5 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded text-[10px] font-medium tracking-wide">
                      {node.status}
                    </span>
                  </td>
                  <td className="text-gray-400">{node.responseTime}</td>
                  <td className="text-right font-mono text-[#D4AF37]">{node.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CoverageMap;