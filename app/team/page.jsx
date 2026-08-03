"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Leaf, Globe, Menu, X, User, Quote, GraduationCap, Briefcase,
} from "lucide-react";

const T = {
  en: {
    nav: { about: "About", how: "How it works", diseases: "Diseases", team: "Team", blog: "Blog", login: "Log in", signup: "Sign up" },
    eyebrow: "Who built this",
    title: "The team behind Tea বন্ধু",
    sub: "Click on anyone's card to read more about them.",
    close: "Close",
  },
  bn: {
    nav: { about: "আমাদের সম্পর্কে", how: "কীভাবে কাজ করে", diseases: "রোগসমূহ", team: "টিম", blog: "ব্লগ", login: "লগ ইন", signup: "সাইন আপ" },
    eyebrow: "যারা তৈরি করেছেন",
    title: "Tea বন্ধুর পেছনের টিম",
    sub: "কারো সম্পর্কে আরও জানতে তার কার্ডে ক্লিক করুন।",
    close: "বন্ধ করুন",
  },
};

/* ---------------------------------------------------------
   Team member data — edit freely, including photo URLs
   (leave photo blank to keep the placeholder avatar)
--------------------------------------------------------- */
const MEMBERS = [
  {
    id: "supervisor",
    photo: "",
    isSupervisor: true,
    en: {
      name: "Dr. Supervisor Name",
      designation: "Project Supervisor",
      university: "Department of Computer Science, University Name",
      bio: "Dr. Supervisor Name guided this project from its earliest planning stages through the final defense, providing direction on both the technical architecture and the research framing. Their feedback shaped how the team approached model evaluation and pushed for the rigor reflected in the final Smart Prediction layer.",
      speech: "What impressed me most about this project wasn't just the accuracy numbers — it was the team's willingness to admit when the model wasn't sure, and build for that honestly.",
    },
    bn: {
      name: "ড. সুপারভাইজারের নাম",
      designation: "প্রজেক্ট সুপারভাইজার",
      university: "কম্পিউটার সায়েন্স বিভাগ, বিশ্ববিদ্যালয়ের নাম",
      bio: "ড. সুপারভাইজারের নাম প্রজেক্টের প্রাথমিক পরিকল্পনা থেকে চূড়ান্ত ডিফেন্স পর্যন্ত পুরো যাত্রায় দিকনির্দেশনা দিয়েছেন, টেকনিক্যাল আর্কিটেকচার এবং গবেষণার কাঠামো উভয় ক্ষেত্রেই। তার মতামত দলকে মডেল মূল্যায়নের ক্ষেত্রে আরও কঠোর হতে সাহায্য করেছে।",
      speech: "এই প্রজেক্ট সম্পর্কে যা আমাকে সবচেয়ে বেশি মুগ্ধ করেছে তা শুধু অ্যাকুরেসির সংখ্যা নয় — বরং দলটি যখন মডেল নিশ্চিত না, তা স্বীকার করতে এবং সেভাবেই তৈরি করতে ইচ্ছুক ছিল।",
    },
  },
  {
    id: "jabir",
    photo: "",
    isSupervisor: false,
    en: {
      name: "Jabir Hossain",
      designation: "ML Engineering & Model Training",
      university: "Final-year CS Student, University Name",
      bio: "Jabir led the model development end to end — from the earliest PyTorch prototype through the final EfficientNetV2B0 pipeline. He designed the two-phase transfer learning approach, diagnosed the early preprocessing bug that was quietly capping accuracy, and built the Smart Prediction layer that handles visually-confusing cases.",
      speech: "The hardest part wasn't training the model — it was learning to trust it only as much as the data actually supported. That's really what Smart Prediction is about.",
    },
    bn: {
      name: "জাবির হোসেন",
      designation: "এমএল ইঞ্জিনিয়ারিং ও মডেল ট্রেনিং",
      university: "ফাইনাল ইয়ার সিএস শিক্ষার্থী, বিশ্ববিদ্যালয়ের নাম",
      bio: "জাবির শুরু থেকে শেষ পর্যন্ত মডেল ডেভেলপমেন্টের নেতৃত্ব দিয়েছেন — প্রাথমিক PyTorch প্রোটোটাইপ থেকে চূড়ান্ত EfficientNetV2B0 পাইপলাইন পর্যন্ত। তিনি দুই-ধাপের ট্রান্সফার লার্নিং পদ্ধতি ডিজাইন করেছেন এবং Smart Prediction লেয়ার তৈরি করেছেন।",
      speech: "মডেল ট্রেইন করাটা সবচেয়ে কঠিন অংশ ছিল না — কঠিন ছিল এটা শেখা যে ডেটা যতটুকু সমর্থন করে ততটুকুই এটিকে বিশ্বাস করা। Smart Prediction আসলে এই বিষয়েই।",
    },
  },
  {
    id: "risha",
    photo: "",
    isSupervisor: false,
    en: {
      name: "Risha",
      designation: "Frontend & Product Design",
      university: "Final-year CS Student, University Name",
      bio: "Risha shaped how Tea বন্ধু looks and feels — from the tea-garden visual language to the bilingual interface that makes the platform usable for Bangla-speaking farmers and English-speaking reviewers alike. She focused heavily on making the dashboard's scan results legible at a glance.",
      speech: "We didn't want this to look like a typical student project demo. Farmers using this deserve something that feels considered, not just functional.",
    },
    bn: {
      name: "রিশা",
      designation: "ফ্রন্টএন্ড ও প্রোডাক্ট ডিজাইন",
      university: "ফাইনাল ইয়ার সিএস শিক্ষার্থী, বিশ্ববিদ্যালয়ের নাম",
      bio: "রিশা Tea বন্ধুর চেহারা ও অনুভূতি তৈরি করেছেন — চা বাগানের ভিজ্যুয়াল ভাষা থেকে শুরু করে দ্বিভাষিক ইন্টারফেস পর্যন্ত, যা বাংলাভাষী কৃষক এবং ইংরেজিভাষী রিভিউয়ার উভয়ের জন্যই প্ল্যাটফর্মটি ব্যবহারযোগ্য করে তোলে।",
      speech: "আমরা চাইনি এটি একটি সাধারণ স্টুডেন্ট প্রজেক্ট ডেমোর মতো দেখাক। যেসব কৃষক এটি ব্যবহার করবেন তারা এমন কিছু পাওয়ার যোগ্য যা যত্ন নিয়ে তৈরি, শুধু কার্যকরী নয়।",
    },
  },
  {
    id: "sara",
    photo: "",
    isSupervisor: false,
    en: {
      name: "Sara",
      designation: "Research & Documentation",
      university: "Final-year CS Student, University Name",
      bio: "Sara led the research grounding for the project — reviewing the agricultural literature on tea leaf diseases, structuring the thesis chapters, and making sure the technical claims in the defense were backed by evidence, not just intuition.",
      speech: "A model that performs well in a notebook and a model that's actually trustworthy in the field are two different things. My job was making sure we were honest about that gap.",
    },
    bn: {
      name: "সারা",
      designation: "রিসার্চ ও ডকুমেন্টেশন",
      university: "ফাইনাল ইয়ার সিএস শিক্ষার্থী, বিশ্ববিদ্যালয়ের নাম",
      bio: "সারা প্রজেক্টের গবেষণার ভিত্তি তৈরিতে নেতৃত্ব দিয়েছেন — চা পাতার রোগ সম্পর্কিত কৃষি সাহিত্য পর্যালোচনা করে, থিসিস অধ্যায়গুলো গুছিয়ে, এবং ডিফেন্সে টেকনিক্যাল দাবিগুলো প্রমাণ দ্বারা সমর্থিত তা নিশ্চিত করে।",
      speech: "নোটবুকে ভালো পারফর্ম করা মডেল আর মাঠে সত্যিকার অর্থে বিশ্বাসযোগ্য মডেল — এই দুটো আলাদা জিনিস। আমার কাজ ছিল আমরা যেন এই পার্থক্য সম্পর্কে সৎ থাকি তা নিশ্চিত করা।",
    },
  },
];

export default function TeamPage() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const t = T[lang];
  const isBn = lang === "bn";
  const bodyFont = isBn ? "'Hind Siliguri', sans-serif" : "'Inter', sans-serif";
  const displayFont = isBn ? "'Hind Siliguri', sans-serif" : "'Fraunces', serif";

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const navHref = (key) => {
    if (key === "about") return "/about";
    if (key === "blog") return "/blog";
    if (key === "team") return "/team";
    return `/#${key}`;
  };

  return (
    <div style={{ fontFamily: bodyFont, background: "#F2F8ED", color: "#1F2E20", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .btn-lift { transition: transform .25s ease, box-shadow .25s ease; }
        .btn-lift:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(31,77,46,0.22); }
        .team-card { transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease; cursor: pointer; }
        .team-card:hover { transform: translateY(-5px); box-shadow: 0 16px 32px rgba(31,77,46,0.14); border-color: #8FBB6B; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .modal-overlay { animation: fadeIn .2s ease; }
        .modal-card { animation: slideUp .25s ease; }
        @media (min-width: 768px) {
          [data-nav] { display: inline-block !important; color: #20361F; text-decoration: none; font-size: 14px; font-weight: 500; }
          .show-md { display: inline-block !important; }
          .show-md-btn { display: inline-flex !important; }
          header button:last-child { display: none !important; }
        }
        @media (max-width: 640px) { .team-grid { grid-template-columns: repeat(2, 1fr) !important; } }
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
            <Link href="/about" data-nav style={{ display: "none" }}>{t.nav.about}</Link>
            <Link href="/#how" data-nav style={{ display: "none" }}>{t.nav.how}</Link>
            <Link href="/#diseases" data-nav style={{ display: "none" }}>{t.nav.diseases}</Link>
            <Link href="/team" data-nav style={{ display: "none", fontWeight: 700 }}>{t.nav.team}</Link>
            <Link href="/blog" data-nav style={{ display: "none" }}>{t.nav.blog}</Link>
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
            <Link href="/about" onClick={() => setMenuOpen(false)} style={{ color: "#1F4D2E", textDecoration: "none", fontWeight: 500 }}>{t.nav.about}</Link>
            <Link href="/#how" onClick={() => setMenuOpen(false)} style={{ color: "#1F4D2E", textDecoration: "none", fontWeight: 500 }}>{t.nav.how}</Link>
            <Link href="/#diseases" onClick={() => setMenuOpen(false)} style={{ color: "#1F4D2E", textDecoration: "none", fontWeight: 500 }}>{t.nav.diseases}</Link>
            <Link href="/team" onClick={() => setMenuOpen(false)} style={{ color: "#1F4D2E", textDecoration: "none", fontWeight: 700 }}>{t.nav.team}</Link>
            <Link href="/blog" onClick={() => setMenuOpen(false)} style={{ color: "#1F4D2E", textDecoration: "none", fontWeight: 500 }}>{t.nav.blog}</Link>
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <Link href="/login" style={{ flex: 1, textAlign: "center", padding: "10px", border: "1px solid #DCEBD0", borderRadius: 10, color: "#1F4D2E", textDecoration: "none", fontWeight: 600 }}>{t.nav.login}</Link>
              <Link href="/signup" style={{ flex: 1, textAlign: "center", padding: "10px", background: "#1F4D2E", borderRadius: 10, color: "#fff", textDecoration: "none", fontWeight: 600 }}>{t.nav.signup}</Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section style={{ padding: "56px 24px 20px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <span style={{ display: "inline-block", background: "#DCEBD0", color: "#2B5B34", fontSize: 13, fontWeight: 600, padding: "6px 14px", borderRadius: 999, marginBottom: 16 }}>
          {t.eyebrow}
        </span>
        <h1 style={{ fontFamily: displayFont, fontWeight: 600, fontSize: "clamp(28px, 4.5vw, 42px)", color: "#16331F", margin: "0 0 12px" }}>{t.title}</h1>
        <p style={{ fontSize: 15.5, color: "#5A6E58", margin: 0 }}>{t.sub}</p>
      </section>

      {/* CARDS GRID */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 80px" }}>
        <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {MEMBERS.map((m) => {
            const c = m[lang];
            return (
              <div
                key={m.id}
                className="team-card"
                onClick={() => setSelected(m)}
                style={{ background: "#fff", border: "1px solid #DCEBD0", borderRadius: 18, overflow: "hidden" }}
              >
                <div
                  style={{
                    aspectRatio: "1 / 1", width: "100%",
                    background: m.isSupervisor ? "#C69749" : "#1F4D2E",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    backgroundImage: m.photo ? `url(${m.photo})` : "none",
                    backgroundSize: "cover", backgroundPosition: "center",
                  }}
                >
                  {!m.photo && <User size={48} color={m.isSupervisor ? "#1F4D2E" : "#8FBB6B"} />}
                </div>
                <div style={{ padding: "16px 14px" }}>
                  <h3 style={{ fontFamily: displayFont, fontSize: 16, fontWeight: 600, color: "#16331F", margin: "0 0 4px" }}>{c.name}</h3>
                  <p style={{ fontSize: 12.5, color: "#4C7A3F", fontWeight: 600, margin: "0 0 6px" }}>{c.designation}</p>
                  <p style={{ fontSize: 11.5, color: "#8CA187", margin: 0, lineHeight: 1.4 }}>{c.university}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MODAL */}
      {selected && (
        <div
          className="modal-overlay"
          onClick={() => setSelected(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(22,51,31,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: 22, maxWidth: 520, width: "100%", maxHeight: "85vh", overflowY: "auto", position: "relative" }}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label={t.close}
              style={{ position: "absolute", top: 16, right: 16, background: "#F2F8ED", border: "none", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#1F4D2E" }}
            >
              <X size={18} />
            </button>

            <div
              style={{
                aspectRatio: "16 / 9", width: "100%",
                background: selected.isSupervisor ? "#C69749" : "#1F4D2E",
                display: "flex", alignItems: "center", justifyContent: "center",
                backgroundImage: selected.photo ? `url(${selected.photo})` : "none",
                backgroundSize: "cover", backgroundPosition: "center",
                borderRadius: "22px 22px 0 0",
              }}
            >
              {!selected.photo && <User size={56} color={selected.isSupervisor ? "#1F4D2E" : "#8FBB6B"} />}
            </div>

            <div style={{ padding: "26px 28px 32px" }}>
              <h2 style={{ fontFamily: displayFont, fontSize: 24, fontWeight: 600, color: "#16331F", margin: "0 0 6px" }}>
                {selected[lang].name}
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", marginBottom: 18 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#4C7A3F", fontWeight: 600 }}>
                  <Briefcase size={14} /> {selected[lang].designation}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#8CA187" }}>
                  <GraduationCap size={14} /> {selected[lang].university}
                </span>
              </div>

              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#2A3D2A", margin: "0 0 22px" }}>
                {selected[lang].bio}
              </p>

              <div style={{ background: "#F2F8ED", borderRadius: 14, padding: "18px 20px", position: "relative" }}>
                <Quote size={20} color="#C3DFAE" style={{ marginBottom: 6 }} />
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#20361F", fontStyle: "italic", margin: 0 }}>
                  “{selected[lang].speech}”
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
