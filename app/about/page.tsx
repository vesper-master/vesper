import Navbar from "../components/Navbar";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="page">
      <Navbar />
      <div className="container" style={{ paddingTop: "7rem", paddingBottom: "5rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "2.5rem" }}>
          <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: "var(--amber)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Heart size={18} style={{ fill: "#fff", color: "#fff" }} />
          </div>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--text)" }}>About Vesper</h1>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "var(--text-muted)", lineHeight: 1.75 }}>
          <p style={{ fontSize: "1.125rem", color: "var(--text)", fontWeight: 500 }}>
            Vesper is a community mutual aid platform. It connects people who need help with people nearby who can give it.
          </p>
          <p>
            Right now, a restaurant is throwing away 50 meals while 200 people nearby are hungry.
            A family has bags of clothes their kids outgrew while a family down the street needs them.
            An elderly person needs someone to carry groceries while a teenager two blocks away has nothing to do.
          </p>
          <p>
            The people who need and the people who have are steps apart. They never connect. There is no system.
          </p>
          <p style={{ fontWeight: 600, color: "var(--text)" }}>Vesper is that system. Simple, fast, and free.</p>

          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "var(--text)", marginTop: "1.5rem" }}>Why blockchain?</h2>
          <p>
            Because help deserves a permanent record. When someone posts a need and someone fulfills it,
            that act of kindness is recorded on Stellar or Ethereum — permanently, tamper-proof, and publicly verifiable.
          </p>
          <p>
            This creates real impact data that NGOs, donors, and communities can trust. No self-reported numbers.
            No inflated stats. Real help, real records.
          </p>
          <p>
            Stellar handles the day-to-day layer — fast, cheap, accessible to anyone with a phone.
            Ethereum is supported for NGOs and donors already operating in that ecosystem.
          </p>

          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "var(--text)", marginTop: "1.5rem" }}>Who is this for?</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {[
              "Families going through a hard week",
              "Street vendors and informal workers",
              "Volunteers who want to help but don't know where",
              "NGOs who need verified impact data",
              "Restaurants, churches, and local orgs with surplus",
              "Anyone who believes neighbors should take care of each other",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                <span style={{ color: "var(--amber)", fontWeight: 700, marginTop: "0.1rem" }}>→</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "var(--text)", marginTop: "1.5rem" }}>Open source</h2>
          <p>
            Vesper is built as a public good. The code is open source. No one owns the community data.
            It runs on public blockchains that no single entity controls.
          </p>

          {/* Grant box */}
          <div className="card" style={{ padding: "1.5rem", background: "var(--amber-light)", border: "1px solid #FED7AA", marginTop: "0.5rem" }}>
            <p style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.75rem" }}>
              Built for SCF (Stellar Community Fund) and Gitcoin Grants.
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
              Vesper is submitted as a public goods project for grant funding. The goal is to grow this into a
              tool used by real communities around the world — starting with one neighborhood at a time.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "3rem", flexWrap: "wrap" }}>
          <Link href="/post?type=need" className="btn btn-coral">🙏 I Need Help</Link>
          <Link href="/post?type=have" className="btn btn-emerald">🤲 I Can Help</Link>
          <Link href="/feed" className="btn btn-outline">Browse feed</Link>
        </div>
      </div>
    </div>
  );
}
