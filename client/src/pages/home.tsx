import { useMemo, useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bookmark,
  Compass,
  Leaf,
  MapPinned,
  Search,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import heroRidgeRoad from "@/assets/images/hero-ridge-road.png";
import imgCampCoffee from "@/assets/images/feature-camp-coffee.png";
import imgMossyTrail from "@/assets/images/feature-mossy-trail.png";
import imgRiverBend from "@/assets/images/feature-river-bend.png";

// New slider assets
import sliderLake from "@/assets/images/slider-lake.png";
import sliderForest from "@/assets/images/slider-forest.png";
import sliderStars from "@/assets/images/slider-stars.png";

type Author = {
  id: string;
  name: string;
  role: string;
  specialty: string;
};

type Story = {
  id: string;
  title: string;
  excerpt: string;
  authorId: string;
  readTimeMinutes: number;
  dateISO: string;
  tags: string[];
  featured: boolean;
  imageKey: "camp" | "trail" | "river";
  location: string;
};

const AUTHORS: Author[] = [
  {
    id: "a1",
    name: "Maris Caldwell",
    role: "Senior Field Editor",
    specialty: "Backcountry routes & ridge-lines",
  },
  {
    id: "a2",
    name: "Jae Park",
    role: "Contributing Photographer",
    specialty: "Small moments, big light",
  },
  {
    id: "a3",
    name: "Owen Rios",
    role: "Trail Historian",
    specialty: "Roadside lore & forgotten waypoints",
  },
];

const STORIES: Story[] = [
  {
    id: "s1",
    title: "The Ridge Road That Never Really Ends",
    excerpt:
      "A dawn drive turned into a slow hike — fog, pines, and a map that refused to stay folded. This is what it looks like to take the long way on purpose.",
    authorId: "a1",
    readTimeMinutes: 9,
    dateISO: "2026-01-18",
    tags: ["Ridge Roads", "Winter Light", "Navigation"],
    featured: true,
    imageKey: "trail",
    location: "Blue Ridge · VA",
  },
  {
    id: "s2",
    title: "Camp Coffee and the Quiet Discipline of Morning",
    excerpt:
      "Before the first mile, there’s the ritual: heat, steam, and the smallest decisions that shape the whole day. A short essay from the fire ring.",
    authorId: "a2",
    readTimeMinutes: 6,
    dateISO: "2026-01-10",
    tags: ["Camp", "Ritual", "Gear"],
    featured: true,
    imageKey: "camp",
    location: "Shiloh Rd · TN",
  },
  {
    id: "s3",
    title: "River Bends: Following Water Like a Storyline",
    excerpt:
      "When the route is unclear, follow the river. It’s always going somewhere — and it’s never in a hurry. Notes from a calm, cold afternoon.",
    authorId: "a3",
    readTimeMinutes: 7,
    dateISO: "2025-12-29",
    tags: ["Rivers", "Reflection", "Slow Travel"],
    featured: false,
    imageKey: "river",
    location: "Ocoee · TN",
  },
  {
    id: "s4",
    title: "Boots on Moss: A Micro-Guide to Soft Trails",
    excerpt:
      "Mossy paths feel forgiving, but they’ll teach you balance. Footwork, pacing, and the kind of attention that turns a walk into practice.",
    authorId: "a1",
    readTimeMinutes: 5,
    dateISO: "2025-12-15",
    tags: ["Hiking", "Technique", "Wet Weather"],
    featured: false,
    imageKey: "trail",
    location: "Smokies · NC",
  },
  {
    id: "s5",
    title: "Waypoint Notes: What We Pack When We Pack Light",
    excerpt:
      "Not a list of ‘must-haves’ — just the handful of things that keep us warm, moving, and curious when the forecast turns on us.",
    authorId: "a2",
    readTimeMinutes: 8,
    dateISO: "2025-11-30",
    tags: ["Packing", "Minimal", "Field Notes"],
    featured: false,
    imageKey: "camp",
    location: "Cherokee · NC",
  },
];

const SLIDES = [
  {
    id: 1,
    image: sliderLake,
    title: "Mornings on the Blue Ridge",
    subtitle: "Where the fog meets the forest and the day begins slowly.",
    kicker: "FIELD NOTE 08",
  },
  {
    id: 2,
    image: sliderForest,
    title: "The Discipline of the Trail",
    subtitle: "Finding rhythm in the repetition of every single mile.",
    kicker: "GUIDE 12",
  },
  {
    id: 3,
    image: sliderStars,
    title: "Nights Under the Cherokee Sky",
    subtitle: "A fire, a map, and a silence that feels like home.",
    kicker: "DISPATCH 04",
  },
];

function formatShortDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function imageFor(key: Story["imageKey"]) {
  if (key === "camp") return imgCampCoffee;
  if (key === "river") return imgRiverBend;
  return imgMossyTrail;
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const featured = useMemo(() => STORIES.filter((s) => s.featured), []);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const s of STORIES) for (const t of s.tags) set.add(t);
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STORIES.filter((s) => {
      const a = AUTHORS.find((x) => x.id === s.authorId);
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.excerpt.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        (a?.name.toLowerCase().includes(q) ?? false);

      const matchesTag = !activeTag || s.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <div className="min-h-screen sr-textured">
      <header
        className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        data-testid="header-site"
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/" data-testid="link-home" className="group inline-flex items-baseline gap-2">
            <span
              className="font-serif text-lg font-semibold tracking-tight text-foreground"
              data-testid="text-brand"
            >
              Shiloh Rd Outdoor
            </span>
            <Badge
              variant="secondary"
              className="rounded-full bg-secondary/70 text-foreground/80"
              data-testid="badge-tagline"
            >
              field journal
            </Badge>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" data-testid="nav-primary">
            <Button
              variant="ghost"
              className="rounded-full"
              data-testid="button-nav-stories"
              onClick={() => {
                const el = document.getElementById("stories");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Stories
            </Button>
            <Button
              variant="ghost"
              className="rounded-full"
              data-testid="button-nav-authors"
              onClick={() => {
                const el = document.getElementById("authors");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Authors
            </Button>
            <Button
              variant="ghost"
              className="rounded-full"
              data-testid="button-nav-highlights"
              onClick={() => {
                const el = document.getElementById("highlights");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Highlights
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden rounded-full md:inline-flex"
              data-testid="button-subscribe"
              onClick={() => {
                const el = document.getElementById("subscribe");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
              Subscribe
            </Button>
            <Button
              className="rounded-full"
              data-testid="button-explore"
              onClick={() => {
                const el = document.getElementById("stories");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Explore
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      <section className="relative h-[85vh] w-full overflow-hidden" data-testid="section-hero-slider">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={SLIDES[currentSlide].image}
              alt={SLIDES[currentSlide].title}
              className="h-full w-full object-cover"
              data-testid={`img-slide-${currentSlide}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="mx-auto w-full max-w-6xl px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <Badge variant="outline" className="mb-6 rounded-full border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-white uppercase backdrop-blur-sm">
                    {SLIDES[currentSlide].kicker}
                  </Badge>
                  <h1 className="font-serif text-5xl font-semibold leading-tight text-white md:text-8xl">
                    {SLIDES[currentSlide].title.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                        className="inline-block mr-[0.25em]"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-6 text-lg text-white/80 md:text-2xl"
                  >
                    {SLIDES[currentSlide].subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="mt-10 flex justify-center gap-4"
                  >
                    <Button size="lg" className="h-14 rounded-full px-8 text-lg" onClick={() => {
                        const el = document.getElementById("stories");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}>
                      Explore Stories
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 rounded-full border-white/30 bg-white/10 px-8 text-lg text-white hover:bg-white/20 backdrop-blur-sm">
                      Field Notes
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-4 z-20">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white/50 hover:bg-white/10 hover:text-white"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={cn(
                  "h-1.5 transition-all duration-500 rounded-full",
                  currentSlide === i ? "w-10 bg-white" : "w-2 bg-white/30"
                )}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white/50 hover:bg-white/10 hover:text-white"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-12">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl font-semibold tracking-tight" data-testid="text-search-title">
              Search the field journal
            </h2>
            <p className="mt-2 text-muted-foreground">
              Filter through hikes, camps, rivers, and practical field notes from across the ridgeline.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center flex-1 md:max-w-md">
            <div className="relative w-full">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stories, authors, locations…"
                className="h-11 rounded-full pl-10 bg-card border-border/50"
                data-testid="input-search"
              />
            </div>
            <Button
              variant="secondary"
              className="h-11 rounded-full px-6"
              data-testid="button-clear-filters"
              onClick={() => {
                setQuery("");
                setActiveTag(null);
              }}
            >
              Clear
            </Button>
          </div>
        </div>

        <div className="mb-12 flex flex-wrap items-center gap-2" data-testid="list-tags">
          <Badge
            className={cn(
              "cursor-pointer rounded-full border px-4 py-2 text-sm transition-all duration-300",
              !activeTag ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground/70 hover:bg-background border-border/50 shadow-sm",
            )}
            data-testid="badge-tag-all"
            onClick={() => setActiveTag(null)}
          >
            All Dispatch
          </Badge>
          {allTags.map((t) => (
            <Badge
              key={t}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm transition-all duration-300",
                activeTag === t ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground/70 hover:bg-background border-border/50 shadow-sm",
              )}
              data-testid={`badge-tag-${t.replace(/\s+/g, "-").toLowerCase()}`}
              onClick={() => setActiveTag(activeTag === t ? null : t)}
            >
              {t}
            </Badge>
          ))}
        </div>

        <section className="mt-10" id="stories" data-testid="section-stories">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight" data-testid="text-stories-title">
                Recent stories
              </h2>
              <p className="mt-1 text-sm text-muted-foreground" data-testid="text-stories-subtitle">
                Thoughtful writing, practical notes, and photographs worth slowing down for.
              </p>
            </div>
            <div className="text-sm text-muted-foreground" data-testid="text-stories-count">
              Showing {results.length} story{results.length === 1 ? "" : "ies"}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="grid-stories">
            {results.map((s) => {
              const a = AUTHORS.find((x) => x.id === s.authorId);
              return (
                <Card
                  key={s.id}
                  className="sr-grain group flex flex-col overflow-hidden rounded-[24px] border border-border/50 bg-card shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                  data-testid={`card-story-${s.id}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={imageFor(s.imageKey)}
                      alt="Story feature"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      data-testid={`img-story-${s.id}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    {s.featured ? (
                      <div className="absolute left-4 top-4">
                        <Badge className="rounded-full bg-primary/90 backdrop-blur-md px-3 py-1" data-testid={`badge-featured-${s.id}`}>
                          Featured
                        </Badge>
                      </div>
                    ) : null}
                    <div className="absolute right-4 bottom-4 translate-y-12 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <Button size="icon" className="rounded-full h-10 w-10 shadow-lg">
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between text-xs font-medium text-muted-foreground/80 uppercase tracking-widest mb-4">
                      <span>{formatShortDate(s.dateISO)}</span>
                      <span>{s.readTimeMinutes} min read</span>
                    </div>

                    <h3 className="font-serif text-2xl font-semibold leading-tight group-hover:text-primary transition-colors duration-300" data-testid={`text-story-title-${s.id}`}>
                      {s.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/70" data-testid={`text-story-excerpt-${s.id}`}>
                      {s.excerpt}
                    </p>

                    <div className="mt-auto pt-6 flex items-center justify-between gap-4 border-t border-border/30">
                       <div className="flex items-center gap-2">
                         <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center font-bold text-[10px] text-primary">
                           {a?.name.split(' ').map(n => n[0]).join('')}
                         </div>
                         <div className="text-sm font-medium" data-testid={`text-story-author-${s.id}`}>
                           {a?.name}
                         </div>
                       </div>
                       <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium uppercase tracking-tighter">
                          <MapPinned className="h-3 w-3" />
                          <span>{s.location}</span>
                       </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mt-20" id="authors" data-testid="section-authors">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-semibold tracking-tight" data-testid="text-authors-title">
              Prominent authors
            </h2>
            <p className="mt-2 text-muted-foreground">
              Writers and photographers shaping the Shiloh Rd voice.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3" data-testid="grid-authors">
            {AUTHORS.map((a) => (
              <Card
                key={a.id}
                className="sr-grain rounded-[28px] border border-border/50 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md group"
                data-testid={`card-author-${a.id}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 h-20 w-20 rounded-full bg-secondary/80 flex items-center justify-center border-4 border-background shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <Leaf className="h-8 w-8 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-1" data-testid={`text-author-name-${a.id}`}>
                    {a.name}
                  </h3>
                  <div className="text-sm font-medium text-primary uppercase tracking-[0.2em] mb-4" data-testid={`text-author-role-${a.id}`}>
                    {a.role}
                  </div>
                  <Separator className="w-12 mb-4 bg-primary/20" />
                  <p className="text-sm leading-relaxed text-muted-foreground italic px-4" data-testid={`text-author-specialty-${a.id}`}>
                    "{a.specialty}"
                  </p>
                  <Button
                    variant="ghost"
                    className="mt-6 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    data-testid={`button-view-author-${a.id}`}
                    onClick={() => {
                      setQuery(a.name);
                      const el = document.getElementById("stories");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    View Stories
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-20" id="highlights" data-testid="section-highlights">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
             <div className="order-2 md:order-1">
                <h2 className="font-serif text-4xl font-semibold tracking-tight mb-4" data-testid="text-highlights-title">
                  Highlights
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every season brings a new perspective to the ridgeline. These are the curated guides and field notes helping our community explore more intentionally.
                </p>
             </div>
             <div className="grid grid-cols-2 gap-4 order-1 md:order-2">
                <div className="aspect-square rounded-[32px] overflow-hidden border-8 border-background shadow-2xl -rotate-6 transition-transform duration-500 hover:rotate-0">
                   <img src={imgMossyTrail} className="h-full w-full object-cover" alt="Trail" />
                </div>
                <div className="aspect-square rounded-[32px] overflow-hidden border-8 border-background shadow-2xl rotate-6 transition-transform duration-500 hover:rotate-0 mt-8">
                   <img src={imgCampCoffee} className="h-full w-full object-cover" alt="Camp" />
                </div>
             </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3" data-testid="grid-highlights">
            {[
              {
                id: "h1",
                title: "Weekend Loop",
                desc: "A simple two-day route with one big view and an easy camp.",
                icon: Compass,
                color: "bg-blue-500/10 text-blue-500"
              },
              {
                id: "h2",
                title: "Gear Notes",
                desc: "What we’re actually carrying right now — updated monthly.",
                icon: Leaf,
                color: "bg-green-500/10 text-green-500"
              },
              {
                id: "h3",
                title: "Photo Studies",
                desc: "Light, weather, and composition — field lessons from the road.",
                icon: Sparkles,
                color: "bg-orange-500/10 text-orange-500"
              },
            ].map((h) => (
              <Card
                key={h.id}
                className="sr-grain rounded-[28px] border border-border/50 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md"
                data-testid={`card-highlight-${h.id}`}
              >
                <div className="flex flex-col gap-6">
                  <div className={cn("rounded-2xl p-4 w-fit", h.color)} data-testid={`icon-highlight-${h.id}`}>
                    <h.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold mb-2" data-testid={`text-highlight-title-${h.id}`}>
                      {h.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`text-highlight-desc-${h.id}`}>
                      {h.desc}
                    </p>
                  </div>
                  <Button variant="link" className="p-0 h-auto w-fit text-primary font-bold tracking-widest uppercase text-xs">
                    Learn More <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-20" id="subscribe" data-testid="section-subscribe">
          <div className="sr-grain relative overflow-hidden rounded-[40px] border border-border/50 bg-primary p-8 md:p-16 shadow-2xl">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
                <Badge className="rounded-full bg-white/20 text-white border-transparent backdrop-blur-md mb-6 px-4 py-1.5 uppercase tracking-widest text-xs">
                  Field Dispatch
                </Badge>
                <h3 className="font-serif text-4xl md:text-6xl font-semibold text-white leading-tight mb-6" data-testid="text-subscribe-title">
                  Get one great story a week.
                </h3>
                <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10" data-testid="text-subscribe-subtitle">
                  New essays, routes, and photo notes from the ridgeline. No noise, just the good stuff delivered when it's worth your time.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row max-w-lg">
                  <Input
                    placeholder="Email address"
                    className="h-14 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/50 px-6 text-lg"
                    data-testid="input-email"
                  />
                  <Button className="h-14 rounded-full px-10 text-lg bg-white text-primary hover:bg-white/90" data-testid="button-join">
                    Join Dispatch
                  </Button>
                </div>
                <p className="mt-6 text-white/50 text-sm" data-testid="text-subscribe-fineprint">
                  Join 12,000+ outdoor enthusiasts. Unsubscribe anytime.
                </p>
            </div>
          </div>
        </section>

        <footer className="mt-20 border-t border-border/30 pt-12" data-testid="footer-site">
          <div className="flex flex-col gap-12 sm:flex-row sm:justify-between mb-12">
            <div className="max-w-xs">
              <div className="font-serif text-2xl font-semibold mb-4" data-testid="text-footer-brand">
                Shiloh Rd Outdoor
              </div>
              <p className="text-muted-foreground leading-relaxed">
                A field journal dedicated to the quiet roads, wild mornings, and the stories that happen in between.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-12">
               <div className="flex flex-col gap-4">
                  <span className="font-bold text-xs uppercase tracking-widest text-foreground/50">Journal</span>
                  <Link href="#stories" className="text-sm hover:text-primary transition-colors">Stories</Link>
                  <Link href="#authors" className="text-sm hover:text-primary transition-colors">Authors</Link>
                  <Link href="#highlights" className="text-sm hover:text-primary transition-colors">Highlights</Link>
               </div>
               <div className="flex flex-col gap-4">
                  <span className="font-bold text-xs uppercase tracking-widest text-foreground/50">Connect</span>
                  <Link href="#subscribe" className="text-sm hover:text-primary transition-colors">Dispatch</Link>
                  <a href="#" className="text-sm hover:text-primary transition-colors">Instagram</a>
                  <a href="#" className="text-sm hover:text-primary transition-colors">Contact</a>
               </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 pt-8 border-t border-border/10 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-muted-foreground" data-testid="text-footer-copy">
              © {new Date().getFullYear()} Shiloh Rd Outdoor · All Rights Reserved · Built for slow travel.
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to top
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
}
