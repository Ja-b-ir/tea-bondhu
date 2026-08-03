"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Leaf, Globe, Menu, X, BookOpen, ChevronRight, Clock } from "lucide-react";

const LOGO_FULL_PLACEHOLDER = ""; // logo is embedded directly in app/page.tsx; nav below uses text fallback if not present

/* ---------------------------------------------------------
   Content — English / Bangla
--------------------------------------------------------- */
const T = {
  en: {
    nav: { about: "About", how: "How it works", diseases: "Diseases", team: "Team", blog: "Blog", login: "Log in", signup: "Sign up" },
    eyebrow: "From the blog",
    title: "Notes from the garden",
    sub: "Field notes, pest-spotting guides, and updates from the Tea বন্ধু project.",
    empty: "No posts yet — check back soon.",
    readMore: "Read more",
    loading: "Loading posts...",
  },
  bn: {
    nav: { about: "আমাদের সম্পর্কে", how: "কীভাবে কাজ করে", diseases: "রোগসমূহ", team: "টিম", blog: "ব্লগ", login: "লগ ইন", signup: "সাইন আপ" },
    eyebrow: "ব্লগ থেকে",
    title: "বাগানের নোট",
    sub: "ফিল্ড নোট, পোকা শনাক্তকরণ গাইড, এবং Tea বন্ধু প্রজেক্টের সর্বশেষ আপডেট।",
    empty: "এখনো কোনো পোস্ট নেই — শীঘ্রই দেখুন।",
    readMore: "আরও পড়ুন",
    loading: "পোস্ট লোড হচ্ছে...",
  },
};

export default function BlogListPage() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const t = T[lang];
  const isBn = lang === "bn";
  const bodyFont = isBn ? "'Hind Siliguri', sans-serif" : "'Inter', sans-serif";
  const displayFont = isBn ? "'Hind Siliguri', sans-serif" : "'Fraunces', serif";

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("blogs")
      .select("id, title, slug, content, tag, published_at")
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setPosts(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ fontFamily: bodyFont, background: "#F2F8ED", color: "#1F2E20", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .btn-lift { transition: transform .25s ease, box-shadow .25s ease; }
        .btn-lift:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(31,77,46,0.22); }
        .card-lift { transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease; }
        .card-lift:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(31,77,46,0.12); border-color: #8FBB6B; }
        @media (min-width: 768px) {
          [data-nav] { display: inline-block !important; color: #20361F; text-decoration: none; font-size: 14px; font-weight: 500; }
          .show-md { display: inline-block !important; }
          .show-md-btn { display: inline-flex !important; }
          header button:last-child { display: none !important; }
        }
        @media (max-width: 767px) { .blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* NAVBAR */}
      <header style={{ borderBottom: "1px solid #DCEBD0", background: "rgba(242,248,237,0.9)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#1F4D2E", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Leaf size={20} color="#8FBB6B" />
            </div>
            <span style={{ fontFamily: displayFont, fontWeight: 600, fontSize: 20, color: "#1F4D2E" }}>Tea বন্ধু</span>
          </Link>

          <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <Link href="/#about" data-nav style={{ display: "none" }}>{t.nav.about}</Link>
            <Link href="/#how" data-nav style={{ display: "none" }}>{t.nav.how}</Link>
            <Link href="/#diseases" data-nav style={{ display: "none" }}>{t.nav.diseases}</Link>
            <Link href="/#team" data-nav style={{ display: "none" }}>{t.nav.team}</Link>
            <Link href="/blog" data-nav style={{ display: "none", fontWeight: 700 }}>{t.nav.blog}</Link>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setLang(isBn ? "en" : "bn")}
              className="btn-lift"
              style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #DCEBD0", borderRadius: 999, padding: "7px 14px", fontSize: 13, fontWeight: 600, color: "#1F4D2E", cursor: "pointer" }}
            >
              <Globe size={14} /> {isBn ? "EN" : "বাং"}
            </button>
            <Link href="/login" className="show-md" style={{ display: "none", color: "#20361F", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>{t.nav.login}</Link>
            <Link
              href="/signup"
              className="btn-lift show-md-btn"
              style={{ background: "#1F4D2E", color: "#fff", padding: "9px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600, textDecoration: "none", display: "none" }}
            >
              {t.nav.signup}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "#1F4D2E" }}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ background: "#fff", borderTop: "1px solid #DCEBD0", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
            <Link href="/#about" onClick={() => setMenuOpen(false)} style={{ color: "#1F4D2E", textDecoration: "none", fontWeight: 500 }}>{t.nav.about}</Link>
            <Link href="/#how" onClick={() => setMenuOpen(false)} style={{ color: "#1F4D2E", textDecoration: "none", fontWeight: 500 }}>{t.nav.how}</Link>
            <Link href="/#diseases" onClick={() => setMenuOpen(false)} style={{ color: "#1F4D2E", textDecoration: "none", fontWeight: 500 }}>{t.nav.diseases}</Link>
            <Link href="/#team" onClick={() => setMenuOpen(false)} style={{ color: "#1F4D2E", textDecoration: "none", fontWeight: 500 }}>{t.nav.team}</Link>
            <Link href="/blog" onClick={() => setMenuOpen(false)} style={{ color: "#1F4D2E", textDecoration: "none", fontWeight: 700 }}>{t.nav.blog}</Link>
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <Link href="/login" style={{ flex: 1, textAlign: "center", padding: "10px", border: "1px solid #DCEBD0", borderRadius: 10, color: "#1F4D2E", textDecoration: "none", fontWeight: 600 }}>{t.nav.login}</Link>
              <Link href="/signup" style={{ flex: 1, textAlign: "center", padding: "10px", background: "#1F4D2E", borderRadius: 10, color: "#fff", textDecoration: "none", fontWeight: 600 }}>{t.nav.signup}</Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section style={{ padding: "56px 24px 40px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <span style={{ display: "inline-block", background: "#DCEBD0", color: "#2B5B34", fontSize: 13, fontWeight: 600, padding: "6px 14px", borderRadius: 999, marginBottom: 16 }}>
          {t.eyebrow}
        </span>
        <h1 style={{ fontFamily: displayFont, fontWeight: 600, fontSize: "clamp(30px, 5vw, 44px)", color: "#16331F", margin: "0 0 12px" }}>{t.title}</h1>
        <p style={{ fontSize: 16, color: "#5A6E58", margin: 0 }}>{t.sub}</p>
      </section>

      {/* POSTS GRID */}
      <section style={{ padding: "0 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
        {loading ? (
          <p style={{ textAlign: "center", color: "#8CA187" }}>{t.loading}</p>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", border: "1px dashed #C3DFAE", borderRadius: 20 }}>
            <BookOpen size={28} color="#8FBB6B" style={{ margin: "0 auto 12px" }} />
            <p style={{ color: "#5A6E58", margin: 0 }}>{t.empty}</p>
          </div>
        ) : (
          <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {posts.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
                <div className="card-lift" style={{ background: "#fff", border: "1px solid #DCEBD0", borderRadius: 18, padding: 24, height: "100%" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "#DCEBD0", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <BookOpen size={17} color="#4C7A3F" />
                  </div>
                  {p.tag && (
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#C69749", textTransform: "uppercase", letterSpacing: 0.4 }}>{p.tag}</span>
                  )}
                  <h4 style={{ fontFamily: displayFont, fontSize: 17, fontWeight: 600, color: "#16331F", margin: "8px 0 10px", lineHeight: 1.4 }}>{p.title}</h4>
                  <p style={{ fontSize: 13.5, color: "#5A6E58", margin: "0 0 14px", lineHeight: 1.6 }}>
                    {p.content.slice(0, 110)}{p.content.length > 110 ? "…" : ""}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12.5, color: "#8CA187", display: "flex", alignItems: "center", gap: 5 }}>
                      <Clock size={12} /> {new Date(p.published_at).toLocaleDateString()}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#1F4D2E", display: "flex", alignItems: "center", gap: 4 }}>
                      {t.readMore} <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#16331F", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
          <Leaf size={18} color="#8FBB6B" />
          <span style={{ fontFamily: displayFont, fontWeight: 600, fontSize: 17, color: "#F2F8ED" }}>Tea বন্ধু</span>
        </div>
        <p style={{ color: "#7E9A79", fontSize: 13, margin: 0 }}>
          <Link href="/" style={{ color: "#7E9A79", textDecoration: "none" }}>{isBn ? "হোমে ফিরে যান" : "Back to home"}</Link>
        </p>
      </footer>
    </div>
  );
}
