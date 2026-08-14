"use client";

import { useState } from "react";
import { updateLabourCost, updateMaterialPrice } from "@/app/actions/admin";
import { ChevronDown, ChevronUp, Save, CheckCircle2, AlertCircle, Package, Wrench, Edit3, X } from "lucide-react";

type Material = {
  id: string;
  description: string;
  qty: number;
  unit: string;
  unitPrice: number;
};

type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  labourCost: number;
  labourDescription: string;
  materials: Material[];
};

export default function PricingDashboard({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [expandedId, setExpandedId] = useState<string | null>(initialServices[0]?.id || null);

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <ServiceCard 
          key={service.id} 
          service={service} 
          isExpanded={expandedId === service.id}
          onToggle={() => setExpandedId(expandedId === service.id ? null : service.id)}
        />
      ))}
    </div>
  );
}

function ServiceCard({ service, isExpanded, onToggle }: { service: Service; isExpanded: boolean; onToggle: () => void }) {
  const totalMaterials = service.materials.reduce((sum, m) => sum + (m.qty * m.unitPrice), 0);
  const grandTotal = totalMaterials + service.labourCost;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-200">
      {/* Header (Clickable) */}
      <div 
        onClick={onToggle}
        className="px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-black shrink-0">
            {service.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{service.name}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-[10px] sm:text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">{service.category}</span>
              <span className="text-xs sm:text-sm font-medium text-gray-500">Estimate: KSH {grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="text-gray-400">
          {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-100 bg-gray-50/50 p-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Labour Cost Editor */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm h-full">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4 uppercase tracking-wider">
                  <Wrench className="w-4 h-4 text-blue-600" /> Labour & Base Cost
                </h3>
                <p className="text-xs text-gray-500 mb-4">{service.labourDescription}</p>
                
                <EditablePriceField 
                  label="Fixed Labour Cost (KSH)"
                  initialValue={service.labourCost}
                  onSave={async (val) => {
                    await updateLabourCost(service.id, val);
                  }}
                />
              </div>
            </div>

            {/* Materials Table Editor */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wider">
                    <Package className="w-4 h-4 text-blue-600" /> Bill of Quantities
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left min-w-[500px]">
                    <thead className="bg-white border-b border-gray-100 text-xs uppercase text-gray-500 font-bold">
                      <tr>
                        <th className="px-4 py-3 w-10 text-center">#</th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3 w-20 text-center">Qty</th>
                        <th className="px-4 py-3 w-32 text-right">Unit Price</th>
                        <th className="px-4 py-3 w-24 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {service.materials.map((mat, idx) => (
                        <tr key={mat.id} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 text-center text-gray-400 font-medium">{idx + 1}</td>
                          <td className="px-4 py-3 text-gray-700 font-medium">{mat.description}</td>
                          <td className="px-4 py-3 text-center text-gray-500">{mat.qty} {mat.unit}</td>
                          <td className="px-4 py-2">
                            <InlinePriceEditor 
                              initialPrice={mat.unitPrice} 
                              onSave={async (val) => await updateMaterialPrice(mat.id, val)}
                            />
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-gray-900">
                            {(mat.qty * mat.unitPrice).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={4} className="px-4 py-3 text-right font-bold text-gray-600 text-xs uppercase">Materials Subtotal</td>
                        <td className="px-4 py-3 text-right font-black text-blue-900">
                          {totalMaterials.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

function EditablePriceField({ label, initialValue, onSave }: { label: string, initialValue: number, onSave: (val: number) => Promise<any> }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue.toString());
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSave = async () => {
    const num = parseFloat(value.replace(/,/g, ''));
    if (isNaN(num)) return;
    
    setLoading(true);
    try {
      await onSave(num);
      setStatus("success");
      setIsEditing(false);
      setTimeout(() => setStatus("idle"), 2000);
    } catch (e) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="group relative">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</label>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{parseFloat(value).toLocaleString()}</span>
          <button 
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Edit price"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          {status === "success" && <span className="text-green-500 text-xs font-bold flex items-center gap-1 animate-pulse"><CheckCircle2 className="w-4 h-4" /> Saved</span>}
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">KSH</span>
          <input 
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full pl-12 pr-4 py-2 border-2 border-blue-500 rounded-lg font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-100"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg font-bold disabled:opacity-50 transition-colors"
        >
          {loading ? "..." : <Save className="w-5 h-5" />}
        </button>
        <button 
          onClick={() => { setIsEditing(false); setValue(initialValue.toString()); }}
          className="text-gray-500 hover:bg-gray-100 p-2.5 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function InlinePriceEditor({ initialPrice, onSave }: { initialPrice: number, onSave: (val: number) => Promise<any> }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialPrice.toString());
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSave = async () => {
    const num = parseFloat(value);
    if (isNaN(num)) return;
    setLoading(true);
    try {
      await onSave(num);
      setStatus("success");
      setIsEditing(false);
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <div 
        onClick={() => setIsEditing(true)}
        className="flex justify-end items-center gap-2 p-1.5 -m-1.5 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 cursor-pointer group transition-all"
      >
        <span className="font-semibold text-gray-700 group-hover:text-blue-600">
          {parseFloat(value).toLocaleString()}
        </span>
        <Edit3 className="w-3 h-3 text-gray-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        {status === "success" && <CheckCircle2 className="w-3 h-3 text-green-500 absolute -right-4" />}
      </div>
    );
  }

  return (
    <div className="flex justify-end gap-1">
      <input 
        type="number" 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        className="w-24 text-right border-2 border-blue-500 rounded px-2 py-1 text-sm font-bold focus:outline-none"
        autoFocus
      />
      <button onClick={handleSave} disabled={loading} className="bg-blue-100 text-blue-700 hover:bg-blue-200 rounded p-1">
        <CheckCircle2 className="w-4 h-4" />
      </button>
    </div>
  );
}
