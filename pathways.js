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
module.exports = { pathways, majors, courses, activities };
