import { useEffect, useMemo, useRef, useState } from "react"
import {
  allRoleData,
  majors,
  marketResources,
  roleExtras,
  signals,
  type MajorId,
  type Role,
  type SignalGroup,
} from "./pathwaysData"

type Page = "welcome" | "home" | "assessment" | "results" | "catalog" | "compare" | "role" | "roadmaps" | "profile"

export type StudentState = {
  onboarded: boolean
  major: MajorId | null
  selected: string[]
  saved: string[]
  compare: string[]
  completed: Record<string, boolean[]>
  name: string
}

const initialStudent: StudentState = {
  onboarded: false,
  major: null,
  selected: [],
  saved: [],
  compare: [],
  completed: {},
  name: "Alex",
}

const roleList = (Object.keys(allRoleData) as MajorId[]).flatMap((major) =>
  allRoleData[major].map((role) => ({ ...role, major })),
)

type Career = Role & { major: MajorId }

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function Icon({
  name,
}: {
  name: "arrow" | "back" | "check" | "compass" | "spark" | "refresh" | "plus" | "bookmark" | "search" | "menu" | "close" | "user" | "map"
}) {
  const paths = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    back: <path d="M19 12H5m6 6-6-6 6-6" />,
    check: <path d="m5 12 4 4L19 6" />,
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" />
        <path d="m18 14 .7 2.3L21 17l-2.3.7L18 20l-.7-2.3L15 17l2.3-.7L18 14Z" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M18.1 15a7 7 0 1 1-.1-6l2 3" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    bookmark: <path d="M6.5 4.5h11v16L12 17l-5.5 3.5v-16Z" />,
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
        <path d="M9 3v15m6-12v15" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button className="logo" onClick={onClick} aria-label="Pathways home">
      <span className="logo-mark">
        <span />
      </span>
      <span>Pathways</span>
    </button>
  )
}

function SampleLabel() {
  return <span className="sample-label">Sample data</span>
}

function AppHeader({
  page,
  navigate,
}: {
  page: Page
  navigate: (page: Page) => void
}) {
  const [open, setOpen] = useState(false)
  const links: [Page, string][] = [
    ["home", "Home"],
    ["catalog", "Explore careers"],
    ["roadmaps", "My roadmaps"],
    ["profile", "Profile"],
  ]

  return (
    <header className="app-header">
      <Logo onClick={() => navigate("home")} />
      <nav className={open ? "open" : ""} aria-label="Primary navigation">
        {links.map(([target, label]) => (
          <button
            className={page === target ? "active" : ""}
            key={target}
            onClick={() => {
              navigate(target)
              setOpen(false)
            }}
          >
            {label}
          </button>
        ))}
      </nav>
      <button
        className="mobile-menu"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        <Icon name={open ? "close" : "menu"} />
      </button>
    </header>
  )
}

function PageIntro({
  label,
  title,
  copy,
  back,
}: {
  label: string
  title: React.ReactNode
  copy?: string
  back?: () => void
}) {
  return (
    <div className="page-intro">
      {back && (
        <button className="back-link" onClick={back}>
          <Icon name="back" /> Back
        </button>
      )}
      <p className="eyebrow">
        <span>{label}</span>
      </p>
      <h1>{title}</h1>
      {copy && <p className="page-copy">{copy}</p>}
    </div>
  )
}

function RoleTile({
  role,
  index,
  saved,
  compared,
  onOpen,
  onSave,
  onCompare,
}: {
  role: Career
  index?: number
  saved: boolean
  compared: boolean
  onOpen: () => void
  onSave: () => void
  onCompare?: () => void
}) {
  const major = majors.find((item) => item.id === role.major)!
  return (
    <article className="career-tile">
      <div className="tile-top">
        <span className="major-code">{major.code}</span>
        <div className="tile-actions">
          {onCompare && (
            <button className={compared ? "selected" : ""} onClick={onCompare}>
              {compared ? <Icon name="check" /> : <Icon name="plus" />} Compare
            </button>
          )}
          <button
            className={saved ? "selected" : ""}
            onClick={onSave}
            aria-label={`${saved ? "Unsave" : "Save"} ${role.title}`}
          >
            <Icon name="bookmark" />
          </button>
        </div>
      </div>
      <span className="field">
        {index !== undefined
          ? `Match ${String(index + 1).padStart(2, "0")} · `
          : ""}
        {role.field}
      </span>
      <h2>{role.title}</h2>
      <p>{role.description}</p>
      <div className="tag-row">
        {role.tags.slice(0, 3).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <button className="tile-link" onClick={onOpen}>
        View role <Icon name="arrow" />
      </button>
    </article>
  )
}

function EmptyState({
  icon = "compass",
  title,
  copy,
  action,
  onAction,
}: {
  icon?: "compass" | "bookmark" | "search" | "map"
  title: string
  copy: string
  action: string
  onAction: () => void
}) {
  return (
    <div className="empty-state">
      <span>
        <Icon name={icon} />
      </span>
      <h2>{title}</h2>
      <p>{copy}</p>
      <button className="outline-button" onClick={onAction}>
        {action} <Icon name="arrow" />
      </button>
    </div>
  )
}

export default function PathwaysJourney({ profile }: { profile: StudentState | null }) {
  const [student, setStudent] = useState(profile ?? initialStudent)
  const currentStudent = useRef(student)
  const saveQueue = useRef(Promise.resolve())
  const [saveFailed, setSaveFailed] = useState(false)
  const [page, setPage] = useState<Page>(() =>
    student.major ? "catalog" : "assessment",
  )
  const [activeRole, setActiveRole] = useState<string>("")
  const [assessmentStep, setAssessmentStep] = useState(1)
  const [search, setSearch] = useState("")
  const [confirmReset, setConfirmReset] = useState(false)
  const assessmentRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!window.history.state?.page) {
      window.history.replaceState({ page }, "", `#${page}`)
    }
  }, [])

  useEffect(() => {
    const onPop = (event: PopStateEvent) => {
      const state = event.state as { page?: Page; role?: string } | null
      if (state?.page) {
        setPage(state.page)
        if (state.role) setActiveRole(state.role)
        window.scrollTo(0, 0)
      }
    }
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  const navigate = (next: Page, role?: string, replace = false) => {
    if (role) setActiveRole(role)
    setPage(next)
    const method = replace ? "replaceState" : "pushState"
    window.history[method](
      { page: next, role },
      "",
      `#${next}${role ? `/${slug(role)}` : ""}`,
    )
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const updateStudent = (patch: Partial<StudentState>) => {
    const next = { ...currentStudent.current, ...patch }
    currentStudent.current = next
    setStudent(next)
    saveQueue.current = saveQueue.current.then(async () => {
      try {
        const response = await fetch("/api/v1/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(next),
        })
        if (!response.ok) throw new Error("Save failed")
        setSaveFailed(false)
      } catch {
        setSaveFailed(true)
      }
    })
  }

  const toggleSave = (title: string) => {
    updateStudent({
      saved: student.saved.includes(title)
        ? student.saved.filter((item) => item !== title)
        : [...student.saved, title],
    })
  }

  const toggleCompare = (title: string) => {
    if (student.compare.includes(title)) {
      updateStudent({
        compare: student.compare.filter((item) => item !== title),
      })
      return
    }
    if (student.compare.length < 2)
      updateStudent({ compare: [...student.compare, title] })
  }

  const toggleStep = (title: string, index: number) => {
    const next = [...(student.completed[title] ?? [false, false, false])]
    next[index] = !next[index]
    updateStudent({
      completed: { ...student.completed, [title]: next },
      saved: student.saved.includes(title)
        ? student.saved
        : [...student.saved, title],
    })
  }

  const rankedRoles = useMemo(() => {
    if (!student.major) return []
    return allRoleData[student.major]
      .map((role, index) => ({
        ...role,
        major: student.major!,
        score: role.tags.filter((tag) => student.selected.includes(tag)).length,
        index,
      }))
      .sort((a, b) => b.score - a.score || a.index - b.index)
  }, [student.major, student.selected])

  const filteredRoles = useMemo(() => {
    const query = search.trim().toLowerCase()
    return roleList.filter((role) => {
      const matchesMajor = role.major === student.major
      const haystack =
        `${role.title} ${role.field} ${role.description} ${role.tags.join(" ")}`.toLowerCase()
      return matchesMajor && (!query || haystack.includes(query))
    })
  }, [search, student.major])

  const openRole = (title: string) => navigate("role", title)
  const selectedCareer = roleList.find((role) => role.title === activeRole)
  const savedRoles = roleList.filter((role) =>
    student.saved.includes(role.title),
  )
  const completedCount = Object.values(student.completed).reduce(
    (total, steps) => total + steps.filter(Boolean).length,
    0,
  )

  const startDemo = () => {
    updateStudent({
      onboarded: true,
      major: "computer-science",
      selected: ["Data structures", "Python", "Building useful tools"],
      saved: ["Software Engineer"],
    })
    navigate("home")
  }

  if (page === "welcome") {
    return (
      <main>
        <section className="hero">
          <header className="topbar hero-nav">
            <Logo
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
            <button
              className="nav-cta"
              onClick={() =>
                assessmentRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore paths <Icon name="arrow" />
            </button>
          </header>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow light">
                <span>Career exploration</span> Built for your next move
              </p>
              <h1>
                Your major
                <br />
                is a start.
                <br />
                <em>Not a map.</em>
              </h1>
            </div>
            <div className="hero-side">
              <p>
                See where your major can take you—then turn your interests into
                a practical way forward.
              </p>
              <button
                className="primary-button"
                onClick={() => {
                  setAssessmentStep(student.major ? 2 : 1)
                  navigate("assessment")
                }}
              >
                Start my journey <Icon name="arrow" />
              </button>
              <button className="demo-link" onClick={startDemo}>
                Or preview a demo dashboard
              </button>
              <span>No quiz score. No wrong answers. About 2 minutes.</span>
            </div>
          </div>
          <div className="hero-bottom">
            <span>Choose a major</span>
            <i />
            <span>Add what feels like you</span>
            <i />
            <span>Build a roadmap</span>
          </div>
        </section>
        <section className="how-it-works" ref={assessmentRef}>
          <div>
            <p className="eyebrow light">
              <span>Built differently</span>
            </p>
            <h2>
              Less pressure.
              <br />
              <em>More direction.</em>
            </h2>
          </div>
          <div className="principles">
            <article>
              <span>01</span>
              <h3>Start broad</h3>
              <p>
                Browse useful options with only your major. Curiosity is enough
                to begin.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>See the reason</h3>
              <p>
                Every match is explained in plain language—not hidden behind a
                score.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Take one step</h3>
              <p>
                Turn “maybe someday” into small actions you can actually try.
              </p>
            </article>
          </div>
        </section>
        <Footer
          onHome={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      </main>
    )
  }

  return (
    <main className="app-shell">
      <AppHeader page={page} navigate={navigate} />

      {page === "home" && (
        <section className="dashboard page-wrap">
          <div className="dashboard-hero">
            <div>
              <p className="eyebrow">
                <span>Student home</span> <SampleLabel />
              </p>
              <h1>
                Keep moving,
                <br />
                <em>{student.name}.</em>
              </h1>
            </div>
            <div className="dashboard-stat">
              <span>{completedCount}</span>
              <p>roadmap milestones complete</p>
            </div>
          </div>

          <div className="resume-card">
            <div>
              <span className="detail-label">
                <Icon name="spark" /> Resume where you left off
              </span>
              <h2>
                {student.saved[0]
                  ? `Continue your ${student.saved[0]} roadmap`
                  : "Your next path starts with one role"}
              </h2>
              <p>
                {student.saved[0]
                  ? "Pick up your next practical milestone and keep the momentum going."
                  : "Browse your matches, save a role, and turn it into a practical three-step plan."}
              </p>
            </div>
            <button
              className="primary-button dark"
              onClick={() =>
                navigate(
                  student.saved[0]
                    ? "roadmaps"
                    : student.major
                      ? "results"
                      : "assessment",
                )
              }
            >
              {student.saved[0] ? "Resume roadmap" : "Find a pathway"}{" "}
              <Icon name="arrow" />
            </button>
          </div>

          <div className="dashboard-grid">
            <div className="panel">
              <div className="panel-heading">
                <div>
                  <span className="detail-label">
                    <Icon name="bookmark" /> Saved roles
                  </span>
                  <h2>Your shortlist</h2>
                </div>
                <button onClick={() => navigate("catalog")}>Browse all</button>
              </div>
              {savedRoles.length ? (
                <div className="compact-list">
                  {savedRoles.slice(0, 3).map((role) => (
                    <button
                      key={role.title}
                      onClick={() => openRole(role.title)}
                    >
                      <span className="major-code">
                        {majors.find((item) => item.id === role.major)?.code}
                      </span>
                      <span>
                        <strong>{role.title}</strong>
                        <small>{role.field}</small>
                      </span>
                      <Icon name="arrow" />
                    </button>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon="bookmark"
                  title="No saved roles yet"
                  copy="Save roles from your results or the career catalog."
                  action="Explore careers"
                  onAction={() => navigate("catalog")}
                />
              )}
            </div>
            <div className="panel next-actions">
              <div className="panel-heading">
                <div>
                  <span className="detail-label">
                    <Icon name="map" /> Next actions
                  </span>
                  <h2>Make this week count</h2>
                </div>
              </div>
              <button
                onClick={() =>
                  navigate(student.major ? "results" : "assessment")
                }
              >
                <span>01</span>
                <div>
                  <strong>
                    {student.major
                      ? "Review your role matches"
                      : "Choose your major"}
                  </strong>
                  <small>
                    {student.major
                      ? "Your ranked results are ready."
                      : "It only takes one selection."}
                  </small>
                </div>
                <Icon name="arrow" />
              </button>
              <button onClick={() => navigate("catalog")}>
                <span>02</span>
                <div>
                  <strong>Compare two directions</strong>
                  <small>See the work and learning side by side.</small>
                </div>
                <Icon name="arrow" />
              </button>
              <button onClick={() => navigate("roadmaps")}>
                <span>03</span>
                <div>
                  <strong>Complete a milestone</strong>
                  <small>A small deliverable builds real evidence.</small>
                </div>
                <Icon name="arrow" />
              </button>
            </div>
          </div>
        </section>
      )}

      {page === "assessment" && (
        <Assessment
          student={student}
          step={assessmentStep}
          setStep={setAssessmentStep}
          update={updateStudent}
          onDone={() => {
            updateStudent({ onboarded: true })
            navigate(assessmentStep === 1 ? "catalog" : "results")
          }}
          onBack={() => window.history.back()}
        />
      )}

      {page === "results" && (
        <section className="page-wrap">
          <PageIntro
            label="Your direction"
            title={
              <>
                Roles worth
                <br />
                <em>exploring.</em>
              </>
            }
            copy={
              student.selected.length
                ? `Ranked using your major and ${student.selected.length} personal signals.`
                : "A useful starting list based on your major. Add signals anytime to personalize it."
            }
            back={() => navigate("home")}
          />
          <div className="results-toolbar">
            <div className="summary-major">
              <span className="major-code">
                {majors.find((item) => item.id === student.major)?.code ?? "?"}
              </span>
              <div>
                <small>Your major</small>
                <strong>
                  {majors.find((item) => item.id === student.major)?.name ??
                    "Choose a major"}
                </strong>
              </div>
            </div>
            <div className="toolbar-actions">
              <button
                className="outline-button"
                onClick={() => {
                  setAssessmentStep(student.major ? 2 : 1)
                  navigate("assessment")
                }}
              >
                Refine my matches
              </button>
              <button
                className="outline-button"
                onClick={() => navigate("catalog")}
              >
                Browse all 15 <Icon name="arrow" />
              </button>
            </div>
          </div>
          {!student.major ? (
            <EmptyState
              title="Choose a major first"
              copy="Your major is enough to create a useful first set of results."
              action="Choose major"
              onAction={() => navigate("assessment")}
            />
          ) : (
            <div className="catalog-grid">
              {rankedRoles.map((role, index) => (
                <RoleTile
                  key={role.title}
                  role={role}
                  index={index}
                  saved={student.saved.includes(role.title)}
                  compared={student.compare.includes(role.title)}
                  onOpen={() => openRole(role.title)}
                  onSave={() => toggleSave(role.title)}
                  onCompare={() => toggleCompare(role.title)}
                />
              ))}
            </div>
          )}
          <CompareDock student={student} navigate={navigate} />
        </section>
      )}

      {page === "catalog" && (
        <section className="page-wrap">
          <PageIntro
            label="Career catalog"
            title={
              <>
                Explore your
                <br />
                <em>career paths.</em>
              </>
            }
            copy="Save roles in your major or choose two to compare."
            back={() => navigate("home")}
          />
          <div className="catalog-controls">
            <label className="search-box">
              <Icon name="search" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search roles, skills, or fields"
              />
            </label>
          </div>
          <div className="toolbar-actions">
            <button className="outline-button" onClick={() => {
              setAssessmentStep(2)
              navigate("assessment")
            }}>Refine my matches</button>
          </div>
          {student.major && <MajorResources major={student.major} />}
          <div className="catalog-meta">
            <span>{filteredRoles.length} roles</span>
            <SampleLabel />
          </div>
          {filteredRoles.length ? (
            <div className="catalog-grid">
              {filteredRoles.map((role) => (
                <RoleTile
                  key={role.title}
                  role={role}
                  saved={student.saved.includes(role.title)}
                  compared={student.compare.includes(role.title)}
                  onOpen={() => openRole(role.title)}
                  onSave={() => toggleSave(role.title)}
                  onCompare={() => toggleCompare(role.title)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="search"
              title="No roles match that search"
              copy="Try a broader term or switch to all majors."
              action="Clear filters"
              onAction={() => {
                setSearch("")
              }}
            />
          )}
          <CompareDock student={student} navigate={navigate} />
        </section>
      )}

      {page === "compare" && (
        <ComparePage
          roles={
            student.compare
              .map((title) => roleList.find((role) => role.title === title && role.major === student.major))
              .filter(Boolean) as Career[]
          }
          onBack={() => window.history.back()}
          onOpen={openRole}
          onRemove={toggleCompare}
          onBrowse={() => navigate("catalog")}
        />
      )}

      {page === "role" && selectedCareer && (
        <RolePage
          role={selectedCareer}
          student={student}
          onBack={() => window.history.back()}
          onSave={() => toggleSave(selectedCareer.title)}
          onStep={(index) => toggleStep(selectedCareer.title, index)}
          onOpen={openRole}
        />
      )}

      {page === "role" && !selectedCareer && (
        <section className="page-wrap">
          <EmptyState
            title="That role is not available"
            copy="Return to the catalog to explore all current sample roles."
            action="Browse roles"
            onAction={() => navigate("catalog")}
          />
        </section>
      )}

      {page === "roadmaps" && (
        <RoadmapsPage
          roles={savedRoles}
          student={student}
          onStep={toggleStep}
          onOpen={openRole}
          onBrowse={() => navigate("catalog")}
        />
      )}

      {page === "profile" && (
        <ProfilePage
          student={student}
          update={updateStudent}
          confirmReset={confirmReset}
          setConfirmReset={setConfirmReset}
          onEditAssessment={() => {
            setAssessmentStep(student.major ? 2 : 1)
            navigate("assessment")
          }}
          onReset={() => {
            updateStudent(initialStudent)
            setConfirmReset(false)
            setAssessmentStep(1)
            navigate("assessment", undefined, true)
          }}
        />
      )}
      {saveFailed && <div className="page-wrap" role="alert">Changes could not be saved. <button onClick={() => updateStudent({})}>Retry save</button></div>}
      <Footer onHome={() => navigate(student.onboarded ? "home" : "assessment")} />
    </main>
  )
}

function Assessment({
  student,
  step,
  setStep,
  update,
  onDone,
  onBack,
}: {
  student: StudentState
  step: number
  setStep: (step: number) => void
  update: (patch: Partial<StudentState>) => void
  onDone: () => void
  onBack: () => void
}) {
  const toggle = (signal: string) =>
    update({
      selected: student.selected.includes(signal)
        ? student.selected.filter((item) => item !== signal)
        : [...student.selected, signal],
    })

  return (
    <section className="assessment-page page-wrap">
      <div className="assessment-progress">
        <button onClick={onBack}>
          <Icon name="back" /> Exit
        </button>
        <div>
          <span className={step >= 1 ? "active" : ""}>Major</span>
          <i />
          <span className={step >= 2 ? "active" : ""}>Your signals</span>
        </div>
        <small>Step {step} of 2</small>
      </div>
      {step === 1 ? (
        <>
          <PageIntro
            label="01 · Start here"
            title={
              <>
                What are you
                <br />
                <em>studying?</em>
              </>
            }
            copy="Choose your major to unlock relevant roles. You can update this later."
          />
          <div className="major-grid">
            {majors.map((item) => (
              <button
                className={`major-card ${
                  student.major === item.id ? "selected" : ""
                }`}
                key={item.id}
                onClick={() =>
                  update({
                    major: item.id,
                    selected: item.id === student.major ? student.selected : [],
                  })
                }
              >
                <span className="major-code">{item.code}</span>
                <span className="select-dot">
                  {student.major === item.id && <Icon name="check" />}
                </span>
                <strong>{item.name}</strong>
                <small>{item.description}</small>
              </button>
            ))}
          </div>
          <div className="assessment-actions">
            <span>You can browse roles with just your major.</span>
            <button
              className="primary-button dark"
              disabled={!student.major}
              onClick={onDone}
            >
              Explore my major <Icon name="arrow" />
            </button>
          </div>
        </>
      ) : (
        <>
          <PageIntro
            label="02 · Make it yours"
            title={
              <>
                What feels
                <br />
                <em>like you?</em>
              </>
            }
            copy="Choose as many or as few signals as you want. These improve ranking, not your worth."
            back={onBack}
          />
          <div className="signals-panel">
            <div className="signals-heading">
              <h3>Add what sounds familiar.</h3>
              <span className="optional">Optional</span>
            </div>
            {(Object.keys(signals[student.major!]) as SignalGroup[]).map(
              (group) => (
                <div className="signal-row" key={group}>
                  <span>
                    {group === "courses"
                      ? "Coursework"
                      : group === "skills"
                        ? "Skills"
                        : "Everyday activities"}
                  </span>
                  <div className="chips">
                    {signals[student.major!][group].map((signal) => (
                      <button
                        className={
                          student.selected.includes(signal) ? "active" : ""
                        }
                        key={signal}
                        onClick={() => toggle(signal)}
                      >
                        <span>
                          {student.selected.includes(signal) ? (
                            <Icon name="check" />
                          ) : (
                            <Icon name="plus" />
                          )}
                        </span>
                        {signal}
                      </button>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
          <div className="assessment-actions">
            <span>
              {student.selected.length || "No"} signals selected · saved
              automatically
            </span>
            <button className="primary-button dark" onClick={onDone}>
              See my results <Icon name="arrow" />
            </button>
          </div>
        </>
      )}
    </section>
  )
}

function CompareDock({
  student,
  navigate,
}: {
  student: StudentState
  navigate: (page: Page) => void
}) {
  if (!student.compare.length) return null
  return (
    <div className="compare-dock">
      <div>
        <span>{student.compare.length}/2 selected</span>
        <strong>{student.compare.join(" + ")}</strong>
      </div>
      <button
        disabled={student.compare.length !== 2}
        onClick={() => navigate("compare")}
      >
        Compare roles <Icon name="arrow" />
      </button>
    </div>
  )
}

function ComparePage({
  roles,
  onBack,
  onOpen,
  onRemove,
  onBrowse,
}: {
  roles: Career[]
  onBack: () => void
  onOpen: (title: string) => void
  onRemove: (title: string) => void
  onBrowse: () => void
}) {
  if (roles.length < 2) {
    return (
      <section className="page-wrap">
        <PageIntro
          label="Compare"
          title={
            <>
              Two paths.
              <br />
              <em>Side by side.</em>
            </>
          }
          back={onBack}
        />
        <EmptyState
          title="Choose two roles to compare"
          copy="Select compare on any two catalog or result cards."
          action="Browse roles"
          onAction={onBrowse}
        />
      </section>
    )
  }
  return (
    <section className="page-wrap">
      <PageIntro
        label="Compare roles"
        title={
          <>
            Two paths.
            <br />
            <em>Side by side.</em>
          </>
        }
        copy="Focus on the work, learning, and evidence you would enjoy building."
        back={onBack}
      />
      <div className="compare-grid">
        {roles.map((role) => {
          const extra = roleExtras[role.title]
          const market = resourcesFor(role.major)
          return (
            <article key={role.title}>
              <button
                className="remove-compare"
                onClick={() => onRemove(role.title)}
              >
                <Icon name="close" /> Remove
              </button>
              <span className="field">{role.field}</span>
              <h2>{role.title}</h2>
              <p>{role.description}</p>
              <div className="compare-section">
                <span className="detail-label">What you would do</span>
                <ul>
                  {extra.involves.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="compare-section">
                <span className="detail-label">Core skills</span>
                <div className="tag-row">
                  {extra.skills.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <div className="compare-section">
                <span className="detail-label">Courses to consider</span>
                <p>{extra.learning.join(", ") || "See roadmap foundations."}</p>
              </div>
              <div className="compare-section">
                <span className="detail-label">U.S. occupation benchmark</span>
                <p>{market.occupation} · {market.median} median annual pay (May 2025)</p>
                {market.mean && <p><a href="https://www.bls.gov/news.release/ocwage.t01.htm">{market.mean} mean annual pay</a></p>}
                <p>{market.openings} projected annual openings · {market.growth} projected growth, 2025–35.</p>
                <a href={market.source}>BLS occupation data</a>
              </div>
              <div className="compare-section">
                <span className="detail-label">Hiring and layoffs</span>
                <p>{market.industry} industry · July–September 2026 · thousands, seasonally adjusted</p>
                <p><a href="https://www.bls.gov/news.release/jolts.t02.htm">Monthly hires: {market.hires.join(" / ")}</a></p>
                <p><a href="https://www.bls.gov/news.release/jolts.t05.htm">Monthly layoffs and discharges: {market.layoffs.join(" / ")}</a></p>
                <p>Role-specific layoffs and job security estimates are unavailable.</p>
              </div>
              <div className="compare-section">
                <span className="detail-label">Show employers your skills</span>
                <p>{extra.deliverable}</p>
              </div>
              <button
                className="primary-button dark"
                onClick={() => onOpen(role.title)}
              >
                View full role <Icon name="arrow" />
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function RolePage({
  role,
  student,
  onBack,
  onSave,
  onStep,
  onOpen,
}: {
  role: Career
  student: StudentState
  onBack: () => void
  onSave: () => void
  onStep: (index: number) => void
  onOpen: (title: string) => void
}) {
  const extra = roleExtras[role.title]
  const done = student.completed[role.title] ?? [false, false, false]
  const related = allRoleData[role.major]
    .filter((item) => item.title !== role.title)
    .slice(0, 3)
  const matches = role.tags.filter((tag) => student.selected.includes(tag))
  return (
    <section className="role-page page-wrap">
      <button className="back-link" onClick={onBack}>
        <Icon name="back" /> Back
      </button>
      <div className="role-page-hero">
        <div>
          <span className="field">{role.field}</span>
          <h1>{role.title}</h1>
          <p>{role.description}</p>
        </div>
        <div className="role-hero-actions">
          <SampleLabel />
          <button
            className={`save-large ${
              student.saved.includes(role.title) ? "saved" : ""
            }`}
            onClick={onSave}
          >
            <Icon name="bookmark" />{" "}
            {student.saved.includes(role.title) ? "Saved" : "Save role"}
          </button>
        </div>
      </div>
      <div className="role-content-grid">
        <div className="role-main">
          <section className="detail-section">
            <span className="detail-label">What the job involves</span>
            <h2>Work you might do.</h2>
            <div className="involve-list">
              {extra.involves.map((item, index) => (
                <div key={item}>
                  <span>0{index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="detail-section violet-section">
            <span className="detail-label">
              <Icon name="spark" /> Why it matched
            </span>
            <h2>Your signals, in plain language.</h2>
            <p>
              You may enjoy this path if you like{" "}
              <strong>{matches[0]?.toLowerCase() ?? role.match[0]}</strong> and{" "}
              <strong>{matches[1]?.toLowerCase() ?? role.match[1]}</strong>. A
              match is an invitation to explore—not a prediction.
            </p>
          </section>
          <section className="detail-section">
            <span className="detail-label">Practical project</span>
            <h2>Build evidence, not busywork.</h2>
            <div className="project-card">
              <span>Suggested project</span>
              <h3>{extra.project}</h3>
              <small>Deliverable</small>
              <p>{extra.deliverable}</p>
            </div>
          </section>
          <section className="detail-section">
            <span className="detail-label">Your roadmap</span>
            <h2>Three steps forward.</h2>
            <div className="full-roadmap">
              {role.steps.map((step, index) => (
                <button
                  className={done[index] ? "done" : ""}
                  key={step.title}
                  onClick={() => onStep(index)}
                >
                  <span className="checkbox">
                    {done[index] && <Icon name="check" />}
                  </span>
                  <span>
                    <small>Milestone 0{index + 1}</small>
                    <strong>{step.title}</strong>
                    <p>{step.detail}</p>
                    <em>
                      Deliverable:{" "}
                      {index === 0
                        ? extra.deliverable
                        : index === 1
                          ? `A practice artifact using ${extra.skills[index] ?? extra.skills[0]}.`
                          : "One documented conversation, application, or real-world contribution."}
                    </em>
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
        <aside className="role-aside">
          <ResourceBlock title="Skills to build" items={extra.skills} />
          <ResourceBlock title="Courses to consider" items={extra.learning} />
          <ResourceBlock
            title="Optional credentials"
            items={extra.credentials}
            note="Credentials are suggestions, not requirements."
          />
          <ResourceBlock title="Clubs & resources" items={extra.resources} />
        </aside>
      </div>
      <section className="related-section">
        <span className="detail-label">Related roles</span>
        <div className="related-grid">
          {related.map((item) => (
            <button key={item.title} onClick={() => onOpen(item.title)}>
              <span>{item.field}</span>
              <strong>{item.title}</strong>
              <Icon name="arrow" />
            </button>
          ))}
        </div>
      </section>
    </section>
  )
}

function ResourceBlock({
  title,
  items,
  note,
}: {
  title: string
  items: string[]
  note?: string
}) {
  return (
    <div className="resource-block">
      <h3>{title}</h3>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
      {note && <small>{note}</small>}
    </div>
  )
}

function RoadmapsPage({
  roles,
  student,
  onStep,
  onOpen,
  onBrowse,
}: {
  roles: Career[]
  student: StudentState
  onStep: (title: string, index: number) => void
  onOpen: (title: string) => void
  onBrowse: () => void
}) {
  const total = roles.length * 3
  const doneTotal = roles.reduce(
    (sum, role) =>
      sum + (student.completed[role.title] ?? []).filter(Boolean).length,
    0,
  )
  return (
    <section className="page-wrap">
      <PageIntro
        label="Progress dashboard"
        title={
          <>
            Your saved
            <br />
            <em>roadmaps.</em>
          </>
        }
        copy="Keep the plans that matter and mark progress as you build real evidence."
      />
      {roles.length ? (
        <>
          <div className="progress-overview">
            <div>
              <span>{doneTotal}</span>
              <p>of {total} milestones complete</p>
            </div>
            <div className="progress-track">
              <i
                style={{ width: `${total ? (doneTotal / total) * 100 : 0}%` }}
              />
            </div>
            <SampleLabel />
          </div>
          <div className="saved-roadmaps">
            {roles.map((role) => {
              const done = student.completed[role.title] ?? [
                false,
                false,
                false,
              ]
              return (
                <article key={role.title}>
                  <div className="saved-roadmap-head">
                    <div>
                      <span className="field">{role.field}</span>
                      <h2>{role.title}</h2>
                    </div>
                    <button onClick={() => onOpen(role.title)}>
                      Role details <Icon name="arrow" />
                    </button>
                  </div>
                  <div className="steps">
                    {role.steps.map((step, index) => (
                      <button
                        className={`step ${done[index] ? "done" : ""}`}
                        key={step.title}
                        onClick={() => onStep(role.title, index)}
                      >
                        <span className="checkbox">
                          {done[index] && <Icon name="check" />}
                        </span>
                        <span>
                          <strong>{step.title}</strong>
                          <small>{step.detail}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </>
      ) : (
        <EmptyState
          icon="map"
          title="No saved roadmaps yet"
          copy="Save a role to keep its roadmap and track milestones here."
          action="Explore careers"
          onAction={onBrowse}
        />
      )}
    </section>
  )
}

function ProfilePage({
  student,
  update,
  confirmReset,
  setConfirmReset,
  onEditAssessment,
  onReset,
}: {
  student: StudentState
  update: (patch: Partial<StudentState>) => void
  confirmReset: boolean
  setConfirmReset: (value: boolean) => void
  onEditAssessment: () => void
  onReset: () => void
}) {
  return (
    <section className="page-wrap profile-page">
      <PageIntro
        label="Student profile"
        title={
          <>
            Your path.
            <br />
            <em>Your settings.</em>
          </>
        }
        copy="Your progress is stored only in this browser for this prototype."
      />
      <div className="settings-grid">
        <section className="settings-card">
          <span className="detail-label">
            <Icon name="user" /> Profile
          </span>
          <label>
            Preferred name
            <input
              value={student.name}
              onChange={(event) => update({ name: event.target.value })}
            />
          </label>
          <label>
            Current major
            <select
              value={student.major ?? ""}
              onChange={(event) =>
                update({ major: event.target.value as MajorId, selected: [], compare: [] })
              }
            >
              <option value="" disabled>
                Choose a major
              </option>
              {majors.map((major) => (
                <option key={major.id} value={major.id}>
                  {major.name}
                </option>
              ))}
            </select>
          </label>
          <small>Changes save automatically.</small>
        </section>
        <section className="settings-card">
          <span className="detail-label">
            <Icon name="spark" /> Saved assessment
          </span>
          <h2>{student.selected.length} signals selected</h2>
          <div className="tag-row">
            {student.selected.slice(0, 8).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <button className="outline-button" onClick={onEditAssessment}>
            Refine my matches <Icon name="arrow" />
          </button>
        </section>
        <section className="settings-card danger-card">
          <span className="detail-label">
            <Icon name="refresh" /> Reset prototype
          </span>
          <h2>Start with a clean slate</h2>
          <p>
            This removes your saved roles, roadmap progress, comparison, and
            assessment from this browser.
          </p>
          {!confirmReset ? (
            <button
              className="danger-button"
              onClick={() => setConfirmReset(true)}
            >
              Reset all data
            </button>
          ) : (
            <div className="reset-confirm">
              <strong>Are you sure?</strong>
              <div>
                <button onClick={() => setConfirmReset(false)}>Cancel</button>
                <button onClick={onReset}>Yes, reset everything</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </section>
  )
}

function Footer({ onHome }: { onHome: () => void }) {
  return (
    <footer>
      <Logo onClick={onHome} />
      <p>A clearer next step starts with a direction, not a perfect plan.</p>
      <span>Student prototype · Sample data</span>
    </footer>
  )
}


function resourcesFor(major: MajorId) {
  const name = majors.find((item) => item.id === major)!.name
  return marketResources[Object.keys(marketResources).find((key) => key.toLowerCase() === name.toLowerCase())!]
}

function MajorResources({ major }: { major: MajorId }) {
  return (
    <details className="settings-card major-resources">
      <summary>External courses, projects, and conventions</summary>
      <ul>
        {resourcesFor(major).links.map(([label, url]) => (
          <li key={url}><a href={url}>{label}</a></li>
        ))}
      </ul>
    </details>
  )
}
