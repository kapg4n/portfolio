/*
  All site content lives here. Edit this file to change text, projects and links.
  Nothing else needs to be touched for everyday updates.

  Images: list files or URLs per project, e.g.
    images: ["images/kanti-1.jpg", "images/kanti-2.jpg"]
  Order per project: [0] = wide hero, [1] & [2] = portrait shots.
  The [1] image is used as the works-grid thumbnail (shown 4:5).
  The photos below are the real pieces dropped into /images; shots(i) just
  rotates the pool so each project gets a different mix. Replace freely.
  If a project has no images, a colour panel is shown instead.
*/
var PHOTOS = {
  wide: "images/seft.jpeg",
  port: ["images/what-now.jpeg", "images/asics-run.jpeg", "images/gumusluk-fest.jpeg"]
};
function shots(i) {
  var hero = (i % 2 === 0) ? PHOTOS.wide : PHOTOS.port[(i + 2) % 3];
  return [hero, PHOTOS.port[i % 3], PHOTOS.port[(i + 1) % 3]];
}

window.SITE = {
  name: "Recalibrated",
  role: "Creative studio",
  location: "Based in Istanbul, working worldwide",
  availability: "Taking new projects from November",
  intro: "We recalibrate the way brands look and speak — identities, packaging and art direction for restaurants, shops and makers who want to look like themselves.",

  // Featured project shown above the works grid. slug points to a project below.
  // Set video (and an optional poster) to autoplay a muted loop; otherwise the
  // project's images crossfade.
  featured: { slug: "kanti", video: "", poster: "" },

  email: "hello@recalibrated.co",
  socials: [
    { label: "Instagram", url: "https://instagram.com/recalibrated" },
    { label: "Behance", url: "https://behance.net/recalibrated" },
    { label: "LinkedIn", url: "https://linkedin.com/company/recalibrated" }
  ],

  about: [
    "Recalibrated is a small creative studio working across identity, packaging and art direction. We started in a packaging workshop, learning how a label survives a supermarket shelf and how a menu survives a Friday-night service. Since then we have worked with cafés, bakeries, makers and a few stubborn founders who knew exactly what they did not want.",
    "Most projects begin with a long conversation and a lot of sketching on paper. We work as a tight team, bringing in a trusted photographer or developer when a project needs one, and we stay involved through to the press check."
  ],
  clients: ["Kantİ", "Yonca Eczanesi", "NOX Smokehouse", "Cabana", "Living & Wellbeing", "Dimanche Atelier", "Whisk", "Myrina"],
  portrait: "images/asics-run.jpeg",

  services: [
    { title: "Creative direction", text: "The big idea and the through-line that keeps every touchpoint speaking with one voice." },
    { title: "Art direction", text: "Shoots, campaigns and launch material that stay true to the brand." },
    { title: "Branding", text: "Logos, type and colour systems, and the guidelines that keep them consistent." },
    { title: "Packaging design", text: "Labels, boxes and bags, from first sketch to print-ready files and press checks." },
    { title: "Illustration", text: "Custom drawings for packaging, walls and social media." },
    { title: "Photography", text: "Product and lifestyle photography, art-directed and styled in-house." },
    { title: "Website design", text: "We develop powerful platforms that grow with your needs." },
    { title: "Social media design", text: "Templates and content systems the team can run in five minutes a week." }
  ],

  projects: [
    {
      slug: "kanti",
      title: "Kantİ",
      type: "Dining · Identity",
      year: "2026",
      location: "Karaköy, Istanbul",
      summary: "A canteen-style restaurant that wanted the warmth of a staff cafeteria without the plastic tray. We built a stamp-and-stencil identity that scales from enamel plates to a hand-painted shopfront, so the room feels made by hand rather than rolled out.",
      color: "#F35B04", ink: "#111111",
      images: shots(0)
    },
    {
      slug: "yonca-eczanesi",
      title: "Yonca Eczanesi",
      type: "Pharmacy · Packaging",
      year: "2025",
      location: "Moda, Istanbul",
      summary: "An independent pharmacy asked for packaging that felt calm and clinical without going cold. A single spot colour, a clear grid and a friendly clover mark run across paper bags, dosage labels and the shelf-edge system.",
      color: "#111111", ink: "#F35B04",
      images: shots(1)
    },
    {
      slug: "nox-smokehouse",
      title: "NOX Smokehouse",
      type: "Branding",
      year: "2025",
      location: "Bebek, Istanbul",
      summary: "A late-night smokehouse needed a mark that reads across a dark room and a takeaway box alike. We drew a heavy, condensed wordmark and a smoke-trail monogram, then set the whole system in charcoal and ember.",
      color: "#F35B04", ink: "#111111",
      images: shots(2)
    },
    {
      slug: "cabana",
      title: "Cabana",
      type: "Art direction",
      year: "2024",
      location: "Çeşme",
      summary: "Art direction for a beach club's first full season, from the pool-side signage to the drinks list and the launch campaign. We planned the shoot, styled the props and built a loose, sun-bleached template the team can extend all summer.",
      color: "#111111", ink: "#F35B04",
      images: shots(3)
    },
    {
      slug: "living-wellbeing",
      title: "Living & Wellbeing",
      type: "Café · Identity",
      year: "2024",
      location: "Nişantaşı, Istanbul",
      summary: "A café and slow-living shop under one roof wanted an identity that works on a coffee cup and a candle box without splitting in two. A soft serif paired with a utilitarian grotesk holds the two moods together.",
      color: "#F35B04", ink: "#111111",
      images: shots(4)
    },
    {
      slug: "dimanche-atelier",
      title: "Dimanche Atelier",
      type: "Furniture design",
      year: "2023",
      location: "Bomonti, Istanbul",
      summary: "Brand and catalogue for a furniture atelier that makes one-off pieces to order. The identity stays quiet so the objects can speak: generous margins, a single accent and photography shot against raw plaster.",
      color: "#111111", ink: "#F35B04",
      images: shots(5)
    },
    {
      slug: "whisk",
      title: "Whisk",
      type: "Branding · Packaging",
      year: "2023",
      location: "Kadıköy, Istanbul",
      summary: "A home-baking brand selling pre-measured kits needed packaging that survives a courier and still delights on the kitchen counter. Bold flavour colours, a playful mark and clear instructions printed straight onto the box.",
      color: "#F35B04", ink: "#111111",
      images: shots(6)
    },
    {
      slug: "myrina",
      title: "Myrina",
      type: "Label design",
      year: "2022",
      location: "Urla",
      summary: "A series of labels for a small natural-wine producer — one illustrated figure per vintage, printed on textured paper with a single spot colour and a lot of restraint.",
      color: "#111111", ink: "#F35B04",
      images: shots(7)
    }
  ]
};
