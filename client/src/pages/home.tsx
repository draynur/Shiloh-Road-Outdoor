import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bookmark,
  Compass,
  Leaf,
  MapPinned,
  Search,
  Sparkles,
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

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6">
        <section
          className="sr-grain relative overflow-hidden rounded-[28px] border bg-card shadow-[var(--shadow-lg)]"
          data-testid="section-hero"
        >
          <div className="absolute inset-0">
            <img
              src={heroRidgeRoad}
              alt="Foggy ridge road at dawn"
              className="h-full w-full object-cover"
              data-testid="img-hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/55 to-background/5" />
          </div>

          <div className="relative grid gap-6 px-6 py-10 md:grid-cols-[1.3fr_.9fr] md:gap-10 md:px-10 md:py-14">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-sm shadow-[var(--shadow-xs)]">
                <Compass className="h-4 w-4 text-foreground/80" aria-hidden="true" />
                <span className="text-foreground/80" data-testid="text-hero-kicker">
                  Recent stories by prominent authors
                </span>
              </div>

              <h1
                className="mt-4 font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-6xl"
                data-testid="text-hero-title"
              >
                A field journal for quiet roads and wild mornings.
              </h1>

              <p
                className="mt-4 max-w-xl text-base leading-relaxed text-foreground/75 md:text-lg"
                data-testid="text-hero-subtitle"
              >
                Shiloh Rd Outdoor highlights the best new writing across hikes, camps, rivers, and
                small towns — with photos, routes, and notes you can steal for your next weekend.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative w-full sm:max-w-sm">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search stories, authors, locations…"
                    className="h-11 rounded-full pl-10"
                    data-testid="input-search"
                  />
                </div>
                <Button
                  variant="secondary"
                  className="h-11 rounded-full"
                  data-testid="button-clear-filters"
                  onClick={() => {
                    setQuery("");
                    setActiveTag(null);
                  }}
                >
                  Clear
                </Button>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2" data-testid="list-tags">
                <Badge
                  className={cn(
                    "cursor-pointer rounded-full border bg-background/70 px-3 py-1 text-foreground/80 hover:bg-background",
                    !activeTag && "bg-foreground text-background hover:bg-foreground",
                  )}
                  data-testid="badge-tag-all"
                  onClick={() => setActiveTag(null)}
                >
                  All
                </Badge>
                {allTags.slice(0, 6).map((t) => (
                  <Badge
                    key={t}
                    className={cn(
                      "cursor-pointer rounded-full border bg-background/70 px-3 py-1 text-foreground/80 hover:bg-background",
                      activeTag === t && "bg-foreground text-background hover:bg-foreground",
                    )}
                    data-testid={`badge-tag-${t.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() => setActiveTag(activeTag === t ? null : t)}
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="rounded-[22px] border bg-background/70 p-4 shadow-[var(--shadow-sm)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div
                      className="text-xs uppercase tracking-wide text-muted-foreground"
                      data-testid="text-featured-label"
                    >
                      Featured
                    </div>
                    <div className="mt-1 font-serif text-xl font-semibold" data-testid="text-featured-title">
                      {featured[0]?.title}
                    </div>
                    <div className="mt-2 text-sm leading-relaxed text-foreground/70" data-testid="text-featured-excerpt">
                      {featured[0]?.excerpt}
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    className="shrink-0 rounded-full"
                    data-testid="button-bookmark-featured"
                    onClick={() => {
                      // mock interaction
                    }}
                  >
                    <Bookmark className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="grid gap-3">
                  {featured.slice(1, 2).map((s) => {
                    const a = AUTHORS.find((x) => x.id === s.authorId);
                    return (
                      <div
                        key={s.id}
                        className="flex items-center justify-between gap-3 rounded-[16px] border bg-card p-3 hover-elevate"
                        data-testid={`row-featured-${s.id}`}
                      >
                        <div className="min-w-0">
                          <div className="truncate font-medium" data-testid={`text-featured-title-${s.id}`}>
                            {s.title}
                          </div>
                          <div className="mt-0.5 text-xs text-muted-foreground" data-testid={`text-featured-meta-${s.id}`}>
                            {a?.name} · {s.location}
                          </div>
                        </div>
                        <Button
                          size="icon"
                          className="rounded-full"
                          data-testid={`button-open-featured-${s.id}`}
                          onClick={() => {
                            const el = document.getElementById("stories");
                            el?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

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

          <div className="mt-5 grid gap-4 md:grid-cols-2" data-testid="grid-stories">
            {results.map((s) => {
              const a = AUTHORS.find((x) => x.id === s.authorId);
              return (
                <Card
                  key={s.id}
                  className="sr-grain group overflow-hidden rounded-[22px] border bg-card shadow-[var(--shadow-sm)] transition-transform duration-300 hover:-translate-y-0.5"
                  data-testid={`card-story-${s.id}`}
                >
                  <div className="grid md:grid-cols-[180px_1fr]">
                    <div className="relative h-44 w-full md:h-full">
                      <img
                        src={imageFor(s.imageKey)}
                        alt="Story feature"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        data-testid={`img-story-${s.id}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                      {s.featured ? (
                        <div className="absolute left-3 top-3">
                          <Badge className="rounded-full" data-testid={`badge-featured-${s.id}`}>
                            Featured
                          </Badge>
                        </div>
                      ) : null}
                    </div>

                    <div className="p-5">
                      <div
                        className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
                        data-testid={`text-story-meta-${s.id}`}
                      >
                        <span>{formatShortDate(s.dateISO)}</span>
                        <span aria-hidden="true">·</span>
                        <span>{s.readTimeMinutes} min</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPinned className="h-3.5 w-3.5" aria-hidden="true" />
                          <span data-testid={`text-story-location-${s.id}`}>{s.location}</span>
                        </span>
                      </div>

                      <div
                        className="mt-2 font-serif text-xl font-semibold leading-snug"
                        data-testid={`text-story-title-${s.id}`}
                      >
                        {s.title}
                      </div>

                      <p
                        className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/70"
                        data-testid={`text-story-excerpt-${s.id}`}
                      >
                        {s.excerpt}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2" data-testid={`list-story-tags-${s.id}`}>
                          {s.tags.slice(0, 3).map((t) => (
                            <Badge
                              key={t}
                              variant="secondary"
                              className="rounded-full bg-secondary/70"
                              data-testid={`badge-story-${s.id}-${t.replace(/\s+/g, "-").toLowerCase()}`}
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground" data-testid={`text-story-author-${s.id}`}>
                          {a?.name}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <Button
                          className="rounded-full"
                          data-testid={`button-read-${s.id}`}
                          onClick={() => {
                            // mock interaction
                          }}
                        >
                          Read story
                          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="rounded-full"
                          data-testid={`button-bookmark-${s.id}`}
                          onClick={() => {
                            // mock interaction
                          }}
                        >
                          <Bookmark className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mt-12" id="authors" data-testid="section-authors">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight" data-testid="text-authors-title">
                Prominent authors
              </h2>
              <p className="mt-1 text-sm text-muted-foreground" data-testid="text-authors-subtitle">
                Writers and photographers shaping the Shiloh Rd voice.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3" data-testid="grid-authors">
            {AUTHORS.map((a) => (
              <Card
                key={a.id}
                className="sr-grain rounded-[22px] border bg-card p-5 shadow-[var(--shadow-sm)]"
                data-testid={`card-author-${a.id}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-serif text-xl font-semibold" data-testid={`text-author-name-${a.id}`}>
                      {a.name}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground" data-testid={`text-author-role-${a.id}`}>
                      {a.role}
                    </div>
                  </div>
                  <div className="rounded-full border bg-secondary/60 p-2" data-testid={`icon-author-${a.id}`}>
                    <Leaf className="h-4 w-4 text-foreground/70" aria-hidden="true" />
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="text-sm leading-relaxed text-foreground/75" data-testid={`text-author-specialty-${a.id}`}>
                  {a.specialty}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-secondary/70"
                    data-testid={`badge-author-${a.id}`}
                  >
                    contributor
                  </Badge>
                  <Button
                    variant="ghost"
                    className="rounded-full"
                    data-testid={`button-view-author-${a.id}`}
                    onClick={() => {
                      setQuery(a.name);
                      const el = document.getElementById("stories");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    View stories
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12" id="highlights" data-testid="section-highlights">
          <div>
            <h2 className="font-serif text-3xl font-semibold tracking-tight" data-testid="text-highlights-title">
              Highlights
            </h2>
            <p className="mt-1 text-sm text-muted-foreground" data-testid="text-highlights-subtitle">
              A few quick picks to plan your next loop.
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3" data-testid="grid-highlights">
            {[
              {
                id: "h1",
                title: "Weekend Loop",
                desc: "A simple two-day route with one big view and an easy camp.",
                icon: Compass,
              },
              {
                id: "h2",
                title: "Gear Notes",
                desc: "What we’re actually carrying right now — updated monthly.",
                icon: Leaf,
              },
              {
                id: "h3",
                title: "Photo Studies",
                desc: "Light, weather, and composition — field lessons from the road.",
                icon: Sparkles,
              },
            ].map((h) => (
              <Card
                key={h.id}
                className="sr-grain rounded-[22px] border bg-card p-5 shadow-[var(--shadow-sm)]"
                data-testid={`card-highlight-${h.id}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="rounded-[14px] border bg-secondary/70 p-3"
                    data-testid={`icon-highlight-${h.id}`}
                  >
                    <h.icon className="h-5 w-5 text-foreground/70" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-serif text-xl font-semibold" data-testid={`text-highlight-title-${h.id}`}>
                      {h.title}
                    </div>
                    <div className="mt-1 text-sm leading-relaxed text-foreground/70" data-testid={`text-highlight-desc-${h.id}`}>
                      {h.desc}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12" id="subscribe" data-testid="section-subscribe">
          <div className="sr-grain overflow-hidden rounded-[26px] border bg-card shadow-[var(--shadow-md)]">
            <div className="grid gap-0 md:grid-cols-[1.2fr_.8fr]">
              <div className="p-7 md:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border bg-secondary/60 px-3 py-1 text-xs uppercase tracking-wide text-foreground/70">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Field dispatch
                </div>
                <h3
                  className="mt-4 font-serif text-3xl font-semibold leading-tight"
                  data-testid="text-subscribe-title"
                >
                  Get one great story a week.
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed text-foreground/70"
                  data-testid="text-subscribe-subtitle"
                >
                  New essays, routes, and photo notes — delivered when they’re worth your time.
                </p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Input
                    placeholder="Email address"
                    className="h-11 rounded-full"
                    data-testid="input-email"
                  />
                  <Button className="h-11 rounded-full" data-testid="button-join">
                    Join
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>

                <p className="mt-3 text-xs text-muted-foreground" data-testid="text-subscribe-fineprint">
                  No spam. Just the good stuff.
                </p>
              </div>

              <div className="relative min-h-[220px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)/0.20)] via-transparent to-[hsl(var(--accent)/0.22)]" />
                <div className="absolute inset-0 p-7 md:p-10">
                  <div className="rounded-[22px] border bg-background/70 p-5 shadow-[var(--shadow-sm)]">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground" data-testid="text-spotlight-label">
                      Spotlight
                    </div>
                    <div className="mt-1 font-serif text-xl font-semibold" data-testid="text-spotlight-title">
                      Editor’s picks
                    </div>
                    <div className="mt-3 space-y-3" data-testid="list-spotlight">
                      {STORIES.slice(0, 3).map((s) => (
                        <div
                          key={s.id}
                          className="flex items-center justify-between gap-3 rounded-[16px] border bg-card p-3 hover-elevate"
                          data-testid={`row-spotlight-${s.id}`}
                        >
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium" data-testid={`text-spotlight-story-${s.id}`}>
                              {s.title}
                            </div>
                            <div className="mt-0.5 text-xs text-muted-foreground" data-testid={`text-spotlight-meta-${s.id}`}>
                              {formatShortDate(s.dateISO)} · {s.readTimeMinutes} min
                            </div>
                          </div>
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full"
                            data-testid={`button-spotlight-${s.id}`}
                            onClick={() => {
                              const el = document.getElementById("stories");
                              el?.scrollIntoView({ behavior: "smooth" });
                            }}
                          >
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-[22px] border bg-background/70 px-4 py-3 text-sm shadow-[var(--shadow-xs)]">
                    <div className="inline-flex items-center gap-2 text-foreground/75" data-testid="text-footer-note">
                      <Compass className="h-4 w-4" aria-hidden="true" />
                      Built for slow travel.
                    </div>
                    <Button
                      variant="ghost"
                      className="rounded-full"
                      data-testid="button-back-top"
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                      Back to top
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-10 border-t pt-8" data-testid="footer-site">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-serif text-lg font-semibold" data-testid="text-footer-brand">
                Shiloh Rd Outdoor
              </div>
              <div className="mt-1 text-sm text-muted-foreground" data-testid="text-footer-copy">
                © {new Date().getFullYear()} — Trails, campfires, and field notes.
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2" data-testid="list-footer-links">
              <Button
                variant="outline"
                className="rounded-full"
                data-testid="button-footer-about"
                onClick={() => {
                  const el = document.getElementById("authors");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                About
              </Button>
              <Button
                variant="outline"
                className="rounded-full"
                data-testid="button-footer-contact"
                onClick={() => {
                  const el = document.getElementById("subscribe");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact
              </Button>
              <Button
                className="rounded-full"
                data-testid="button-footer-explore"
                onClick={() => {
                  const el = document.getElementById("stories");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
