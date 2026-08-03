"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Leaf, Globe, ArrowLeft, Clock, BookOpen } from "lucide-react";

const T = {
  en: { back: "Back to blog", notFound: "Post not found.", loading: "Loading..." },
  bn: { back: "ব্লগে ফিরে যান", notFound: "পোস্ট পাওয়া যায়নি।", loading: "লোড হচ্ছে..." },
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug;
  const [lang, setLang] = useState("en");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const t = T[lang];
  const isBn = lang === "bn";
  const bodyFont = isBn ? "'Hind Siliguri', sans-serif" : "'Inter', sans-serif";
  const displayFont = isBn ? "'Hind Siliguri', sans-serif" : "'Fraunces', serif";

  useEffect(() => {
    if (!slug) return;
    const supabase = createClient();
    supabase
      .from("blogs")
      .select("id, title, slug, content, tag, published_at")
      .eq("slug", slug)
      .single()
      .then(({ data }) => {
        setPost(data || null);
        setLoading(false);
      });
  }, [slug]);

  return (
    <div style={{ fontFamily: bodyFont, background: "#F2F8ED", color: "#1F2E20", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .btn-lift { transition: transform .2s ease; }
        .btn-lift:hover { transform: translateX(-3px); }
      `}</style>

      <header style={{ borderBottom: "1px solid #DCEBD0", padding: "16px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "#1F4D2E", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Leaf size={17} color="#8FBB6B" />
            </div>
            <span style={{ fontFamily: displayFont, fontWeight: 600, fontSize: 17, color: "#1F4D2E" }}>Tea বন্ধু</span>
          </Link>
          <button
            onClick={() => setLang(isBn ? "en" : "bn")}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #DCEBD0", borderRadius: 999, padding: "7px 14px", fontSize: 13, fontWeight: 600, color: "#1F4D2E", cursor: "pointer" }}
          >
            <Globe size={14} /> {isBn ? "EN" : "বাং"}
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 80px" }}>
        <Link href="/blog" className="btn-lift" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#4C7A3F", textDecoration: "none", fontSize: 14, fontWeight: 600, marginBottom: 28 }}>
          <ArrowLeft size={15} /> {t.back}
        </Link>

        {loading ? (
          <p style={{ color: "#8CA187" }}>{t.loading}</p>
        ) : !post ? (
          <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", border: "1px dashed #C3DFAE", borderRadius: 20 }}>
            <BookOpen size={28} color="#8FBB6B" style={{ margin: "0 auto 12px" }} />
            <p style={{ color: "#5A6E58", margin: 0 }}>{t.notFound}</p>
          </div>
        ) : (
          <article>
            {post.tag && (
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "#C69749", textTransform: "uppercase", letterSpacing: 0.5 }}>{post.tag}</span>
            )}
            <h1 style={{ fontFamily: displayFont, fontSize: "clamp(28px, 4.5vw, 40px)", fontWeight: 600, color: "#16331F", margin: "10px 0 14px", lineHeight: 1.2 }}>
              {post.title}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#8CA187", fontSize: 13.5, marginBottom: 32 }}>
              <Clock size={13} /> {new Date(post.published_at).toLocaleDateString()}
            </div>
            <div style={{ fontSize: 16.5, lineHeight: 1.8, color: "#2A3D2A", whiteSpace: "pre-wrap" }}>
              {post.content}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
