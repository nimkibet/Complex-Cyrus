import { getServices } from "@/app/actions/admin";
import PricingDashboard from "@/components/admin/PricingDashboard";

export default async function PricingAdminPage() {
  const services = await getServices();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-blue-950">Pricing & BOQ Manager</h1>
          <p className="text-gray-500 mt-1">Manage dynamic service prices and materials used in quotations.</p>
        </div>
      </div>
      
      <PricingDashboard initialServices={services} />
    </div>
  );
}
