"use client";

import { SiGithub } from "@icons-pack/react-simple-icons";
import { Package, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { getDictionary } from "@/i18n/dictionaries";
import "./About.css";

const GITHUB_URL = "https://github.com/zakapower";

export function AboutView() {
  const { lang } = useApp();
  const dict = getDictionary(lang);

  return (
    <article className="about">
      <header className="about__head">
        <p className="about__kicker">{dict.brand}</p>
        <h1>{dict.about}</h1>
        <p className="about__lead">{dict.aboutLead}</p>
      </header>

      <section className="about-card">
        <span className="about-card__icon" aria-hidden>
          <Package strokeWidth={2} />
        </span>
        <div className="about-card__body">
          <h2>{dict.aboutWhatTitle}</h2>
          <p>{dict.aboutWhatP1}</p>
          <p>{dict.aboutWhatP2}</p>
        </div>
      </section>

      <section className="about-card">
        <span className="about-card__icon" aria-hidden>
          <ShieldCheck strokeWidth={2} />
        </span>
        <div className="about-card__body">
          <h2>{dict.aboutSafeTitle}</h2>
          <p>{dict.aboutSafeP1}</p>
          <p>{dict.aboutSafeP2}</p>
        </div>
      </section>

      <section className="about-card">
        <span className="about-card__icon" aria-hidden>
          <SiGithub color="currentColor" size={20} title="" aria-hidden />
        </span>
        <div className="about-card__body">
          <h2>{dict.aboutSourceTitle}</h2>
          <p>{dict.aboutSourceP1}</p>
        </div>
      </section>

      <div className="about-cta-row">
        <a
          className="about-cta"
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiGithub color="currentColor" size={20} title="" aria-hidden />
          <span>
            <strong>GitHub</strong>
            <em>{dict.aboutCtaGithub}</em>
          </span>
        </a>
        <Link href="/" className="about-cta">
          <Package strokeWidth={2} aria-hidden />
          <span>
            <strong>{dict.popular}</strong>
            <em>{dict.aboutCtaApps}</em>
          </span>
        </Link>
      </div>
    </article>
  );
}
