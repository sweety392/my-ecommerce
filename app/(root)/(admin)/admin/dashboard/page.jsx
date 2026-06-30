
import DashboardCards from "@/components/admin/DashboardCards";

export default function DashboardPage() {

  return (

    <div>

      <h1
        className="
          text-4xl
          font-bold
          mb-10
        "
      >
        Dashboard
      </h1>

      <DashboardCards />

    </div>
  );
}