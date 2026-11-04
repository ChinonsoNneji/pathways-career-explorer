const pathways = [
  {
    name: "Digital forensics",
    signals: ["Linux", "Puzzles", "Investigations"],
    related: "Incident response and malware analysis",
    steps: ["Practice Linux permissions and command-line navigation.", "Analyze a sample disk image and write an evidence timeline.", "Try a forensics challenge with a campus cybersecurity club."]
  },
  {
    name: "Data engineering",
    signals: ["SQL", "Python", "Data and databases"],
    related: "Database engineering and cloud infrastructure",
    steps: ["Practice SQL joins and Python data ingestion.", "Build a pipeline that loads public data into a database.", "Document how your pipeline handles bad data and ask an engineer for feedback."]
  },
  {
    name: "Automotive engineering",
    signals: ["Calculus", "CAD", "Automotive technology"],
    related: "Robotics and manufacturing",
    steps: ["Study mechanics and model a component in CAD.", "Document the design constraints and results of a test.", "Explore a campus vehicle design team or engineering club."]
  },
  {
    name: "Network engineering",
    signals: ["Linux", "Networking", "Troubleshooting"],
    related: "Network security and cloud networking",
    steps: ["Practice routing, subnetting, and switching fundamentals.", "Build a virtual network lab and document how you troubleshoot it.", "Use CCNA topics to identify gaps and practice explaining your lab to an employer."]
  }
];
const majors = ["Mechanical engineering", "Cybersecurity", "Computer science"];
const courses = new Set(["Calculus", "Linux", "Networking", "Programming", "Operating systems",
  "Statistics", "Controls", "Materials", "Thermodynamics"]);
const activities = new Set(["Puzzles", "Investigations", "Automotive technology",
  "Data and databases", "Organizing messy information", "Comparing how vehicles work",
  "Building things people can use", "Setting up tools for a group", "Planning how parts fit together",
  "Automating repetitive tasks", "Spotting patterns", "Making a process more efficient",
  "Testing why something fails", "Reconstructing what happened"]);
const legacyMajors = ["Cybersecurity", "Computer science", "Mechanical engineering", "Cybersecurity"];
pathways.forEach((path, index) => { path.major = legacyMajors[index]; });
pathways[1].signals.push("Organizing messy information");
pathways[2].signals.push("Comparing how vehicles work");
const additionalRoles = [
  [
    "Computer science",
    "Software engineering",
    "Programming|Git|Building things people can use",
    "Build a small app|Add tests|Publish a demo"
  ],
  [
    "Computer science",
    "Cloud engineering",
    "Operating systems|Linux|Setting up tools for a group",
    "Deploy a web app|Configure monitoring|Practice restoring a backup"
  ],
  [
    "Computer science",
    "Cloud infrastructure",
    "Networking|Linux|Planning how parts fit together",
    "Draw a cloud network|Provision a test environment|Document access controls"
  ],
  [
    "Computer science",
    "DevOps",
    "Git|Scripting|Automating repetitive tasks",
    "Write a build script|Set up continuous integration|Practice a rollback"
  ],
  [
    "Computer science",
    "Machine learning",
    "Statistics|Python|Spotting patterns",
    "Train a baseline model|Measure errors on held-out data|Document failure cases"
  ],
  [
    "Mechanical engineering",
    "Robotics and automation",
    "Controls|CAD|Automating repetitive tasks",
    "Simulate a feedback loop|Prototype a motion mechanism|Test it under different loads"
  ],
  [
    "Mechanical engineering",
    "Manufacturing engineering",
    "Materials|CAD|Making a process more efficient",
    "Compare manufacturing methods|Design a simple fixture|Measure repeatability"
  ],
  [
    "Mechanical engineering",
    "Thermal engineering",
    "Thermodynamics|Calculus|Testing why something fails",
    "Model heat transfer|Measure a cooling system|Compare predictions against measurements"
  ],
  [
    "Cybersecurity",
    "Network forensics",
    "Networking|Packet analysis|Reconstructing what happened",
    "Capture lab traffic|Trace a connection in a packet capture|Write an evidence timeline"
  ],
  [
    "Cybersecurity",
    "Network infrastructure",
    "Networking|Linux|Planning how parts fit together",
    "Design a segmented network|Configure routing and access rules|Test failures and recovery"
  ],
  [
    "Cybersecurity",
    "Incident response",
    "Linux|Troubleshooting|Reconstructing what happened",
    "Analyze sample alerts|Run a tabletop exercise|Write a response playbook"
  ]
];
for (const [major, name, signals, steps] of additionalRoles) {
  pathways.push({ major, name, signals: signals.split("|"), steps: steps.split("|") });
}
const newRoles = [[0,"HVAC design","Thermodynamics|Fluid mechanics|Heat transfer","Model a building cooling load","Equipment schedule and load calculations"],
  [0,"Reliability engineering","Statistics|Materials|Machine design","Analyze a sample bearing failure","Failure analysis and a preventive maintenance plan"],
  [0,"Product design engineering","CAD|Machine design|Materials","Redesign a hand tool for easier assembly","CAD files, drawings, and an assembly test"],
  [0,"Test engineering","Instrumentation|Statistics|Materials","Build a repeatable sensor test fixture","Test protocol, plots, and uncertainty analysis"],
  [1,"Application security","Programming|Web security|Networking","Complete authorized web security practice labs","Finding, reproduction steps, and remediation"],
  [1,"Cloud security","Operating systems|Networking|Cloud computing","Audit permissions in a sandbox cloud environment","Threat model and before-and-after access policy"],
  [1,"Identity and access management","Operating systems|Networking|Access control","Build a role-based access demo with test accounts","Permission matrix and access test cases"],
  [2,"Site reliability engineering","Operating systems|Networking|Scripting","Add alerts and recovery procedures to a demo service","Service objectives, dashboard, and incident report"],
  [2,"Platform engineering","Operating systems|Cloud computing|Git","Create a reusable application deployment template","Template repository and developer onboarding guide"],
  [2,"QA automation","Programming|Statistics|Git","Automate regression checks for a small app","CI run, coverage report, and documented failure cases"],
  [2,"Distributed systems engineering","Algorithms|Networking|Operating systems","Build a replicated queue and simulate a failed worker","Architecture diagram and failure test results"]];
for (const [major, name, topics, project, evidence] of newRoles) {
  const coursework = topics.split("|");
  for (const topic of coursework) if (!["CAD", "Git", "Scripting"].includes(topic)) courses.add(topic);
  pathways.push({
    major: majors[major], name, signals: coursework, evidence,
    steps: [`Study ${coursework.join(", ")}.`, project + ".", "Show employers your " + evidence.toLowerCase() + "."]
  });
}
for (const role of pathways) {
  role.coursework = role.signals.filter((signal) => courses.has(signal));
  role.evidence ??= role.steps[1] + " Share the artifact, your decisions, and the result.";
}
module.exports = { pathways, majors, courses, activities };
