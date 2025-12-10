import Datenschutz from "@/components/Datenschutz";

export const metadata = {
  title: "Datenschutz – Andrii Litkovskyi",
  description: "Privacy policy (Datenschutz) for Andrii Litkovskyi.",
};

export default function DatenschutzPage() {
  return (
    <main className="app-main">
      <div className="section">
        <div className="content">
          <Datenschutz />
        </div>
      </div>
    </main>
  );
};