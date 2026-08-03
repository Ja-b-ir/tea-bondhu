"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Leaf, Globe, Menu, X, Target, Cpu, Sprout, Users, ArrowRight, CheckCircle2,
} from "lucide-react";

const T = {
  en: {
    nav: { about: "About", how: "How it works", diseases: "Diseases", team: "Team", blog: "Blog", login: "Log in", signup: "Sign up" },
    eyebrow: "About the platform",
    title: "Why we built Tea বন্ধু",
    sub: "A closer look at the problem, the model behind it, and what we're hoping it becomes.",
    s1: {
      icon: "target",
      title: "The problem",
      body: "Tea leaf disease is often caught late — by the time discoloration or spotting is obvious to the eye, it has usually already spread across several plants in a row. Smallholders and garden workers rarely have access to a plant pathologist on demand, and by the time a sample reaches an expert, days have passed. Tea বন্ধু exists to close that gap: a phone camera and a few seconds, instead of a wait.",
    },
    s2: {
      icon: "cpu",
      title: "How it actually works",
      body: "At the core is an EfficientNetV2B0 model, fine-tuned in two phases on tea leaf imagery. Rather than training from scratch, we started from weights already trained on millions of general images, then adapted them specifically to tea leaves — first with the base layers frozen, then with careful fine-tuning across the full network.",
      points: [
        "Two-phase transfer learning on EfficientNetV2B0",
        "Trained on 18,000+ labelled leaf images from a public Mendeley dataset",
        "Class weighting to handle naturally imbalanced disease categories",
        "A custom Smart Prediction layer that flags uncertain, visually-similar cases instead of guessing",
      ],
    },
    s3: {
      icon: "sprout",
      title: "Why 'Smart Prediction' matters",
      body: "Three conditions — Red Spider, Thrips, and Helopeltis damage — can look remarkably similar in a photo, even to a trained eye. Instead of forcing a confident answer every time, our Delta-Gap Threshold logic checks how close the top two predictions are. When they're too close to call, the system says so, rather than pretending certainty it doesn't have. We think that honesty matters more than a clean-looking result.",
    },
    s4: {
      icon: "users",
      title: "Who this is for",
      body: "Tea বন্ধু was built as a final-year computer science project, but with a real audience in mind: smallholder tea farmers, garden supervisors, and field workers who need a fast first opinion before deciding whether a plant needs closer attention.",
    },
    cta: "Try a scan yourself",
    backHome: "Back to home",
  },
  bn: {
    nav: { about: "আমাদের সম্পর্কে", how: "কীভাবে কাজ করে", diseases: "রোগসমূহ", team: "টিম", blog: "ব্লগ", login: "লগ ইন", signup: "সাইন আপ" },
    eyebrow: "প্ল্যাটফর্ম সম্পর্কে",
    title: "কেন আমরা Tea বন্ধু তৈরি করলাম",
    sub: "সমস্যা, এর পেছনের মডেল, এবং আমরা এটি নিয়ে কী আশা করি — তার একটি ঘনিষ্ঠ পর্যালোচনা।",
    s1: {
      icon: "target",
      title: "সমস্যা",
      body: "চা পাতার রোগ প্রায়ই দেরিতে ধরা পড়ে — চোখে স্পষ্ট বিবর্ণতা বা দাগ দেখা দেওয়ার আগেই এটি সাধারণত একটি সারির একাধিক গাছে ছড়িয়ে পড়ে। ছোট চাষি ও বাগান কর্মীদের হাতের কাছে সবসময় একজন উদ্ভিদ রোগ বিশেষজ্ঞ থাকেন না, এবং নমুনা বিশেষজ্ঞের কাছে পৌঁছাতে পৌঁছাতে বেশ কয়েক দিন পার হয়ে যায়। Tea বন্ধু ঠিক এই ফাঁকটাই পূরণ করতে চায় — একটি ফোন ক্যামেরা আর কয়েক সেকেন্ড, অপেক্ষার বদলে।",
    },
    s2: {
      icon: "cpu",
      title: "এটি আসলে কীভাবে কাজ করে",
      body: "এর মূলে রয়েছে একটি EfficientNetV2B0 মডেল, যা চা পাতার ছবিতে দুই ধাপে ফাইন-টিউন করা হয়েছে। শূন্য থেকে ট্রেইন করার বদলে, আমরা শুরু করেছি এমন ওয়েট দিয়ে যা ইতিমধ্যে লক্ষ লক্ষ সাধারণ ছবিতে ট্রেইন করা — তারপর সেগুলো নির্দিষ্টভাবে চা পাতার জন্য অভিযোজিত করা হয়েছে।",
      points: [
        "EfficientNetV2B0-তে দুই-ধাপে ট্রান্সফার লার্নিং",
        "পাবলিক Mendeley ডেটাসেট থেকে ১৮,০০০+ লেবেলযুক্ত পাতার ছবিতে ট্রেইন করা",
        "স্বাভাবিকভাবে অসম রোগ ক্যাটাগরি সামলাতে ক্লাস ওয়েটিং",
        "একটি কাস্টম Smart Prediction লেয়ার, যা আন্দাজ না করে অনিশ্চিত, একইরকম দেখতে কেসগুলো চিহ্নিত করে",
      ],
    },
    s3: {
      icon: "sprout",
      title: "কেন 'Smart Prediction' গুরুত্বপূর্ণ",
      body: "Red Spider, Thrips, এবং Helopeltis-এর ক্ষতি — এই তিনটি অবস্থা ছবিতে বিস্ময়করভাবে একইরকম দেখাতে পারে, এমনকি প্রশিক্ষিত চোখেও। প্রতিবার জোর করে একটি নিশ্চিত উত্তর দেওয়ার বদলে, আমাদের Delta-Gap থ্রেশহোল্ড লজিক পরীক্ষা করে দেখে শীর্ষ দুটি প্রেডিকশন কতটা কাছাকাছি। যখন সেগুলো খুব কাছাকাছি থাকে, সিস্টেম তা জানিয়ে দেয়, মিথ্যা নিশ্চয়তার ভান না করে।",
    },
    s4: {
      icon: "users",
      title: "এটি কাদের জন্য",
      body: "Tea বন্ধু তৈরি হয়েছে একটি ফাইনাল ইয়ার কম্পিউটার সায়েন্স প্রজেক্ট হিসেবে, কিন্তু একটি বাস্তব দর্শক গোষ্ঠীর কথা মাথায় রেখে — ছোট চা চাষি, বাগান সুপারভাইজার, এবং ফিল্ড কর্মী, যাদের একটি গাছের প্রতি ঘনিষ্ঠ মনোযোগ প্রয়োজন কিনা তা সিদ্ধান্ত নেওয়ার আগে একটি দ্রুত প্রাথমিক মতামত দরকার।",
    },
    cta: "নিজে একটি স্ক্যান করে দেখুন",
    backHome: "হোমে ফিরে যান",
  },
};

const sectionIcon = (key) => {
  if (key === "target") return <Target size={22} />;
  if (key === "cpu") return <Cpu size={22} />;
  if (key === "sprout") return <Sprout size={22} />;
  return <Users size={22} />;
};

export default function AboutPage() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = T[lang];
  const isBn = lang === "bn";
  const bodyFont = isBn ? "'Hind Siliguri', sans-serif" : "'Inter', sans-serif";
  const displayFont = isBn ? "'Hind Siliguri', sans-serif" : "'Fraunces', serif";

  const sections = [t.s1, t.s2, t.s3, t.s4];

  return (
    <div style={{ fontFamily: bodyFont, background: "#F2F8ED", color: "#1F2E20", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .btn-lift { transition: transform .25s ease, box-shadow .25s ease; }
        .btn-lift:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(31,77,46,0.22); }
        @media (min-width: 768px) {
          [data-nav] { display: inline-block !important; color: #20361F; text-decoration: none; font-size: 14px; font-weight: 500; }
          .show-md { display: inline-block !important; }
          .show-md-btn { display: inline-flex !important; }
          header button:last-child { display: none !important; }
        }
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
            <Link href="/about" data-nav style={{ display: "none", fontWeight: 700 }}>{t.nav.about}</Link>
            <Link href="/#how" data-nav style={{ display: "none" }}>{t.nav.how}</Link>
            <Link href="/#diseases" data-nav style={{ display: "none" }}>{t.nav.diseases}</Link>
            <Link href="/#team" data-nav style={{ display: "none" }}>{t.nav.team}</Link>
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
            <Link href="/about" onClick={() => setMenuOpen(false)} style={{ color: "#1F4D2E", textDecoration: "none", fontWeight: 700 }}>{t.nav.about}</Link>
            <Link href="/#how" onClick={() => setMenuOpen(false)} style={{ color: "#1F4D2E", textDecoration: "none", fontWeight: 500 }}>{t.nav.how}</Link>
            <Link href="/#diseases" onClick={() => setMenuOpen(false)} style={{ color: "#1F4D2E", textDecoration: "none", fontWeight: 500 }}>{t.nav.diseases}</Link>
            <Link href="/#team" onClick={() => setMenuOpen(false)} style={{ color: "#1F4D2E", textDecoration: "none", fontWeight: 500 }}>{t.nav.team}</Link>
            <Link href="/blog" onClick={() => setMenuOpen(false)} style={{ color: "#1F4D2E", textDecoration: "none", fontWeight: 500 }}>{t.nav.blog}</Link>
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <Link href="/login" style={{ flex: 1, textAlign: "center", padding: "10px", border: "1px solid #DCEBD0", borderRadius: 10, color: "#1F4D2E", textDecoration: "none", fontWeight: 600 }}>{t.nav.login}</Link>
              <Link href="/signup" style={{ flex: 1, textAlign: "center", padding: "10px", background: "#1F4D2E", borderRadius: 10, color: "#fff", textDecoration: "none", fontWeight: 600 }}>{t.nav.signup}</Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section style={{ padding: "60px 24px 20px", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <span style={{ display: "inline-block", background: "#DCEBD0", color: "#2B5B34", fontSize: 13, fontWeight: 600, padding: "6px 14px", borderRadius: 999, marginBottom: 18 }}>
          {t.eyebrow}
        </span>
        <h1 style={{ fontFamily: displayFont, fontWeight: 600, fontSize: "clamp(30px, 5vw, 46px)", color: "#16331F", margin: "0 0 14px", lineHeight: 1.15 }}>
          {t.title}
        </h1>
        <p style={{ fontSize: 16.5, color: "#5A6E58", margin: 0, lineHeight: 1.6 }}>{t.sub}</p>
      </section>

      {/* ARTICLE BODY */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 60px" }}>
        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 44 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#1F4D2E", color: "#8FBB6B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {sectionIcon(s.icon)}
              </div>
              <h2 style={{ fontFamily: displayFont, fontSize: 22, fontWeight: 600, color: "#16331F", margin: 0 }}>{s.title}</h2>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#2A3D2A", margin: s.points ? "0 0 16px" : 0 }}>{s.body}</p>
            {s.points && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {s.points.map((p, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#fff", border: "1px solid #DCEBD0", padding: "12px 16px", borderRadius: 12 }}>
                    <CheckCircle2 size={18} color="#4C7A3F" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 14.5, color: "#20361F" }}>{p}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: 56, paddingTop: 40, borderTop: "1px solid #DCEBD0" }}>
          <Link
            href="/signup"
            className="btn-lift"
            style={{ background: "#1F4D2E", color: "#fff", padding: "13px 28px", borderRadius: 999, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            {t.cta} <ArrowRight size={16} />
          </Link>
          <div style={{ marginTop: 16 }}>
            <Link href="/" style={{ color: "#4C7A3F", fontSize: 14, textDecoration: "none", fontWeight: 600 }}>{t.backHome}</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#16331F", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Leaf size={18} color="#8FBB6B" />
          <span style={{ fontFamily: displayFont, fontWeight: 600, fontSize: 17, color: "#F2F8ED" }}>Tea বন্ধু</span>
        </div>
      </footer>
    </div>
  );
}
