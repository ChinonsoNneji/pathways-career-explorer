import { useEffect, useState } from "react"
import PathwaysJourney, { type StudentState } from "./PathwaysJourney"

export default function App() {
  const [profile, setProfile] = useState<StudentState | null>()
  const [error, setError] = useState(false)
  useEffect(() => {
    const controller = new AbortController()
    fetch("/api/v1/profile", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Profile unavailable")
        const data = await response.json()
        if (!controller.signal.aborted) setProfile(data.profile)
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true)
      })
    return () => controller.abort()
  }, [])
  if (error) return <main className="page-wrap"><p>Could not load your profile.</p><button onClick={() => location.reload()}>Retry</button></main>
  if (profile === undefined) return <main className="page-wrap" role="status">Loading Pathways…</main>
  return <PathwaysJourney profile={profile} />
}
