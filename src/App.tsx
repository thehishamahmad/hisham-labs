import { useEffect, useState } from "react";

const portfolioUrl = "https://www.hisham-ahmad.com";

type Project = {
  category: string;
  name: string;
  featured: boolean;
  description: string;
  statements: string[];
  url: string;
  image: {
    src: string;
    alt: string;
    position: string;
  };
  tone: "cloud" | "operations" | "travel" | "platform";
  align: "image-left" | "image-right";
};

const projects: Project[] = [
  {
    category: "Cloud Architecture",
    name: "CloudShift",
    featured: true,
    description: "Cloud decisions, made clearer.",
    statements: [
      "Choosing a cloud architecture is easy when you follow habit. The harder part is proving that it actually fits.",
      "CloudShift asks the questions that shape the decision, then recommends an architecture with the trade-offs laid out clearly.",
      "The result is something you can review, explain and defend—not just another diagram."
    ],
    url: "https://cloudshift.hishamlabs.com",
    image: {
      src: "/images/projects/cloudshift.webp",
      alt: "CloudShift product interface screenshot",
      position: "center top"
    },
    tone: "cloud",
    align: "image-left"
  },
  {
    category: "Operations",
    name: "CarWashOS",
    featured: true,
    description: "Less guesswork in the queue.",
    statements: [
      "At a busy car wash, even a small queue can become confusing very quickly.",
      "CarWashOS gives staff one live view of every vehicle, while customers get a clearer idea of how long they will wait.",
      "Less guessing at the counter. Better visibility for everyone."
    ],
    url: "https://carwashos.hishamlabs.com",
    image: {
      src: "/images/projects/carwashos.webp",
      alt: "CarWashOS product interface screenshot",
      position: "left center"
    },
    tone: "operations",
    align: "image-right"
  },
  {
    category: "Travel Experience",
    name: "RareCruise",
    featured: true,
    description: "See the journey before you book.",
    statements: [
      "A cruise itinerary can look simple on paper: a list of ports, dates and prices. But that does not show how the journey actually feels.",
      "RareCruise turns the itinerary into a visual experience that is easier to explore and compare.",
      "Because choosing a cruise should feel like discovering a journey—not reading a spreadsheet."
    ],
    url: "https://rarecruise.hishamlabs.com",
    image: {
      src: "/images/projects/rarecruise.webp",
      alt: "RareCruise product interface screenshot",
      position: "center top"
    },
    tone: "travel",
    align: "image-left"
  },
  {
    category: "Platform Architecture",
    name: "OpenShift Architect Studio",
    featured: true,
    description: "Learn OpenShift components. Connect them to customer requirements.",
    statements: [
      "OpenShift can be difficult to learn when its components are explained separately from the problems they solve.",
      "I built OpenShift Architect Studio to make that connection clearer. Learn Mode helps newcomers understand what each OpenShift component does and why it matters.",
      "Architect Mode starts with a customer scenario and shows how an architect connects the requirements to the relevant components. Together, the two modes help users understand both the platform and the reasoning behind a solution."
    ],
    url: "https://openshift.hishamlabs.com/",
    image: {
      src: "/images/projects/openshift-studio.webp",
      alt: "OpenShift Architect Studio start screen with platform architecture illustration",
      position: "center top"
    },
    tone: "platform",
    align: "image-right"
  }
];

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Approach", href: "#approach" }
];

function BrandName() {
  return (
    <span className="brand-name">
      <span className="brand-name__primary">Hisham</span>
      <span className="brand-name__accent">Labs</span>
    </span>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.body.classList.add("menu-locked");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("menu-locked");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="#top" onClick={closeMenu}>
          <BrandName />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
        </button>
        <div className="desktop-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a className="external-link" href={portfolioUrl} target="_blank" rel="noreferrer">
            Portfolio {"\u2197"}
          </a>
        </div>
      </nav>
      <div
        className={`mobile-panel ${menuOpen ? "is-open" : ""}`}
        id="mobile-nav"
        aria-hidden={!menuOpen}
      >
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <a className="external-link" href={portfolioUrl} target="_blank" rel="noreferrer">
          Portfolio {"\u2197"}
        </a>
      </div>
    </header>
  );
}

function ScreenshotSurface({ project }: { project: Project }) {
  const [imageMissing, setImageMissing] = useState(false);

  return (
    <div className={`screenshot-surface ${project.tone}`}>
      {!imageMissing && (
        <img
          src={project.image.src}
          alt={project.image.alt}
          style={{ objectPosition: project.image.position }}
          onError={() => setImageMissing(true)}
        />
      )}
      {imageMissing && (
        <div className="screenshot-placeholder" role="note">
          <span>Screenshot pending</span>
          <code>{project.image.src}</code>
        </div>
      )}
    </div>
  );
}

function projectSectionId(project: Project) {
  return project.name.toLowerCase().replace(/\s+/g, "-");
}

function LabIndex() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <aside className="lab-index" aria-labelledby="lab-index-title">
      <p className="eyebrow" id="lab-index-title">In the Lab</p>
      <div className="lab-index-list">
        {featuredProjects.map((project, index) => (
          <a className="lab-index-row" href={`#${projectSectionId(project)}`} key={project.name}>
            <span className="lab-index-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="lab-index-main">
              <strong>{project.name}</strong>
              <span>{project.description}</span>
            </span>
            <span className="lab-index-status">Live</span>
          </a>
        ))}
      </div>
    </aside>
  );
}

function ProjectSection({ project, first }: { project: Project; first?: boolean }) {
  return (
    <section
      className={`project-section ${project.tone} ${project.align}`}
      id={projectSectionId(project)}
      aria-labelledby={`${projectSectionId(project)}-title`}
    >
      {first && <span className="anchor-marker" id="projects" aria-hidden="true" />}
      <div className="project-grid shell">
        <ScreenshotSurface project={project} />
        <div className="project-copy">
          <p className="eyebrow">{project.category}</p>
          <h2 id={`${projectSectionId(project)}-title`}>{project.name}</h2>
          {project.statements.map((statement) => (
            <p key={statement}>{statement}</p>
          ))}
          <a className="text-link" href={project.url} target="_blank" rel="noreferrer">
            View live demo {"\u2192"}
          </a>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  const steps = [
    {
      title: "Start with a real problem",
      text: "I begin with something people genuinely struggle with—not a feature looking for a reason to exist."
    },
    {
      title: "Design before building",
      text: "Before writing code, I work through the product flow, architecture and important trade-offs."
    },
    {
      title: "Build something people can try",
      text: "Then I turn the idea into a working prototype that people can see, use and challenge."
    }
  ];

  return (
    <section className="approach-section" id="approach" aria-labelledby="approach-title">
      <div className="shell">
        <p className="eyebrow">Approach</p>
        <h2 id="approach-title" className="sr-only">Approach</h2>
        <div className="approach-grid">
          {steps.map((step) => (
            <article key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="closing-section" aria-labelledby="closing-title">
      <div className="shell closing-inner">
        <h2 id="closing-title">Want to know more about the person behind the work?</h2>
        <p>Visit my professional portfolio for my experience, certifications and solution architecture background.</p>
        <a className="button-link" href={portfolioUrl} target="_blank" rel="noreferrer">
          View professional portfolio {"\u2197"}
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p>{"\u00a9"} Hisham Ahmad. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="shell hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">Independent Product & Cloud Innovation Lab</p>
              <h1 id="hero-title">
                Real problems.
                <span>Working prototypes.</span>
              </h1>
              <p>
                A place where I turn real-world problems into working products—across cloud architecture, operations and travel.
              </p>
              <div className="hero-actions">
                <a className="button-link" href="#projects">
                  Explore projects
                </a>
              </div>
            </div>
            <LabIndex />
          </div>
        </section>
        {projects.map((project, index) => (
          <ProjectSection key={project.name} project={project} first={index === 0} />
        ))}
        <Approach />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
