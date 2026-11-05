import { useState } from "react"
import { allRoleData, majors, roleExtras } from "./pathwaysData"

type Course = { name: string; grade: string; points: number }
const sample = "course,grade\nComputer Networks,A\nOperating Systems,A-\nDigital Forensics,B+\nCalculus,B"
const gradePoints: Record<string, number> = {
  "A+": 4, A: 4, "A-": 3.7, "B+": 3.3, B: 3, "B-": 2.7,
  "C+": 2.3, C: 2, "C-": 1.7, "D+": 1.3, D: 1, "D-": 0.7, F: 0,
}
const topics = [
  [/network|routing|packet/i, /network|routing|packet/i],
  [/operating systems|linux|systems administration/i, /linux|operating systems|infrastructure/i],
  [/forensic|incident response|security/i, /forensic|incident|security/i],
  [/python|programming|software|algorithms/i, /python|programming|software|algorithms/i],
  [/database|sql|data management/i, /database|sql|data engineer/i],
  [/statistics|machine learning/i, /statistics|machine learning|data analysis/i],
  [/thermo|heat transfer|fluids/i, /thermo|thermal|heat|hvac|fluid/i],
  [/cad|machine design|materials|manufacturing/i, /cad|design|materials|manufactur/i],
  [/controls|robotics|mechatronics/i, /controls|robot|automation/i],
]

function readCourses(source: string): Course[] {
  const lines = source.trim().split(/\r?\n/).filter((line) => line.trim())
  if (lines.length > 201) throw new Error("Use up to 200 course rows.")
  const courses = new Map<string, Course>()
  for (const [index, line] of lines.entries()) {
    if (index === 0 && /^\uFEFF?\s*course\s*,\s*grade\s*$/i.test(line)) continue
    const match = /^\s*(?:"((?:[^"]|"")*)"|([^,"]+))\s*,\s*"?([A-F][+-]?)"?\s*$/i.exec(line)
    const name = (match?.[1]?.replace(/""/g, '"') ?? match?.[2] ?? "").trim()
    const grade = match?.[3].toUpperCase() ?? ""
    if (!name || !Object.prototype.hasOwnProperty.call(gradePoints, grade)) {
      throw new Error(`Row ${index + 1} needs a course name and a letter grade, such as Computer Networks,A.`)
    }
    const points = gradePoints[grade]
    const key = name.toLowerCase()
    if ((courses.get(key)?.points ?? -1) < points) courses.set(key, { name, grade, points })
  }
  if (!courses.size) throw new Error("Add at least one course and grade.")
  return [...courses.values()]
}

export default function Discovery({
  onOpenRole, onBrowse,
}: { onOpenRole: (title: string) => void; onBrowse: () => void }) {
  const [source, setSource] = useState("")
  const [courses, setCourses] = useState<Course[]>([])
  const [reviewed, setReviewed] = useState(false)
  const [error, setError] = useState("")
  const [activeTrial, setActiveTrial] = useState("")
  const [feedback, setFeedback] = useState<Record<string, string>>({})

  function review(input: string) {
    setReviewed(false)
    setCourses([])
    setError("")
    try {
      setCourses(readCourses(input))
    } catch (cause) {
      setError((cause as Error).message)
    }
  }

  const matches = majors.flatMap((major) => allRoleData[major.id].map((role) => {
    const description = [role.title, role.field, ...role.tags, ...roleExtras[role.title].learning].join(" ")
    const evidence = courses.filter((course) => course.points >= 2 && topics.some(
      ([courseTopic, roleTopic]) => courseTopic.test(course.name) && roleTopic.test(description),
    ))
    return { role, evidence, score: evidence.reduce((sum, course) => sum + course.points, 0) }
  })).filter((match) => match.score > 0).sort((a, b) => b.score - a.score).slice(0, 3)

  return (
    <section className="page-wrap discovery">
      <span className="detail-label">Pathways discovery</span>
      <h1>See where your coursework could take you.</h1>
      <p>Start with classes you’ve taken. We’ll suggest paths and give you a small way to try the work.</p>
      <details className="settings-card discovery-sources">
        <summary>Data sources</summary>
        <p><strong>Coursework</strong> · {courses.length ? `${courses.length} courses read in this tab` : "Ready for a CSV import"}</p>
        <p><strong>School records</strong> · Connection planned</p>
        <p><strong>YouTube</strong> · Connection planned</p>
        <p>Connected sources will show the last sync and the evidence Pathways used. You’ll be able to pause a source or remove its data here.</p>
      </details>
      <div className="settings-card">
        <h2>1. Add coursework</h2>
        <p>Upload a CSV or paste rows with a course name and letter grade. Coursework stays in this tab.</p>
        <label>Course CSV <input type="file" accept=".csv,text/csv" onChange={async (event) => {
          const file = event.target.files?.[0]
          if (!file) return
          try {
            if (file.size > 100_000) throw new Error("Choose a CSV smaller than 100 KB.")
            const input = await file.text()
            setSource(input)
            review(input)
          } catch (cause) {
            setReviewed(false)
            setCourses([])
            setError((cause as Error).message)
          }
        }} /></label>
        <label>Course rows <textarea rows={5} value={source} placeholder="Computer Networks,A" onChange={(event) => {
          setSource(event.target.value)
          setCourses([])
          setReviewed(false)
          setError("")
        }} /></label>
        <div className="toolbar-actions">
          <button className="primary-button dark" onClick={() => review(source)}>Review courses</button>
          <button className="outline-button" onClick={() => { setSource(sample); review(sample) }}>Try sample transcript</button>
        </div>
        {error && <p role="alert">{error}</p>}
      </div>
      {courses.length > 0 && <div className="settings-card">
        <h2>2. Confirm your coursework</h2>
        <ul>{courses.map((course) => <li key={course.name}>{course.name} · {course.grade}</li>)}</ul>
        <button className="primary-button dark" onClick={() => setReviewed(true)}>Discover paths</button>
      </div>}
      {reviewed && <div aria-live="polite">
        <h2>3. Try a path</h2>
        {!matches.length && <p>No clear matches in this catalog yet. Try adding more course titles.</p>}
        <div className="catalog-grid">{matches.map(({ role, evidence }) => (
          <article className="settings-card" key={role.title}>
            <h3>{role.title}</h3>
            <p>{role.description}</p>
            <p><strong>Why it surfaced</strong> · {evidence.map(({ name, grade }) => `${name} (${grade})`).join(", ")}</p>
            <button className="primary-button dark" onClick={() => setActiveTrial(role.title)}>Try the work</button>
            {activeTrial === role.title && <div>
              <p>{roleExtras[role.title].project}</p>
              <p><strong>What to make</strong> · {roleExtras[role.title].deliverable}</p>
              <label>After you try it, would you do more of this?
                <select value={feedback[role.title] ?? ""} onChange={(event) => setFeedback({ ...feedback, [role.title]: event.target.value })}>
                  <option value="">Choose an answer</option><option>Yes</option><option>Maybe</option><option>No</option>
                </select>
              </label>
            </div>}
            <button className="outline-button" onClick={() => onOpenRole(role.title)}>Open roadmap</button>
          </article>
        ))}</div>
      </div>}
      <button className="outline-button" onClick={onBrowse}>Browse by major</button>
    </section>
  )
}
