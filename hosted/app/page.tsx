"use client";
import { useEffect, useState } from "react";
import PathwaysJourney, { type StudentState } from "./pathways/PathwaysJourney";

export default function Home() {
  const [profile, setProfile] = useState<StudentState | null>();
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/v1/profile", { signal: controller.signal })
      .then(async response => {
        if (response.status === 401) { setError("signin"); return; }
        if (!response.ok) throw new Error("Profile unavailable");
        const data = await response.json() as { profile: StudentState | null };
        if (!controller.signal.aborted) setProfile(data.profile);
      })
      .catch(() => { if (!controller.signal.aborted) setError("load"); });
    return () => controller.abort();
  }, []);
  if (error === "signin") return (
    <main className="page-wrap discovery">
      <span className="detail-label">Pathways</span>
      <h1>Discover where your strengths could take you.</h1>
      <p>Explore careers from your coursework, compare paths, and build a practical roadmap. Sign in to keep your profile and progress across devices.</p>
      <a className="primary-button dark" href="/signin-with-chatgpt?return_to=%2F" target="_top">Sign in with ChatGPT</a>
    </main>
  );
  if (error) return <main className="page-wrap"><p>Could not load your profile.</p><button onClick={() => location.reload()}>Retry</button></main>;
  if (profile === undefined) return <main className="page-wrap" role="status">Loading Pathways…</main>;
  return <PathwaysJourney profile={profile} />;
}
