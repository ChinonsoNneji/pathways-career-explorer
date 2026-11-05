import { useState } from "react"
import { ArrowRight, Upload, FileText, Check } from "lucide-react"
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
      <div className="page-intro">
        <p className="eyebrow"><span>Pathways discovery</span></p>
        <h1>Your coursework.<br /><em>New directions.</em></h1>
        <p className="page-copy">Start with classes you’ve taken. See where your strengths could take you—then try the work for yourself.</p>
      </div>
      <div className="discovery-layout">
        <div className="discovery-import">
          <span className="detail-label">01 · Start with what you know</span>
          <h2>Add your coursework.</h2>
          <p>Upload a CSV or paste a course name and letter grade on each line.</p>
          <label className="course-upload">
            <Upload size={22} aria-hidden="true" />
            <span><strong>Choose a course CSV</strong><small>Course name + letter grade · up to 100 KB</small></span>
            <input type="file" accept=".csv,text/csv" onChange={async (event) => {
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
            }} />
          </label>
          <label className="course-rows">Or paste course rows
            <textarea rows={5} value={source} placeholder={"Computer Networks,A\nOperating Systems,A-"} onChange={(event) => {
              setSource(event.target.value)
              setCourses([])
              setReviewed(false)
              setError("")
            }} />
          </label>
          <div className="discovery-actions">
            <button className="primary-button dark" onClick={() => review(source)}>Review courses <ArrowRight size={18} /></button>
            <button className="discovery-sample" onClick={() => { setSource(sample); review(sample) }}>Try sample transcript</button>
          </div>
          {error && <p className="discovery-error" role="alert">{error}</p>}
        </div>
        <aside className="discovery-aside">
          <div className="discovery-note">
            <FileText size={24} aria-hidden="true" />
            <h2>Evidence, not a quiz.</h2>
            <p>Your classes are a starting point, not a prediction. Review what we read, explore why a path appeared, and choose a small project to try.</p>
            <span className="sample-label">Coursework stays in this tab</span>
          </div>
          <details className="resource-disclosure discovery-sources">
            <summary>Data sources</summary>
            <div className="source-row"><strong>Coursework</strong><span>{courses.length ? `${courses.length} courses reviewed` : "CSV import available"}</span></div>
            <div className="source-row"><strong>School records</strong><span>Connection planned</span></div>
            <div className="source-row"><strong>YouTube</strong><span>Connection planned</span></div>
            <p>School and YouTube connections are not active. Imported coursework is temporary and disappears on reload.</p>
          </details>
          <button className="outline-button" onClick={onBrowse}>Browse by major <ArrowRight size={17} /></button>
        </aside>
      </div>
      {courses.length > 0 && <div className="course-review">
        <div className="discovery-section-heading"><div><p className="eyebrow"><span>02 · Check the evidence</span></p><h2>Does this look right?</h2></div><span className="sample-label">{courses.length} courses</span></div>
        <ul>{courses.map((course) => <li key={course.name}><span>{course.name}</span><strong>{course.grade}</strong></li>)}</ul>
        <button className="primary-button" onClick={() => setReviewed(true)}>Discover paths <ArrowRight size={18} /></button>
      </div>}
      {reviewed && <div className="discovery-results" aria-live="polite">
        <div className="page-intro"><p className="eyebrow"><span>03 · See what’s possible</span></p><h2>Paths worth <em>exploring.</em></h2><p className="page-copy">A starting list based on your coursework. Try a project to see how the work feels.</p></div>
        {!matches.length && <div className="empty-state"><h2>No clear matches yet</h2><p>Try adding more course titles, or browse the career catalog.</p><button className="outline-button" onClick={onBrowse}>Browse careers <ArrowRight size={17} /></button></div>}
        <div className="catalog-grid">{matches.map(({ role, evidence }, index) => (
          <article className="career-tile discovery-match" key={role.title}>
            <span className="field">Path 0{index + 1} · {role.field}</span>
            <h2>{role.title}</h2>
            <p>{role.description}</p>
            <div className="match-evidence"><span className="detail-label">Why it surfaced</span><div className="tag-row">{evidence.map(({ name, grade }) => <span key={name}>{name} · {grade}</span>)}</div></div>
            <button className="outline-button trial-button" aria-expanded={activeTrial === role.title} onClick={() => setActiveTrial(activeTrial === role.title ? "" : role.title)}>Try the work <ArrowRight size={17} /></button>
            {activeTrial === role.title && <div className="discovery-trial">
              <p>{roleExtras[role.title].project}</p>
              <p><strong>What to make</strong> · {roleExtras[role.title].deliverable}</p>
              <label>Would you do more of this?
                <select value={feedback[role.title] ?? ""} onChange={(event) => setFeedback({ ...feedback, [role.title]: event.target.value })}>
                  <option value="">Choose an answer</option><option>Yes</option><option>Maybe</option><option>No</option>
                </select>
              </label>
              {feedback[role.title] && <small><Check size={13} /> Feedback noted for this visit.</small>}
            </div>}
            <button className="tile-link" onClick={() => onOpenRole(role.title)}>Open roadmap <ArrowRight size={17} /></button>
          </article>
        ))}</div>
      </div>}
    </section>
  )
}
