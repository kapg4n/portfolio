/*
  All site content lives here. Edit this file to change text, projects and links.
  Nothing else needs to be touched for everyday updates.

  Images: put files in /images and list them per project, e.g.
    images: ["images/olea-1.jpg", "images/olea-2.jpg"]
  The first image is also used as the hover preview in the work list.
  If a project has no images yet, a colour panel is shown instead.
  portrait: set to "images/portrait.jpg" once you have one.
*/
window.SITE = {
  name: "Your Name",
  role: "Independent graphic designer",
  location: "Based in Istanbul, working worldwide",
  availability: "Taking new projects from November",
  intro: "I design identities, packaging and printed matter for restaurants, shops and small brands that want to look like themselves.",

  email: "hello@yourname.com",
  socials: [
    { label: "Instagram", url: "https://instagram.com/yourhandle" },
    { label: "Behance", url: "https://behance.net/yourhandle" },
    { label: "LinkedIn", url: "https://linkedin.com/in/yourhandle" }
  ],

  about: [
    "I started out in a small packaging studio, learning how a label survives a supermarket shelf and how a menu survives a Friday night service. Since going independent I have worked with cafés, bakeries, makers and a few stubborn founders who knew exactly what they did not want.",
    "Most projects begin with a long conversation and a lot of sketching on paper. I work alone, or with a trusted photographer and developer when a project needs them."
  ],
  clients: ["Olea Bakery", "Kırlangıç", "Tarla Market", "Hane Ceramics", "Ada Coffee", "Mavi Studio"],
  portrait: "",

  services: [
    { title: "Brand identity", text: "Logos, type and colour systems, and the guidelines that keep them consistent." },
    { title: "Packaging", text: "Labels, boxes and bags, from first sketch to print-ready files and press checks." },
    { title: "Art direction", text: "Shoots, campaigns and launch material that stay true to the brand." },
    { title: "Print and editorial", text: "Menus, catalogues, posters and small publications." },
    { title: "Illustration", text: "Custom drawings for packaging, walls and social media." },
    { title: "Web design", text: "Simple, well-made websites designed alongside the identity." }
  ],

  projects: [
    {
      slug: "olea-bakery",
      title: "Olea Bakery",
      type: "Identity and packaging",
      year: "2026",
      location: "Kadıköy, Istanbul",
      summary: "A neighbourhood sourdough bakery needed an identity that works on paper bags, flour sacks and a hand-painted shopfront. We built a stamp-based system so the team can mark every package by hand.",
      color: "#E4B84A", ink: "#3A2A0C",
      images: []
    },
    {
      slug: "kirlangic",
      title: "Kırlangıç",
      type: "Wine labels",
      year: "2025",
      location: "Urla",
      summary: "A series of labels for a small natural wine producer, one illustrated swallow per vintage, printed on textured paper with a single spot colour.",
      color: "#7A2E3A", ink: "#F3D9DC",
      images: []
    },
    {
      slug: "tarla-market",
      title: "Tarla Market",
      type: "Identity and signage",
      year: "2025",
      location: "Bodrum",
      summary: "Wayfinding, price tags and a loud market-stall lettering style for a farmers' market that runs every Saturday from May to October.",
      color: "#3F6B45", ink: "#E6F0D8",
      images: []
    },
    {
      slug: "hane-ceramics",
      title: "Hane Ceramics",
      type: "Art direction",
      year: "2024",
      location: "Eskişehir",
      summary: "Art direction for the first online collection of a two-person ceramics studio, including shoot planning, product styling and a small lookbook.",
      color: "#C9B7A4", ink: "#3B2F25",
      images: []
    },
    {
      slug: "ada-coffee",
      title: "Ada Coffee",
      type: "Identity and packaging",
      year: "2024",
      location: "Büyükada",
      summary: "Coffee bags, cups and a menu board for a roaster on the island. Each origin gets its own colour, taken from the island's painted wooden houses.",
      color: "#2F4DA8", ink: "#DDE4FA",
      images: []
    },
    {
      slug: "mavi-studio",
      title: "Mavi Studio",
      type: "Website and social media",
      year: "2023",
      location: "Izmir",
      summary: "A website and social templates for a yoga studio, designed so the owners can post their weekly schedule in five minutes.",
      color: "#8FB8C9", ink: "#12303C",
      images: []
    }
  ]
};
