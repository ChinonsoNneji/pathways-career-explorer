export type MajorId = "mechanical" | "cybersecurity" | "computer-science"
declare const __PATHWAYS__: {
  major: string
  name: string
  signals: string[]
  coursework: string[]
  evidence: string
  steps: string[]
}[]
declare const __COURSES__: string[]
declare const __RESOURCES__: Record<string, {
  occupation: string; median: string; mean?: string; openings: string; growth: string
  source: string; industry: string; hires: number[]; layoffs: number[]; links: [string, string][]
}>
export const marketResources = __RESOURCES__
export type SignalGroup = "courses" | "skills" | "activities"
export type Step = { title: string; detail: string }
export type Role = {
  title: string
  field: string
  description: string
  tags: string[]
  match: string[]
  steps: Step[]
}

export const majors: {
  id: MajorId
  name: string
  short: string
  code: string
  description: string
}[] = [
  {
    id: "mechanical",
    name: "Mechanical Engineering",
    short: "Mechanical",
    code: "ME",
    description: "Build, test, and improve the physical systems around us.",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    short: "Cybersecurity",
    code: "CY",
    description: "Protect the systems and information people rely on.",
  },
  {
    id: "computer-science",
    name: "Computer Science",
    short: "Computer Science",
    code: "CS",
    description: "Turn logic and ideas into useful technology.",
  },
]

export const signals: Record<MajorId, Record<SignalGroup, string[]>> = {
  mechanical: {
    courses: [
      "Thermodynamics",
      "CAD & design",
      "Materials science",
      "Dynamics",
    ],
    skills: [
      "3D modeling",
      "Prototyping",
      "Data analysis",
      "Technical drawing",
    ],
    activities: [
      "Fixing broken things",
      "Building with my hands",
      "Spotting patterns",
      "Tuning performance",
    ],
  },
  cybersecurity: {
    courses: [
      "Network security",
      "Operating systems",
      "Digital forensics",
      "Cryptography",
    ],
    skills: ["Linux", "Network analysis", "Scripting", "Threat research"],
    activities: [
      "Solving mysteries",
      "Spotting patterns",
      "Finding weak points",
      "Helping in a crisis",
    ],
  },
  "computer-science": {
    courses: [
      "Data structures",
      "Databases",
      "Machine learning",
      "Distributed systems",
    ],
    skills: ["Python", "Cloud platforms", "SQL", "Automation"],
    activities: [
      "Automating repetitive tasks",
      "Building useful tools",
      "Spotting patterns",
      "Organizing information",
    ],
  },
}

export const roleData: Record<MajorId, Role[]> = {
  mechanical: [
    {
      title: "Robotics Engineer",
      field: "Robotics & automation",
      description:
        "Design and test machines that sense, move, and work alongside people.",
      tags: [
        "CAD & design",
        "Dynamics",
        "Prototyping",
        "Building with my hands",
      ],
      match: ["hands-on design", "turning movement into a working system"],
      steps: [
        {
          title: "Build one moving prototype",
          detail: "Try a campus robotics team or a small Arduino mechanism.",
        },
        {
          title: "Learn the core tools",
          detail: "Practice CAD, controls basics, and a little Python or C++.",
        },
        {
          title: "Find a test environment",
          detail: "Look for robotics, automation, or mechatronics internships.",
        },
      ],
    },
    {
      title: "Automotive Engineer",
      field: "Mobility & automotive",
      description:
        "Develop safer, more efficient vehicles and the systems inside them.",
      tags: [
        "Thermodynamics",
        "Dynamics",
        "Tuning performance",
        "Data analysis",
      ],
      match: [
        "understanding how parts work together",
        "improving real-world performance",
      ],
      steps: [
        {
          title: "Join a vehicle project",
          detail:
            "Formula SAE, EcoCAR, or a personal drivetrain project all count.",
        },
        {
          title: "Strengthen simulation skills",
          detail: "Use CAD and MATLAB to model loads, motion, or energy.",
        },
        {
          title: "Meet the industry",
          detail: "Target a supplier, OEM, racing, or EV systems internship.",
        },
      ],
    },
    {
      title: "Manufacturing Engineer",
      field: "Manufacturing",
      description:
        "Make production safer, faster, and more reliable from prototype to factory floor.",
      tags: [
        "Materials science",
        "Fixing broken things",
        "Spotting patterns",
        "Prototyping",
      ],
      match: ["finding what slows a process down", "making practical fixes"],
      steps: [
        {
          title: "Map a real process",
          detail: "Document how a lab, shop, or student team builds something.",
        },
        {
          title: "Learn quality basics",
          detail:
            "Explore lean methods, tolerances, and statistical process control.",
        },
        {
          title: "Get floor experience",
          detail:
            "Seek a plant, operations, quality, or industrial engineering role.",
        },
      ],
    },
    {
      title: "Thermal Systems Engineer",
      field: "Energy & thermal",
      description:
        "Manage heat and energy in products from batteries to buildings and spacecraft.",
      tags: [
        "Thermodynamics",
        "Data analysis",
        "Spotting patterns",
        "Technical drawing",
      ],
      match: [
        "following energy through a system",
        "using data to predict performance",
      ],
      steps: [
        {
          title: "Model a heat problem",
          detail:
            "Analyze battery cooling, a heat sink, or a room’s energy use.",
        },
        {
          title: "Add simulation depth",
          detail: "Practice MATLAB, CFD, and experimental data collection.",
        },
        {
          title: "Explore energy teams",
          detail:
            "Look at HVAC, batteries, aerospace, utilities, and sustainability.",
        },
      ],
    },
  ],
  cybersecurity: [
    {
      title: "Incident Response Analyst",
      field: "Incident response",
      description:
        "Investigate attacks, limit damage, and help organizations recover with confidence.",
      tags: [
        "Network security",
        "Linux",
        "Helping in a crisis",
        "Finding weak points",
      ],
      match: ["staying curious under pressure", "tracking down what happened"],
      steps: [
        {
          title: "Practice in a safe lab",
          detail: "Use a CTF or home lab to investigate a simulated alert.",
        },
        {
          title: "Learn the response cycle",
          detail:
            "Study triage, containment, evidence handling, and reporting.",
        },
        {
          title: "Get close to a SOC",
          detail:
            "Target SOC, security operations, or incident response internships.",
        },
      ],
    },
    {
      title: "Digital Forensics Examiner",
      field: "Digital & network forensics",
      description:
        "Recover and interpret digital evidence to explain what happened and when.",
      tags: [
        "Digital forensics",
        "Operating systems",
        "Solving mysteries",
        "Spotting patterns",
      ],
      match: [
        "patient investigation",
        "making a clear story from scattered clues",
      ],
      steps: [
        {
          title: "Analyze a sample image",
          detail:
            "Work through a legal training disk image and log your method.",
        },
        {
          title: "Build evidence habits",
          detail: "Learn timelines, chain of custody, and concise case notes.",
        },
        {
          title: "Explore examiner roles",
          detail:
            "Consider consulting, law enforcement, and internal forensics teams.",
        },
      ],
    },
    {
      title: "Network Security Engineer",
      field: "Network engineering & infrastructure",
      description:
        "Design and defend the networks that keep teams, products, and data connected.",
      tags: [
        "Network security",
        "Network analysis",
        "Linux",
        "Finding weak points",
      ],
      match: [
        "seeing systems as connected layers",
        "preventing problems before they spread",
      ],
      steps: [
        {
          title: "Diagram a network",
          detail: "Build a small virtual network and explain every connection.",
        },
        {
          title: "Practice secure configuration",
          detail: "Learn routing, firewalls, identity, and cloud networking.",
        },
        {
          title: "Earn applied experience",
          detail:
            "Seek network operations, infrastructure, or security engineering work.",
        },
      ],
    },
    {
      title: "Threat Detection Engineer",
      field: "Security engineering",
      description:
        "Turn attacker behavior into signals that help defenders find threats earlier.",
      tags: [
        "Scripting",
        "Threat research",
        "Cryptography",
        "Spotting patterns",
      ],
      match: [
        "recognizing unusual patterns",
        "automating careful detective work",
      ],
      steps: [
        {
          title: "Write a simple detection",
          detail: "Turn a known attack technique into a query or rule.",
        },
        {
          title: "Learn common telemetry",
          detail: "Explore endpoint, identity, cloud, and network event data.",
        },
        {
          title: "Publish a mini write-up",
          detail:
            "Explain your detection logic, test data, and false positives.",
        },
      ],
    },
  ],
  "computer-science": [
    {
      title: "Software Engineer",
      field: "Software engineering",
      description:
        "Build reliable products and tools that solve clear problems for real people.",
      tags: [
        "Data structures",
        "Python",
        "Building useful tools",
        "Organizing information",
      ],
      match: [
        "turning ideas into working tools",
        "breaking big problems into smaller pieces",
      ],
      steps: [
        {
          title: "Ship one useful project",
          detail:
            "Build for a student group, friend, or problem you know well.",
        },
        {
          title: "Practice team workflows",
          detail: "Use Git, tests, code review, and clear documentation.",
        },
        {
          title: "Find real users",
          detail:
            "Seek an internship, open-source team, or campus developer role.",
        },
      ],
    },
    {
      title: "Cloud / DevOps Engineer",
      field: "Cloud engineering & infrastructure",
      description:
        "Automate the systems that help software ship quickly and stay dependable.",
      tags: [
        "Cloud platforms",
        "Automation",
        "Distributed systems",
        "Automating repetitive tasks",
      ],
      match: [
        "automating repetitive work",
        "keeping complex systems running smoothly",
      ],
      steps: [
        {
          title: "Deploy a small service",
          detail:
            "Put an app online with logs, health checks, and a simple pipeline.",
        },
        {
          title: "Automate the setup",
          detail:
            "Learn containers, CI/CD, infrastructure as code, and observability.",
        },
        {
          title: "Practice reliability thinking",
          detail: "Run a failure drill and document how the service recovers.",
        },
      ],
    },
    {
      title: "Data Engineer",
      field: "Data engineering",
      description:
        "Create trusted pipelines that move, clean, and organize data for decisions.",
      tags: ["Databases", "SQL", "Python", "Organizing information"],
      match: [
        "bringing order to messy information",
        "building systems other people can trust",
      ],
      steps: [
        {
          title: "Build a small pipeline",
          detail: "Collect, clean, store, and visualize one public dataset.",
        },
        {
          title: "Learn data foundations",
          detail:
            "Practice SQL, schemas, orchestration, and data quality checks.",
        },
        {
          title: "Show your decisions",
          detail:
            "Document tradeoffs, tests, and how a teammate would use the data.",
        },
      ],
    },
    {
      title: "Machine Learning Engineer",
      field: "Machine learning",
      description:
        "Turn patterns in data into useful, responsible features and products.",
      tags: [
        "Machine learning",
        "Python",
        "Data structures",
        "Spotting patterns",
      ],
      match: [
        "spotting patterns in information",
        "experimenting until a model improves",
      ],
      steps: [
        {
          title: "Frame a narrow problem",
          detail:
            "Choose a clear prediction task and define what success means.",
        },
        {
          title: "Build a full experiment",
          detail:
            "Prepare data, compare baselines, evaluate, and explain bias.",
        },
        {
          title: "Put the model to work",
          detail: "Deploy a demo and monitor how it behaves on new examples.",
        },
      ],
    },
  ],
}

const additionalRoles: Record<MajorId, Role> = {
  mechanical: {
    title: "Product Design Engineer",
    field: "Product development",
    description:
      "Turn real user needs into physical products that can be tested and manufactured.",
    tags: [
      "CAD & design",
      "Prototyping",
      "Materials science",
      "Building with my hands",
    ],
    match: [
      "shaping ideas into tangible products",
      "balancing creativity with constraints",
    ],
    steps: [
      {
        title: "Redesign an everyday object",
        detail:
          "Document user needs, sketches, CAD iterations, and a tested prototype.",
      },
      {
        title: "Practice design for manufacture",
        detail:
          "Learn tolerances, materials, fasteners, and common production methods.",
      },
      {
        title: "Build a concise portfolio",
        detail:
          "Show your decisions and test results—not only polished final renders.",
      },
    ],
  },
  cybersecurity: {
    title: "Security Analyst",
    field: "Security operations",
    description:
      "Monitor systems, investigate suspicious activity, and help teams reduce everyday risk.",
    tags: ["Network security", "Linux", "Threat research", "Spotting patterns"],
    match: [
      "noticing what looks out of place",
      "explaining technical risk clearly",
    ],
    steps: [
      {
        title: "Triage five sample alerts",
        detail:
          "Record what you checked, what mattered, and how you reached each decision.",
      },
      {
        title: "Learn the defender toolkit",
        detail:
          "Practice with logs, SIEM queries, vulnerability scans, and ticket workflows.",
      },
      {
        title: "Create a security brief",
        detail:
          "Turn one technical finding into a clear one-page recommendation.",
      },
    ],
  },
  "computer-science": {
    title: "Full-Stack Engineer",
    field: "Web product engineering",
    description:
      "Build connected user experiences across interfaces, APIs, and databases.",
    tags: [
      "Data structures",
      "Databases",
      "Building useful tools",
      "Automation",
    ],
    match: ["seeing a product end to end", "making many systems work together"],
    steps: [
      {
        title: "Ship one complete web product",
        detail:
          "Include a responsive interface, API, database, validation, and deployment.",
      },
      {
        title: "Add production habits",
        detail:
          "Use authentication, tests, accessibility checks, logs, and documentation.",
      },
      {
        title: "Test with real users",
        detail:
          "Collect feedback, prioritize one issue, and publish an improved version.",
      },
    ],
  },
}

export const allRoleData: Record<MajorId, Role[]> = {
  mechanical: [...roleData.mechanical, additionalRoles.mechanical],
  cybersecurity: [...roleData.cybersecurity, additionalRoles.cybersecurity],
  "computer-science": [
    ...roleData["computer-science"],
    additionalRoles["computer-science"],
  ],
}

export type RoleExtra = {
  involves: string[]
  project: string
  deliverable: string
  skills: string[]
  learning: string[]
  credentials: string[]
  resources: string[]
}

export const roleExtras: Record<string, RoleExtra> = {
  "Robotics Engineer": {
    involves: [
      "Prototype mechanisms and sensor systems",
      "Tune controls and troubleshoot hardware",
      "Test robots against safety and performance goals",
    ],
    project:
      "Build a line-following robot that recovers from three common failure conditions.",
    deliverable:
      "A working demo, CAD files, test plan, and two-minute design walkthrough.",
    skills: ["CAD", "Controls", "Python or C++", "Electronics basics"],
    learning: ["Controls systems", "Mechatronics", "Machine design"],
    credentials: ["SOLIDWORKS Associate", "MATLAB Onramp"],
    resources: [
      "Campus robotics team",
      "IEEE student branch",
      "Local maker space",
    ],
  },
  "Automotive Engineer": {
    involves: [
      "Model vehicle structures or subsystems",
      "Analyze thermal and dynamic performance",
      "Validate designs with tests and data",
    ],
    project:
      "Model and test a lightweight suspension component or small EV cooling loop.",
    deliverable:
      "CAD, assumptions, simulation results, and a test-to-model comparison.",
    skills: ["CAD", "MATLAB", "Vehicle dynamics", "Data analysis"],
    learning: ["Thermodynamics", "Dynamics", "Finite element methods"],
    credentials: ["SOLIDWORKS Associate", "MATLAB Onramp"],
    resources: ["Formula SAE", "EcoCAR team", "SAE student chapter"],
  },
  "Manufacturing Engineer": {
    involves: [
      "Design repeatable production processes",
      "Find quality and throughput issues",
      "Coordinate with operators, suppliers, and designers",
    ],
    project:
      "Improve a campus lab assembly process using a time study and fixture prototype.",
    deliverable:
      "Current-state map, improvement proposal, fixture, and measured before/after result.",
    skills: ["Process mapping", "Quality methods", "CAD", "Statistics"],
    learning: ["Manufacturing processes", "Quality engineering", "Operations"],
    credentials: ["Lean Six Sigma Yellow Belt", "SOLIDWORKS Associate"],
    resources: [
      "SME student chapter",
      "Campus machine shop",
      "Design-build team",
    ],
  },
  "Thermal Systems Engineer": {
    involves: [
      "Predict heat transfer and energy use",
      "Design cooling or HVAC solutions",
      "Compare simulation with physical measurements",
    ],
    project: "Design and validate a heat sink for a small electronic device.",
    deliverable:
      "Thermal model, prototype, sensor data, and recommendation memo.",
    skills: ["Thermodynamics", "CFD", "MATLAB", "Experiment design"],
    learning: ["Heat transfer", "Fluid mechanics", "Energy systems"],
    credentials: ["MATLAB Onramp", "FE exam preparation"],
    resources: ["ASHRAE student branch", "Energy club", "Thermal research lab"],
  },
  "Product Design Engineer": {
    involves: [
      "Translate user needs into product requirements",
      "Create and test physical prototypes",
      "Prepare designs for reliable manufacturing",
    ],
    project:
      "Redesign a frequently used campus object for accessibility and easier assembly.",
    deliverable:
      "Research notes, three concepts, CAD, prototype, and usability findings.",
    skills: ["CAD", "Prototyping", "User research", "Design for manufacture"],
    learning: ["Product design", "Materials", "Manufacturing processes"],
    credentials: ["SOLIDWORKS Associate", "Autodesk Certified User"],
    resources: [
      "Industrial design club",
      "Maker space",
      "Entrepreneurship center",
    ],
  },
  "Incident Response Analyst": {
    involves: [
      "Triage alerts and establish scope",
      "Contain threats while preserving evidence",
      "Coordinate recovery and document lessons",
    ],
    project:
      "Investigate a simulated phishing-to-malware incident in a safe lab.",
    deliverable:
      "Timeline, evidence log, containment plan, and executive incident summary.",
    skills: ["Log analysis", "Linux", "Networking", "Incident writing"],
    learning: ["Incident response", "Operating systems", "Network security"],
    credentials: ["CompTIA Security+", "Blue Team Level 1"],
    resources: [
      "Cyber defense club",
      "Collegiate cyber league",
      "Campus IT security",
    ],
  },
  "Digital Forensics Examiner": {
    involves: [
      "Preserve and acquire digital evidence",
      "Recover artifacts and build timelines",
      "Explain findings with defensible methods",
    ],
    project:
      "Analyze a legal training disk image to reconstruct a sequence of user actions.",
    deliverable:
      "Evidence log, artifact timeline, screenshots, and concise case report.",
    skills: [
      "Disk forensics",
      "Timeline analysis",
      "Evidence handling",
      "Technical writing",
    ],
    learning: ["Digital forensics", "Operating systems", "Cyber law"],
    credentials: ["Autopsy training", "CompTIA Security+"],
    resources: [
      "Digital forensics club",
      "Cyber lab",
      "Regional HTCIA chapter",
    ],
  },
  "Network Security Engineer": {
    involves: [
      "Design segmented and resilient networks",
      "Configure firewalls and secure access",
      "Monitor capacity, availability, and threats",
    ],
    project:
      "Build and harden a small virtual network with separate user and server zones.",
    deliverable:
      "Network diagram, configuration repository, test evidence, and threat model.",
    skills: ["Networking", "Firewalls", "Linux", "Cloud networking"],
    learning: [
      "Network security",
      "Cloud infrastructure",
      "System administration",
    ],
    credentials: ["Cisco CCNA", "CompTIA Security+"],
    resources: [
      "Cisco Networking Academy",
      "Cyber club",
      "Campus network operations",
    ],
  },
  "Threat Detection Engineer": {
    involves: [
      "Study attacker techniques and telemetry",
      "Write and tune detection rules",
      "Measure coverage and false positives",
    ],
    project:
      "Create three detections for a public attack technique using sample logs.",
    deliverable:
      "Detection rules, test dataset, coverage notes, and tuning report.",
    skills: ["SIEM queries", "Python", "Threat research", "Data analysis"],
    learning: ["Threat hunting", "Security analytics", "Adversary behavior"],
    credentials: ["CompTIA CySA+", "Splunk fundamentals"],
    resources: [
      "MITRE ATT&CK community",
      "Cyber defense club",
      "Open-source detection projects",
    ],
  },
  "Security Analyst": {
    involves: [
      "Monitor alerts and investigate anomalies",
      "Track vulnerabilities and remediation",
      "Explain practical risk to stakeholders",
    ],
    project:
      "Triage a week of sample security alerts and prioritize the highest-risk findings.",
    deliverable:
      "Triage workbook, two investigation notes, and one-page risk brief.",
    skills: ["SIEM", "Vulnerability analysis", "Networking", "Communication"],
    learning: ["Security operations", "Risk management", "Network security"],
    credentials: ["CompTIA Security+", "Google Cybersecurity Certificate"],
    resources: [
      "Cybersecurity club",
      "Campus IT help desk",
      "Collegiate cyber league",
    ],
  },
  "Software Engineer": {
    involves: [
      "Turn requirements into maintainable code",
      "Review, test, and improve software",
      "Collaborate with product and design partners",
    ],
    project:
      "Build a scheduling or coordination tool for a real student organization.",
    deliverable:
      "Deployed app, tested repository, user feedback, and technical README.",
    skills: ["Programming", "Testing", "Git", "System design"],
    learning: ["Data structures", "Software engineering", "Databases"],
    credentials: ["GitHub Foundations", "Cloud practitioner fundamentals"],
    resources: ["ACM student chapter", "Open-source club", "Campus hackathon"],
  },
  "Cloud / DevOps Engineer": {
    involves: [
      "Automate deployment and infrastructure",
      "Monitor service health and reliability",
      "Improve developer delivery workflows",
    ],
    project:
      "Deploy a containerized service with CI/CD, metrics, and automated recovery.",
    deliverable:
      "Infrastructure code, pipeline, dashboard, runbook, and failure-test notes.",
    skills: ["Linux", "Cloud", "Containers", "CI/CD"],
    learning: [
      "Distributed systems",
      "Cloud computing",
      "System administration",
    ],
    credentials: ["AWS Cloud Practitioner", "Docker foundations"],
    resources: [
      "Cloud computing club",
      "DevOps meetups",
      "Open-source infrastructure projects",
    ],
  },
  "Data Engineer": {
    involves: [
      "Design reliable data pipelines and models",
      "Test data quality and lineage",
      "Serve trusted datasets to analysts and products",
    ],
    project:
      "Build a scheduled pipeline that cleans and models a public campus dataset.",
    deliverable:
      "Pipeline repository, data model, quality tests, documentation, and dashboard.",
    skills: ["SQL", "Python", "Data modeling", "Orchestration"],
    learning: ["Databases", "Data systems", "Cloud computing"],
    credentials: ["Databricks fundamentals", "Cloud data fundamentals"],
    resources: ["Data science club", "Open data group", "Analytics lab"],
  },
  "Machine Learning Engineer": {
    involves: [
      "Prepare data and train model baselines",
      "Evaluate performance, bias, and drift",
      "Deploy models into usable systems",
    ],
    project:
      "Build a responsible classifier for a narrow public dataset and deploy a demo.",
    deliverable:
      "Model card, experiment notebook, evaluation, demo, and monitoring plan.",
    skills: ["Python", "Machine learning", "Statistics", "Model deployment"],
    learning: ["Machine learning", "Linear algebra", "Probability"],
    credentials: ["TensorFlow Developer coursework", "Cloud AI fundamentals"],
    resources: ["AI club", "Data science club", "Responsible AI reading group"],
  },
  "Full-Stack Engineer": {
    involves: [
      "Build accessible user interfaces",
      "Design APIs and data models",
      "Deploy and monitor complete web products",
    ],
    project:
      "Create a responsive resource-sharing platform for a campus community.",
    deliverable:
      "Live product, source repository, API docs, tests, and user feedback summary.",
    skills: ["React", "APIs", "Databases", "Accessibility"],
    learning: ["Web development", "Databases", "Software engineering"],
    credentials: ["GitHub Foundations", "Cloud practitioner fundamentals"],
    resources: [
      "Web development club",
      "Campus hackathon",
      "Open-source community",
    ],
  },
}


const figmaTitles: Record<string, string> = {
  "Digital forensics": "Digital Forensics Examiner",
  "Incident response": "Incident Response Analyst",
  "Automotive engineering": "Automotive Engineer",
  "Robotics and automation": "Robotics Engineer",
  "Manufacturing engineering": "Manufacturing Engineer",
  "Thermal engineering": "Thermal Systems Engineer",
  "Product design engineering": "Product Design Engineer",
  "Software engineering": "Software Engineer",
  "Data engineering": "Data Engineer",
  "Machine learning": "Machine Learning Engineer",
}

for (const path of __PATHWAYS__) {
  const major = majors.find((item) => item.name.toLowerCase() === path.major.toLowerCase())
  if (!major) continue
  const group = signals[major.id]
  for (const signal of path.signals) {
    if (Object.values(group).some((items) => items.includes(signal))) continue
    if (__COURSES__.includes(signal)) group.courses.push(signal)
    else group.skills.push(signal)
  }
  const title = figmaTitles[path.name] ?? path.name
  const existing = allRoleData[major.id].find((role) => role.title === title)
  if (existing) {
    existing.tags = [...new Set([...existing.tags, ...path.signals])]
    roleExtras[title].learning = [...new Set([...roleExtras[title].learning, ...path.coursework])]
    continue
  }
  allRoleData[major.id].push({
    title, field: major.name, description: path.steps[1],
    tags: path.signals, match: path.signals,
    steps: path.steps.map((detail, index) => ({
      title: ["Build foundations", "Try a project", "Show your work"][index],
      detail,
    })),
  })
  roleExtras[title] = {
    involves: [path.steps[1]], project: path.steps[1], deliverable: path.evidence,
    skills: path.signals, learning: path.coursework, credentials: [], resources: [],
  }
}
