import Datenschutz from "@/components/Datenschutz";

export const metadata = {
  title: "datenschutz – andrii litkovskyi",
  description: "datenschutzerklärung & cookie-richtlinie für andrii litkovskyi.",
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