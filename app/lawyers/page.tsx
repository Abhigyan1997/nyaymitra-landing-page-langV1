"use client"

import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Scale, Star, MapPin, Clock, Phone, Video, MessageCircle,
  Search, User, Award, Calendar, Loader, AlertCircle,
  SlidersHorizontal, ArrowUpDown, ChevronDown, X, Shield,
  Briefcase, Globe, ChevronRight, Sparkles,
} from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { cn } from "@/lib/utils"
import { loadRazorpay } from "@/lib/razorpay"
import { useToast } from "@/components/ui/use-toast"
// DatePicker replaced with fully inline custom calendar (no Radix Popover portal)

// ─── Style injection ──────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --ink:       #0c0f1a;
    --ink-80:    rgba(12,15,26,0.8);
    --surface:   #111827;
    --surface-2: #1a2235;
    --surface-3: #1f2d47;
    --rim:       rgba(255,255,255,0.07);
    --rim-hover: rgba(255,255,255,0.12);
    --gold:      #c9a84c;
    --gold-lt:   #e2c97e;
    --gold-dim:  rgba(201,168,76,0.15);
    --blue:      #3d7ff5;
    --blue-dim:  rgba(61,127,245,0.12);
    --text:      #e8edf5;
    --text-muted:#8a95a8;
    --text-dim:  #5a6478;
    --emerald:   #34d399;
    --red:       #f87171;
    --radius-card: 18px;
    --radius-btn:  10px;
    --shadow-card: 0 1px 0 0 rgba(255,255,255,0.05) inset, 0 24px 48px -12px rgba(0,0,0,0.5);
    --shadow-glow: 0 0 40px rgba(201,168,76,0.12);
  }

  .lawyers-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .lawyers-root {
    min-height: 100vh;
    background: var(--ink);
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    position: relative;
    overflow-x: hidden;
  }

  /* Ambient grain */
  .lawyers-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.028;
    pointer-events: none;
    z-index: 0;
  }

  /* Ambient blobs */
  .blob-1 {
    position: fixed; top: -20vh; right: -15vw; width: 70vw; height: 70vw;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(61,127,245,0.09) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }
  .blob-2 {
    position: fixed; bottom: -30vh; left: -20vw; width: 80vw; height: 80vw;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  /* ── Nav ── */
  .lp-nav {
    position: sticky; top: 0; z-index: 100;
    backdrop-filter: blur(20px) saturate(1.4);
    background: rgba(12,15,26,0.85);
    border-bottom: 1px solid var(--rim);
  }
  .lp-nav-inner {
    max-width: 1280px; margin: 0 auto;
    padding: 0 32px;
    height: 64px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .lp-logo {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; color: var(--text);
  }
  .lp-logo-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-lt) 100%);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(201,168,76,0.35);
  }
  .lp-logo-text {
    font-family: 'DM Serif Display', serif;
    font-size: 20px; letter-spacing: -0.3px;
  }
  .lp-nav-actions { display: flex; align-items: center; gap: 8px; }

  .btn-ghost {
    background: none; border: none; cursor: pointer;
    color: var(--text-muted); font-size: 14px; font-family: 'DM Sans', sans-serif;
    font-weight: 500; padding: 8px 14px; border-radius: var(--radius-btn);
    transition: color 0.15s, background 0.15s;
    text-decoration: none; display: inline-flex; align-items: center;
  }
  .btn-ghost:hover { color: var(--text); background: var(--rim); }

  .btn-gold {
    background: linear-gradient(135deg, var(--gold) 0%, #b8932e 100%);
    border: none; cursor: pointer;
    color: #0c0f1a; font-size: 13.5px; font-family: 'DM Sans', sans-serif;
    font-weight: 600; padding: 8px 18px; border-radius: var(--radius-btn);
    transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 16px rgba(201,168,76,0.3);
    display: inline-flex; align-items: center; gap: 6px;
    text-decoration: none;
  }
  .btn-gold:hover { opacity: 0.92; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(201,168,76,0.4); }

  .btn-primary {
    background: var(--blue);
    border: none; cursor: pointer;
    color: #fff; font-size: 13.5px; font-family: 'DM Sans', sans-serif;
    font-weight: 600; padding: 9px 18px; border-radius: var(--radius-btn);
    transition: opacity 0.15s, transform 0.15s;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
  .btn-primary:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

  .btn-outline {
    background: transparent;
    border: 1px solid var(--rim-hover); cursor: pointer;
    color: var(--text-muted); font-size: 13px; font-family: 'DM Sans', sans-serif;
    font-weight: 500; padding: 8px 16px; border-radius: var(--radius-btn);
    transition: border-color 0.15s, color 0.15s, background 0.15s;
    display: inline-flex; align-items: center; gap: 6px; text-decoration: none;
  }
  .btn-outline:hover { border-color: rgba(255,255,255,0.2); color: var(--text); background: var(--rim); }

  /* ── Hero ── */
  .lp-hero {
    max-width: 1280px; margin: 0 auto; padding: 56px 32px 40px;
    position: relative; z-index: 1;
  }
  .lp-hero-eyebrow {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 11.5px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--gold); background: var(--gold-dim);
    padding: 5px 12px; border-radius: 100px; margin-bottom: 20px;
    border: 1px solid rgba(201,168,76,0.2);
  }
  .lp-hero h1 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(32px, 5vw, 52px);
    line-height: 1.1; letter-spacing: -0.5px;
    color: var(--text); max-width: 640px;
  }
  .lp-hero h1 em {
    font-style: italic; color: var(--gold-lt);
  }
  .lp-hero-sub {
    margin-top: 14px; font-size: 15px; color: var(--text-muted);
    font-weight: 400; max-width: 480px; line-height: 1.6;
  }
  .lp-hero-stats {
    display: flex; align-items: center; gap: 32px;
    margin-top: 36px; padding-top: 32px;
    border-top: 1px solid var(--rim);
  }
  .stat-item { display: flex; flex-direction: column; gap: 2px; }
  .stat-num {
    font-family: 'DM Serif Display', serif;
    font-size: 26px; color: var(--text); letter-spacing: -0.5px;
  }
  .stat-label { font-size: 12px; color: var(--text-dim); font-weight: 500; }
  .stat-sep { width: 1px; height: 36px; background: var(--rim); }

  /* ── Search area ── */
  .lp-search-area {
    max-width: 1280px; margin: 0 auto; padding: 0 32px 28px;
    position: relative; z-index: 1;
  }
  .search-bar-wrap {
    display: flex; gap: 10px; align-items: center;
    background: var(--surface-2);
    border: 1px solid var(--rim);
    border-radius: 14px;
    padding: 8px 8px 8px 16px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .search-bar-wrap:focus-within {
    border-color: rgba(201,168,76,0.3);
    box-shadow: 0 0 0 3px rgba(201,168,76,0.06);
  }
  .search-input {
    flex: 1; background: none; border: none; outline: none;
    font-size: 14.5px; color: var(--text); font-family: 'DM Sans', sans-serif;
    font-weight: 400;
  }
  .search-input::placeholder { color: var(--text-dim); }

  .filter-row {
    display: flex; gap: 10px; align-items: center; margin-top: 12px; flex-wrap: wrap;
  }
  .filter-chip {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; color: var(--text-muted);
    background: var(--surface-2); border: 1px solid var(--rim);
    padding: 6px 14px; border-radius: 8px; cursor: pointer;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
    font-family: 'DM Sans', sans-serif; font-weight: 500;
  }
  .filter-chip:hover, .filter-chip.active {
    border-color: rgba(201,168,76,0.3); color: var(--gold-lt); background: var(--gold-dim);
  }
  .filter-chip svg { width: 13px; height: 13px; }

  .filter-panel {
    background: var(--surface-2);
    border: 1px solid var(--rim);
    border-radius: 14px;
    padding: 20px 24px;
    margin-top: 12px;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
  }

  /* ── Results meta ── */
  .lp-results-meta {
    max-width: 1280px; margin: 0 auto; padding: 0 32px 16px;
    display: flex; align-items: center; justify-content: space-between;
    position: relative; z-index: 1;
  }
  .results-count {
    font-size: 13px; color: var(--text-dim); font-weight: 500;
  }
  .results-count strong { color: var(--text-muted); }

  /* ── Cards ── */
  .lp-cards {
    max-width: 1280px; margin: 0 auto; padding: 0 32px 80px;
    display: flex; flex-direction: column; gap: 12px;
    position: relative; z-index: 1;
  }

  .lawyer-card {
    background: var(--surface-2);
    border: 1px solid var(--rim);
    border-radius: var(--radius-card);
    padding: 24px 28px;
    display: flex; gap: 22px;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    cursor: default;
    animation: cardIn 0.35s ease both;
  }
  .lawyer-card:hover {
    border-color: rgba(255,255,255,0.1);
    box-shadow: var(--shadow-card);
    transform: translateY(-2px);
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Avatar */
  .avatar-wrap { position: relative; flex-shrink: 0; }
  .avatar-img, .avatar-placeholder {
    width: 58px; height: 58px; border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255,255,255,0.08);
  }
  .avatar-placeholder {
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Serif Display', serif;
    font-size: 18px; font-weight: 400;
  }
  .avatar-badge {
    position: absolute; bottom: -2px; right: -2px;
    width: 18px; height: 18px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold) 0%, #b8932e 100%);
    display: flex; align-items: center; justify-content: center;
    border: 2px solid var(--surface-2);
  }
  .avatar-badge svg { width: 8px; height: 8px; color: #0c0f1a; }

  /* Card body */
  .card-body { flex: 1; min-width: 0; }
  .card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .card-name-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .card-name {
    font-family: 'DM Serif Display', serif;
    font-size: 18px; color: var(--text); letter-spacing: -0.2px;
  }

  .pill {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.04em;
    padding: 3px 9px; border-radius: 100px;
  }
  .pill-kyc { background: rgba(52,211,153,0.1); color: var(--emerald); border: 1px solid rgba(52,211,153,0.2); }
  .pill-avail { background: var(--blue-dim); color: #7aacff; border: 1px solid rgba(61,127,245,0.2); }
  .pill-soon { background: rgba(255,255,255,0.05); color: var(--text-dim); border: 1px solid var(--rim); }

  .card-specs { display: flex; flex-wrap: wrap; gap: 6px; margin: 10px 0; }
  .spec-tag {
    font-size: 12px; color: var(--text-dim);
    background: var(--surface-3); border: 1px solid var(--rim);
    padding: 3px 10px; border-radius: 6px; font-weight: 500;
  }
  .spec-more { font-size: 12px; color: var(--text-dim); padding: 3px 4px; }

  .card-meta { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 10px; }
  .meta-item { display: inline-flex; align-items: center; gap: 5px; font-size: 12.5px; color: var(--text-muted); }
  .meta-item svg { width: 12px; height: 12px; flex-shrink: 0; }
  .meta-stars { color: #f5c842; fill: #f5c842; }

  .card-bio {
    font-size: 13.5px; color: var(--text-muted); line-height: 1.55;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    font-weight: 400;
  }

  .card-modes { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
  .mode-tag {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11.5px; color: var(--text-dim);
    background: var(--surface-3); border: 1px solid var(--rim);
    padding: 3px 9px; border-radius: 6px;
  }
  .mode-tag svg { width: 11px; height: 11px; }
  .lang-tag {
    font-size: 11.5px; color: var(--text-dim); padding: 3px 9px;
    background: var(--gold-dim); border: 1px solid rgba(201,168,76,0.15);
    border-radius: 6px; font-weight: 500;
  }

  /* Card right */
  .card-right {
    display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between;
    min-width: 160px; flex-shrink: 0; gap: 12px;
  }
  .card-fee { text-align: right; }
  .fee-amount {
    font-family: 'DM Serif Display', serif;
    font-size: 24px; color: var(--text); letter-spacing: -0.5px;
  }
  .fee-label { font-size: 11px; color: var(--text-dim); margin-top: 2px; font-weight: 500; }
  .card-actions { display: flex; flex-direction: column; gap: 8px; width: 100%; }

  /* Skeleton */
  .skeleton {
    background: linear-gradient(90deg, var(--surface-2) 0%, var(--surface-3) 50%, var(--surface-2) 100%);
    background-size: 200% 100%;
    animation: shimmer 1.6s infinite;
    border-radius: 8px;
  }
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .skeleton-card {
    background: var(--surface-2); border: 1px solid var(--rim);
    border-radius: var(--radius-card); padding: 24px 28px;
    display: flex; gap: 20px;
  }

  /* Empty state */
  .empty-state {
    text-align: center; padding: 80px 24px;
  }
  .empty-icon {
    width: 56px; height: 56px; border-radius: 16px;
    background: var(--surface-2); border: 1px solid var(--rim);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px; color: var(--text-dim);
  }
  .empty-state h3 {
    font-family: 'DM Serif Display', serif; font-size: 20px; color: var(--text); margin-bottom: 8px;
  }
  .empty-state p { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

  /* Error state */
  .error-state {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    text-align: center; padding: 32px;
  }
  .error-icon {
    width: 56px; height: 56px; border-radius: 16px;
    background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.2);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px; color: var(--red);
  }
  .error-state h3 { font-family: 'DM Serif Display', serif; font-size: 20px; color: var(--text); margin-bottom: 8px; }
  .error-state p { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }
  .error-actions { display: flex; gap: 10px; justify-content: center; }

  /* Select overrides */
  .dark-select select { background: var(--surface-2) !important; }

  /* ── Booking dialog ── */
  .booking-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.75);
    backdrop-filter: blur(6px); z-index: 200;
    display: flex; align-items: center; justify-content: center; padding: 20px;
    animation: fadeIn 0.15s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .booking-modal {
    background: var(--surface);
    border: 1px solid var(--rim-hover);
    border-radius: 20px;
    width: 100%; max-width: 460px;
    max-height: 90vh; overflow-y: auto;
    box-shadow: 0 32px 80px rgba(0,0,0,0.6);
    animation: slideUp 0.2s ease;
  }
  @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .modal-header {
    padding: 24px 28px 20px;
    border-bottom: 1px solid var(--rim);
    display: flex; justify-content: space-between; align-items: flex-start;
  }
  .modal-title { font-family: 'DM Serif Display', serif; font-size: 20px; color: var(--text); }
  .modal-sub { font-size: 13px; color: var(--text-muted); margin-top: 3px; }
  .modal-close {
    background: var(--surface-2); border: 1px solid var(--rim); cursor: pointer;
    width: 30px; height: 30px; border-radius: 8px; display: flex;
    align-items: center; justify-content: center; color: var(--text-dim);
    transition: background 0.15s, color 0.15s; flex-shrink: 0;
  }
  .modal-close:hover { background: var(--surface-3); color: var(--text); }
  .modal-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 22px; }
  .modal-section-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--text-dim); margin-bottom: 10px;
  }

  .mode-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .mode-option {
    border: 1px solid var(--rim); border-radius: 10px; padding: 12px 14px;
    cursor: pointer; transition: border-color 0.15s, background 0.15s;
    display: flex; align-items: center; gap: 10px;
    color: var(--text-muted); font-size: 13.5px; font-weight: 500;
    background: var(--surface-2);
  }
  .mode-option:hover { border-color: rgba(255,255,255,0.15); color: var(--text); }
  .mode-option.selected { border-color: var(--gold); background: var(--gold-dim); color: var(--gold-lt); }
  .mode-option svg { width: 15px; height: 15px; flex-shrink: 0; }

  .slot-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
  .slot-btn {
    border: 1px solid var(--rim); border-radius: 8px; padding: 8px 4px;
    cursor: pointer; font-size: 12px; font-family: 'DM Sans', sans-serif;
    font-weight: 500; color: var(--text-muted); background: var(--surface-2);
    transition: border-color 0.15s, background 0.15s, color 0.15s;
    text-align: center;
  }
  .slot-btn:hover { border-color: rgba(255,255,255,0.15); color: var(--text); }
  .slot-btn.selected { border-color: var(--gold); background: var(--gold-dim); color: var(--gold-lt); }

  .modal-total {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 16px; border-top: 1px solid var(--rim);
  }
  .modal-total-label { font-size: 13px; color: var(--text-muted); }
  .modal-total-amt { font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--text); }

  /* ── Inline Calendar ── */
  .cal-wrap {
    background: var(--surface-3);
    border: 1px solid var(--rim);
    border-radius: 12px;
    padding: 14px;
    user-select: none;
  }
  .cal-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 12px;
  }
  .cal-month-label {
    font-family: 'DM Serif Display', serif;
    font-size: 15px; color: var(--text); letter-spacing: -0.2px;
  }
  .cal-nav {
    background: var(--surface-2); border: 1px solid var(--rim);
    border-radius: 7px; width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--text-muted);
    transition: color 0.15s, background 0.15s;
  }
  .cal-nav:hover { color: var(--text); background: var(--rim-hover); }
  .cal-nav:disabled { opacity: 0.3; cursor: not-allowed; }
  .cal-grid {
    display: grid; grid-template-columns: repeat(7, 1fr); gap: 3px;
  }
  .cal-dow {
    text-align: center; font-size: 10px; font-weight: 600;
    color: var(--text-dim); letter-spacing: 0.06em; text-transform: uppercase;
    padding: 4px 0 6px;
  }
  .cal-day {
    aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
    border-radius: 7px; font-size: 13px; font-weight: 500; cursor: pointer;
    color: var(--text-muted); background: none; border: none;
    transition: background 0.12s, color 0.12s;
    font-family: 'DM Sans', sans-serif;
  }
  .cal-day:hover:not(:disabled):not(.cal-day-selected) {
    background: var(--rim-hover); color: var(--text);
  }
  .cal-day-selected {
    background: var(--gold) !important;
    color: #0c0f1a !important; font-weight: 700;
    box-shadow: 0 2px 10px rgba(201,168,76,0.4);
  }
  .cal-day-today:not(.cal-day-selected) {
    color: var(--gold-lt); border: 1px solid rgba(201,168,76,0.3);
  }
  .cal-day:disabled, .cal-day-past {
    color: var(--text-dim) !important; opacity: 0.35; cursor: not-allowed;
  }
  .cal-day-empty { pointer-events: none; }

  /* ── Step indicator ── */
  .booking-steps {
    display: flex; align-items: center; gap: 0;
    margin-bottom: 24px;
  }
  .booking-step {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    flex: 1;
  }
  .step-dot {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700;
    border: 1.5px solid var(--rim);
    color: var(--text-dim); background: var(--surface-2);
    transition: all 0.2s;
  }
  .step-dot.active {
    border-color: var(--gold); color: var(--gold); background: var(--gold-dim);
  }
  .step-dot.done {
    border-color: var(--emerald); color: #0c0f1a; background: var(--emerald);
  }
  .step-label { font-size: 10px; color: var(--text-dim); font-weight: 500; letter-spacing: 0.04em; }
  .step-label.active { color: var(--gold-lt); }
  .step-line { flex: 1; height: 1px; background: var(--rim); margin: 0 4px; margin-bottom: 16px; }
  .step-line.done { background: var(--emerald); opacity: 0.4; }

  /* Responsive */
  @media (max-width: 768px) {
    .lp-nav-inner { padding: 0 16px; }
    .lp-hero { padding: 36px 16px 28px; }
    .lp-search-area { padding: 0 16px 20px; }
    .lp-results-meta { padding: 0 16px 12px; }
    .lp-cards { padding: 0 16px 60px; }
    .lp-hero-stats { gap: 20px; }
    .filter-panel { grid-template-columns: 1fr 1fr; }
    .lawyer-card { flex-direction: column; }
    .card-top { flex-direction: column; }
    .card-right { flex-direction: row; align-items: center; min-width: auto; width: 100%; }
    .card-actions { flex-direction: row; width: auto; }
  }
`

// ─── Types ────────────────────────────────────────────────────────────────────
interface Lawyer {
  id: string; userId: string; fullName: string; specialization: string[]
  experience: number; rating: number; reviews: number; city: string; state: string
  languages: string[]; consultationFee: number; availability: string
  profilePhoto?: string; verified: boolean; bio: string
  consultationModes: { video: boolean; call: boolean; chat: boolean; inPerson: boolean }
  barCouncilId: string; yearsPracticing: number; kycStatus: string
}
interface AvailableSlot { startTime: string; endTime: string; slot: string; durationMinutes: number }

// ─── Static data ──────────────────────────────────────────────────────────────
const SPECIALIZATIONS = [
  "All Specializations", "Criminal Law", "Civil Law", "Family Law", "Divorce Law",
  "Child Custody Law", "Property Law", "Real Estate Law", "Corporate Law", "Startup Law",
  "Contract Law", "Intellectual Property Law", "Trademark Law", "Patent Law",
  "Cyber Crime Law", "Consumer Court Law", "Labour & Employment Law", "Tax Law",
  "GST Law", "Banking & Finance Law", "Debt Recovery Law", "Immigration Law",
  "Cheque Bounce Law", "Motor Accident Law", "Insurance Law", "Arbitration Law",
  "High Court Law", "Supreme Court Law", "Service Matter Law", "RERA Law",
  "Environmental Law", "Constitutional Law",
]
const STATES = [
  "All States", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
]
const EXPERIENCE_LEVELS = ["All Experience", "0-5 years", "5-10 years", "10-20 years", "20+ years"]
const LANGUAGES = [
  "All Languages", "Hindi", "English", "Marathi", "Gujarati", "Telugu", "Tamil",
  "Kannada", "Bengali", "Punjabi", "Malayalam", "Odia", "Assamese", "Maithili", "Bhojpuri", "Rajasthani",
]
const SORT_OPTIONS = [
  { value: "rating", label: "Top Rated" },
  { value: "experience", label: "Most Experienced" },
  { value: "consultationFee", label: "Fee: Low to High" },
  { value: "reviews", label: "Most Reviewed" },
]

// Avatar color palettes
const AVATAR_PALETTES = [
  { bg: "#1a2a1e", text: "#4ade80", border: "rgba(74,222,128,0.2)" },
  { bg: "#1e2035", text: "#818cf8", border: "rgba(129,140,248,0.2)" },
  { bg: "#2a1a1a", text: "#f87171", border: "rgba(248,113,113,0.2)" },
  { bg: "#1a2535", text: "#60a5fa", border: "rgba(96,165,250,0.2)" },
  { bg: "#261e10", text: "#fbbf24", border: "rgba(251,191,36,0.2)" },
]

function Avatar({ lawyer }: { lawyer: Lawyer }) {
  const initials = lawyer.fullName.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase()
  const palette = AVATAR_PALETTES[lawyer.fullName.charCodeAt(0) % AVATAR_PALETTES.length]
  return (
    <div className="avatar-wrap">
      {lawyer.profilePhoto ? (
        <img src={lawyer.profilePhoto} alt={lawyer.fullName} className="avatar-img" />
      ) : (
        <div className="avatar-placeholder" style={{ background: palette.bg, color: palette.text, border: `2px solid ${palette.border}` }}>
          {initials}
        </div>
      )}
      {lawyer.verified && (
        <span className="avatar-badge"><Award /></span>
      )}
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton" style={{ width: 58, height: 58, borderRadius: "50%", flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <div className="skeleton" style={{ height: 18, width: "40%" }} />
        <div className="skeleton" style={{ height: 13, width: "65%" }} />
        <div className="skeleton" style={{ height: 13, width: "50%" }} />
        <div className="skeleton" style={{ height: 36, width: "100%", marginTop: 4 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end", width: 160, flexShrink: 0 }}>
        <div className="skeleton" style={{ height: 28, width: 80 }} />
        <div className="skeleton" style={{ height: 36, width: 140 }} />
        <div className="skeleton" style={{ height: 36, width: 140 }} />
      </div>
    </div>
  )
}

function DarkSelect({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]
}) {
  return (
    <div>
      <p className="modal-section-label" style={{ marginBottom: 6 }}>{label}</p>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: "100%", background: "var(--surface-2)", border: "1px solid var(--rim)",
          borderRadius: 8, padding: "8px 12px", color: "var(--text-muted)",
          fontSize: 13, fontFamily: "'DM Sans', sans-serif", outline: "none",
          cursor: "pointer",
        }}
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  )
}

// ─── Inline Calendar (no portal, no z-index issues) ──────────────────────────
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function InlineCalendar({ value, onChange }: { value: Date | undefined; onChange: (d: Date) => void }) {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const [view, setView] = useState(() => {
    const d = value || new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })

  const year = view.getFullYear(), month = view.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevDisabled = new Date(year, month, 1) <= new Date(today.getFullYear(), today.getMonth(), 1)

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  // pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null)

  const prevMonth = () => setView(new Date(year, month - 1, 1))
  const nextMonth = () => setView(new Date(year, month + 1, 1))

  return (
    <div className="cal-wrap">
      <div className="cal-header">
        <button className="cal-nav" onClick={prevMonth} disabled={prevDisabled}>
          <ChevronLeft size={14} />
        </button>
        <span className="cal-month-label">{MONTHS[month]} {year}</span>
        <button className="cal-nav" onClick={nextMonth}>
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="cal-grid">
        {DAYS.map(d => <div key={d} className="cal-dow">{d}</div>)}
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} className="cal-day cal-day-empty" />
          const date = new Date(year, month, day)
          const isPast = date < today
          const isToday = date.getTime() === today.getTime()
          const isSelected = value && date.getTime() === new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime()
          return (
            <button
              key={day}
              className={`cal-day ${isSelected ? "cal-day-selected" : ""} ${isToday && !isSelected ? "cal-day-today" : ""} ${isPast ? "cal-day-past" : ""}`}
              disabled={isPast}
              onClick={() => !isPast && onChange(date)}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Chevron icons for calendar nav (lucide doesn't export ChevronLeft by default above)
function ChevronLeft({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

// ─── Booking Step Indicator ───────────────────────────────────────────────────
function BookingSteps({ step }: { step: number }) {
  const steps = ["Mode", "Date", "Slot", "Pay"]
  return (
    <div className="booking-steps">
      {steps.map((label, i) => (
        <React.Fragment key={label}>
          <div className="booking-step">
            <div className={`step-dot ${i < step ? "done" : i === step ? "active" : ""}`}>
              {i < step ? "✓" : i + 1}
            </div>
            <span className={`step-label ${i === step ? "active" : ""}`}>{label}</span>
          </div>
          {i < steps.length - 1 && <div className={`step-line ${i < step ? "done" : ""}`} />}
        </React.Fragment>
      ))}
    </div>
  )
}


export default function LawyersPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpec, setSelectedSpec] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedExp, setSelectedExp] = useState("")
  const [selectedLang, setSelectedLang] = useState("")
  const [sortBy, setSortBy] = useState("rating")
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState(0) // 0=mode, 1=date, 2=slot, 3=confirm
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedMode, setSelectedMode] = useState("video")
  const [bookingLoading, setBookingLoading] = useState(false)
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([])
  const [fetchingSlots, setFetchingSlots] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) router.push("/auth/login?redirect=/lawyers")
  }, [router])

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return
        setLoading(true); setError(null)
        const response = await axios.get(
          "https://nyaymitra-backend-production.up.railway.app/api/v1/lawyer/all",
          { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
        )
        const data = response.data?.lawyers?.map((l: any) => ({
          id: l.lawyerDetails?._id || l._id || "",
          userId: l.lawyerDetails?.userId || l.userId || "",
          fullName: l.userInfo?.fullName || "",
          profilePhoto: l.userInfo?.profilePhoto || l.userInfo?.avatar || "",
          specialization: l.lawyerDetails?.specialization || [],
          experience: Number(l.lawyerDetails?.experience) || 0,
          rating: l.lawyerDetails?.averageRating || 0,
          reviews: l.lawyerDetails?.totalReviews || 0,
          city: l.userInfo?.address?.city || l.lawyerDetails?.city || "",
          state: l.userInfo?.address?.state || l.lawyerDetails?.state || "",
          languages: l.lawyerDetails?.languagesSpoken || [],
          consultationFee: l.lawyerDetails?.consultationFee || 0,
          verified: l.lawyerDetails?.verifiedByPlatform || false,
          bio: l.lawyerDetails?.bio || "Professional lawyer",
          consultationModes: l.lawyerDetails?.consultationModes || { video: false, call: false, chat: false, inPerson: false },
          barCouncilId: l.lawyerDetails?.barCouncilId || "",
          yearsPracticing: l.lawyerDetails?.yearsPracticing || 0,
          kycStatus: l.lawyerDetails?.kycStatus || "pending",
          availability: l.lawyerDetails?.kycStatus === "verified" ? "Available" : "Soon",
        })) || []
        setLawyers(data)
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch lawyers.")
      } finally { setLoading(false) }
    }
    fetchLawyers()
  }, [])

  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDate || !selectedLawyer) return
      try {
        setFetchingSlots(true)
        const token = localStorage.getItem("token")
        const response = await axios.get(
          `https://nyaymitra-backend-production.up.railway.app/api/v1/lawyer/${selectedLawyer.userId}/check?date=${selectedDate.toISOString()}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setAvailableSlots(response.data.data?.availableSlots || [])
      } catch {
        toast({ title: "Error", description: "Failed to fetch slots", variant: "destructive" })
      } finally { setFetchingSlots(false) }
    }
    fetchSlots()
  }, [selectedDate, selectedLawyer, toast])

  const filtered = lawyers
    .filter(l => {
      const q = searchTerm.toLowerCase()
      return (
        (!q || l.fullName?.toLowerCase().includes(q) || l.specialization?.some(s => s.toLowerCase().includes(q)) || l.bio?.toLowerCase().includes(q)) &&
        (!selectedSpec || selectedSpec === "All Specializations" || l.specialization?.some(s => s.toLowerCase().includes(selectedSpec.toLowerCase()))) &&
        (!selectedState || selectedState === "All States" || l.state === selectedState) &&
        (!selectedExp || selectedExp === "All Experience" ||
          (selectedExp === "0-5 years" && l.experience <= 5) ||
          (selectedExp === "5-10 years" && l.experience > 5 && l.experience <= 10) ||
          (selectedExp === "10-20 years" && l.experience > 10 && l.experience <= 20) ||
          (selectedExp === "20+ years" && l.experience > 20)) &&
        (!selectedLang || selectedLang === "All Languages" || l.languages?.includes(selectedLang))
      )
    })
    .sort((a, b) => {
      const av = a[sortBy as keyof Lawyer] || 0, bv = b[sortBy as keyof Lawyer] || 0
      if (typeof av === "number" && typeof bv === "number") return sortBy === "consultationFee" ? av - bv : bv - av
      return 0
    })

  const activeFilters = [selectedSpec, selectedState, selectedExp, selectedLang].filter(v => v && !v.startsWith("All")).length
  const resetFilters = () => { setSearchTerm(""); setSelectedSpec(""); setSelectedState(""); setSelectedExp(""); setSelectedLang(""); setSortBy("rating") }

  const openBooking = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer); setBookingOpen(true); setBookingStep(0)
    setSelectedDate(undefined); setSelectedTime(""); setAvailableSlots([])
    const m = lawyer.consultationModes
    setSelectedMode(m.video ? "video" : m.call ? "call" : m.chat ? "chat" : "inPerson")
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date); setSelectedTime(""); setAvailableSlots([])
    setBookingStep(2) // move to slot step
  }

  const closeBooking = () => { setBookingOpen(false); setBookingStep(0) }

  const handleBooking = async () => {
    if (!selectedLawyer || !selectedDate || !selectedTime || !selectedMode) {
      toast({ title: "Missing fields", description: "Please select all required fields", variant: "destructive" }); return
    }
    try {
      setBookingLoading(true); setBookingOpen(false)
      const token = localStorage.getItem("token"), userId = localStorage.getItem("userId")
      if (!token || !userId) { router.push("/auth/login?redirect=/lawyers"); return }
      const orderRes = await axios.post(
        "https://nyaymitra-backend-production.up.railway.app/api/v1/payment/create-order",
        {
          amount: selectedLawyer.consultationFee, currency: "INR", receipt: `booking_${Date.now()}`,
          notes: { userId, lawyerId: selectedLawyer.userId, mode: selectedMode, slot: selectedTime, date: selectedDate.toISOString() }
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const order = orderRes.data.order
      await loadRazorpay()
      await new Promise(r => setTimeout(r, 300))
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount, currency: order.currency,
        name: "NyayMitra",
        description: `Consultation with ${selectedLawyer.fullName}`,
        image: "/logo.png", order_id: order.id,
        handler: async (response: any) => {
          try {
            const verifyRes = await axios.post(
              "https://nyaymitra-backend-production.up.railway.app/api/v1/payment/verify",
              { razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature },
              { headers: { Authorization: `Bearer ${token}` } }
            )
            if (verifyRes.data.success) {
              const bookingRes = await axios.post(
                "https://nyaymitra-backend-production.up.railway.app/api/v1/booking/book",
                { userId, lawyerId: selectedLawyer.userId, date: selectedDate.toISOString(), slot: selectedTime, mode: selectedMode, paymentId: response.razorpay_payment_id, paymentMode: "razorpay", amount: selectedLawyer.consultationFee },
                { headers: { Authorization: `Bearer ${token}` } }
              )
              toast({ title: "Booking Confirmed", description: `Consultation with ${selectedLawyer.fullName} is confirmed.` })
              router.push(`/bookings/${bookingRes.data.booking._id}`)
            }
          } catch { toast({ title: "Verification failed", description: "Contact support.", variant: "destructive" }); setBookingOpen(true); setBookingStep(3) }
        },
        prefill: { name: localStorage.getItem("userName") || "", email: localStorage.getItem("userEmail") || "", contact: localStorage.getItem("userPhone") || "" },
        theme: { color: "#c9a84c" },
        modal: { ondismiss: () => { setBookingOpen(true); setBookingStep(3) } },
      }
      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch { toast({ title: "Booking failed", description: "Failed to process booking.", variant: "destructive" }); setBookingOpen(true); setBookingStep(3) }
    finally { setBookingLoading(false) }
  }

  if (error) {
    return (
      <div className="lawyers-root">
        <style>{GLOBAL_STYLES}</style>
        <div className="blob-1" /><div className="blob-2" />
        <div className="error-state">
          <div className="error-icon"><AlertCircle size={22} /></div>
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <div className="error-actions">
            <button className="btn-primary" onClick={() => window.location.reload()}>Try again</button>
            <button className="btn-outline" onClick={() => router.push("/")}>Go home</button>
          </div>
        </div>
      </div>
    )
  }

  const modeInfo = {
    video: { icon: <Video size={15} />, label: "Video Call" },
    call: { icon: <Phone size={15} />, label: "Phone Call" },
    chat: { icon: <MessageCircle size={15} />, label: "Chat" },
    inPerson: { icon: <User size={15} />, label: "In-Person" },
  }

  return (
    <div className="lawyers-root">
      <style>{GLOBAL_STYLES}</style>
      <div className="blob-1" /><div className="blob-2" />

      {/* ── Nav ── */}
      <header className="lp-nav">
        <div className="lp-nav-inner">
          <Link href="/" className="lp-logo">
            <div className="lp-logo-icon"><Scale size={16} color="#0c0f1a" strokeWidth={2.2} /></div>
            <span className="lp-logo-text">NyayMitra</span>
          </Link>
          <nav className="lp-nav-actions">
            <Link href="/legal-gpt" className="btn-ghost">
              <Sparkles size={14} style={{ marginRight: 6 }} />Ask AI
            </Link>
            <Link href="/auth/signup" className="btn-gold">
              <Briefcase size={13} />Join as Lawyer
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="lp-hero">
        <div className="lp-hero-eyebrow">
          <Shield size={11} />Verified Legal Professionals
        </div>
        <h1>Find Your <em>Perfect</em><br />Legal Counsel</h1>
        <p className="lp-hero-sub">
          Top tier lawyers across India, ready to take on your case. Book a consultation in minutes.
        </p>
        <div className="lp-hero-stats">
          <div className="stat-item">
            <span className="stat-num">60+</span>
            <span className="stat-label">Verified Lawyers</span>
          </div>
          <div className="stat-sep" />
          <div className="stat-item">
            <span className="stat-num">28</span>
            <span className="stat-label">Practice Areas</span>
          </div>
          <div className="stat-sep" />
          <div className="stat-item">
            <span className="stat-num">4.8★</span>
            <span className="stat-label">Avg. Rating</span>
          </div>
          <div className="stat-sep" />
          <div className="stat-item">
            <span className="stat-num">10+</span>
            <span className="stat-label">Cases Handled</span>
          </div>
        </div>
      </section>

      {/* ── Search ── */}
      <section className="lp-search-area">
        <div className="search-bar-wrap">
          <Search size={15} color="var(--text-dim)" />
          <input
            className="search-input"
            placeholder="Search by name, specialization, keyword…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-dim)", display: "flex", padding: 4 }}
            >
              <X size={14} />
            </button>
          )}
          <div style={{ width: 1, height: 24, background: "var(--rim)", margin: "0 4px" }} />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              background: "none", border: "none", outline: "none",
              color: "var(--text-muted)", fontSize: 13, fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer", paddingRight: 8,
            }}
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value} style={{ background: "#1a2235" }}>{o.label}</option>)}
          </select>
          <button
            className={`filter-chip${filtersOpen ? " active" : ""}`}
            onClick={() => setFiltersOpen(!filtersOpen)}
            style={{ marginLeft: 4, flexShrink: 0 }}
          >
            <SlidersHorizontal size={13} />
            Filters
            {activeFilters > 0 && (
              <span style={{
                background: "var(--gold)", color: "#0c0f1a",
                width: 16, height: 16, borderRadius: "50%", fontSize: 10, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{activeFilters}</span>
            )}
          </button>
        </div>

        {filtersOpen && (
          <div className="filter-panel">
            <DarkSelect label="Area of Law" value={selectedSpec} onChange={setSelectedSpec} options={SPECIALIZATIONS} />
            <DarkSelect label="State" value={selectedState} onChange={setSelectedState} options={STATES} />
            <DarkSelect label="Experience" value={selectedExp} onChange={setSelectedExp} options={EXPERIENCE_LEVELS} />
            <DarkSelect label="Language" value={selectedLang} onChange={setSelectedLang} options={LANGUAGES} />
            {activeFilters > 0 && (
              <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={resetFilters}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-dim)", fontSize: 12, display: "flex", alignItems: "center", gap: 5, fontFamily: "'DM Sans', sans-serif" }}
                >
                  <X size={12} /> Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── Results meta ── */}
      {!loading && (
        <div className="lp-results-meta">
          <span className="results-count">
            {filtered.length === 0 ? "No results" : <><strong>{filtered.length}</strong> {filtered.length === 1 ? "lawyer" : "lawyers"} found</>}
          </span>
        </div>
      )}

      {/* ── Cards ── */}
      <main className="lp-cards">
        {loading
          ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
          : filtered.map((lawyer, idx) => (
            <article
              key={lawyer.id}
              className="lawyer-card"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <Avatar lawyer={lawyer} />

              <div className="card-body">
                <div className="card-top">
                  <div>
                    <div className="card-name-row">
                      <span className="card-name">{lawyer.fullName}</span>
                      {lawyer.kycStatus === "verified" && (
                        <span className="pill pill-kyc"><Shield size={9} />KYC Verified</span>
                      )}
                      <span className={`pill ${lawyer.availability === "Available" ? "pill-avail" : "pill-soon"}`}>
                        {lawyer.availability}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card-specs">
                  {lawyer.specialization.slice(0, 3).map((s, i) => (
                    <span key={i} className="spec-tag">{s}</span>
                  ))}
                  {lawyer.specialization.length > 3 && (
                    <span className="spec-more">+{lawyer.specialization.length - 3}</span>
                  )}
                </div>

                <div className="card-meta">
                  <span className="meta-item"><Clock size={12} />{lawyer.experience} yrs exp</span>
                  {(lawyer.city || lawyer.state) && (
                    <span className="meta-item"><MapPin size={12} />{[lawyer.city, lawyer.state].filter(Boolean).join(", ")}</span>
                  )}
                  {lawyer.reviews > 0 && (
                    <span className="meta-item">
                      <Star size={12} className="meta-stars" style={{ fill: "#f5c842", color: "#f5c842" }} />
                      {lawyer.rating > 0 ? `${lawyer.rating.toFixed(1)} · ` : ""}{lawyer.reviews} reviews
                    </span>
                  )}
                  {lawyer.languages.length > 0 && (
                    <span className="meta-item"><Globe size={12} />{lawyer.languages.slice(0, 2).join(", ")}</span>
                  )}
                </div>

                <p className="card-bio">{lawyer.bio}</p>

                <div className="card-modes">
                  {lawyer.consultationModes.video && <span className="mode-tag"><Video size={11} />Video</span>}
                  {lawyer.consultationModes.call && <span className="mode-tag"><Phone size={11} />Call</span>}
                  {lawyer.consultationModes.chat && <span className="mode-tag"><MessageCircle size={11} />Chat</span>}
                  {lawyer.consultationModes.inPerson && <span className="mode-tag"><User size={11} />In-Person</span>}
                  {lawyer.languages.slice(0, 2).map((lang, i) => (
                    <span key={i} className="lang-tag">{lang}</span>
                  ))}
                </div>
              </div>

              <div className="card-right">
                <div className="card-fee">
                  <div className="fee-amount">₹{lawyer.consultationFee.toLocaleString()}</div>
                  <div className="fee-label">per consultation</div>
                </div>
                <div className="card-actions">
                  <button className="btn-gold" style={{ width: "100%", justifyContent: "center" }} onClick={() => openBooking(lawyer)}>
                    <Calendar size={13} />Book Now
                  </button>
                  <Link href={`/lawyers/${lawyer.id}`} style={{ width: "100%" }}>
                    <button className="btn-outline" style={{ width: "100%", justifyContent: "center" }}>
                      View Profile <ChevronRight size={13} />
                    </button>
                  </Link>
                </div>
              </div>
            </article>
          ))
        }

        {!loading && filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon"><User size={22} /></div>
            <h3>No lawyers found</h3>
            <p>Try adjusting your filters or search for something else.</p>
            <button className="btn-outline" onClick={resetFilters}>Reset Filters</button>
          </div>
        )}
      </main>

      {bookingOpen && selectedLawyer && (
        <div className="booking-overlay" onClick={e => { if (e.target === e.currentTarget) closeBooking() }}>
          <div className="booking-modal">
            <div className="modal-header">
              <div>
                <div className="modal-title">Book a Consultation</div>
                <div className="modal-sub">{selectedLawyer.fullName} · ₹{selectedLawyer.consultationFee.toLocaleString()}</div>
              </div>
              <button className="modal-close" onClick={closeBooking}><X size={14} /></button>
            </div>

            <div className="modal-body">
              <BookingSteps step={bookingStep} />

              {/* ── Step 0: Mode ── */}
              {bookingStep === 0 && (
                <div>
                  <p className="modal-section-label">How would you like to consult?</p>
                  <div className="mode-grid">
                    {(["video", "call", "chat", "inPerson"] as const).map(mode => {
                      if (!selectedLawyer.consultationModes[mode]) return null
                      const { icon, label } = modeInfo[mode]
                      return (
                        <button
                          key={mode}
                          className={`mode-option${selectedMode === mode ? " selected" : ""}`}
                          onClick={() => setSelectedMode(mode)}
                        >
                          {icon}{label}
                        </button>
                      )
                    })}
                  </div>
                  <button
                    className="btn-gold"
                    style={{ width: "100%", justifyContent: "center", padding: "11px 24px", fontSize: 14, borderRadius: 12, marginTop: 20 }}
                    onClick={() => setBookingStep(1)}
                  >
                    Continue → Choose Date
                  </button>
                </div>
              )}

              {/* ── Step 1: Date ── */}
              {bookingStep === 1 && (
                <div>
                  <p className="modal-section-label">Select a date</p>
                  <InlineCalendar
                    value={selectedDate}
                    onChange={handleDateSelect}
                  />
                  <button
                    className="btn-outline"
                    style={{ marginTop: 14, fontSize: 13 }}
                    onClick={() => setBookingStep(0)}
                  >
                    ← Back
                  </button>
                </div>
              )}

              {/* ── Step 2: Slot ── */}
              {bookingStep === 2 && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <p className="modal-section-label" style={{ marginBottom: 0 }}>
                      Available slots — {selectedDate?.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                    </p>
                    <button
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gold)", fontSize: 12, fontFamily: "'DM Sans',sans-serif" }}
                      onClick={() => { setBookingStep(1); setSelectedTime("") }}
                    >
                      Change date
                    </button>
                  </div>
                  {fetchingSlots ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 0", gap: 10 }}>
                      <Loader size={18} style={{ animation: "spin 1s linear infinite", color: "var(--gold)" }} />
                      <span style={{ fontSize: 12, color: "var(--text-dim)" }}>Checking availability…</span>
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <>
                      <div className="slot-grid" style={{ marginTop: 10 }}>
                        {availableSlots.map(slot => (
                          <button
                            key={slot.slot}
                            className={`slot-btn${selectedTime === slot.slot ? " selected" : ""}`}
                            onClick={() => { setSelectedTime(slot.slot); setBookingStep(3) }}
                          >
                            {slot.startTime}
                          </button>
                        ))}
                      </div>
                      <p style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 10 }}>
                        Tap a slot to continue
                      </p>
                    </>
                  ) : (
                    <div style={{ textAlign: "center", padding: "28px 0" }}>
                      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>No slots available on this date.</p>
                      <button
                        className="btn-outline"
                        style={{ fontSize: 13 }}
                        onClick={() => { setBookingStep(1); setSelectedDate(undefined) }}
                      >
                        Pick another date
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ── Step 3: Confirm & Pay ── */}
              {bookingStep === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <p className="modal-section-label">Booking Summary</p>

                  {/* Summary card */}
                  <div style={{
                    background: "var(--surface-3)", border: "1px solid var(--rim)",
                    borderRadius: 12, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10
                  }}>
                    {[
                      { label: "Lawyer", value: selectedLawyer.fullName },
                      { label: "Mode", value: modeInfo[selectedMode as keyof typeof modeInfo]?.label || selectedMode },
                      { label: "Date", value: selectedDate?.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) },
                      { label: "Time", value: availableSlots.find(s => s.slot === selectedTime)?.startTime || selectedTime },
                    ].map(row => (
                      <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{row.label}</span>
                        <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>{row.value}</span>
                      </div>
                    ))}
                    <div style={{ height: 1, background: "var(--rim)", margin: "4px 0" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>Total</span>
                      <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "var(--text)" }}>
                        ₹{selectedLawyer.consultationFee.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    className="btn-gold"
                    style={{ width: "100%", justifyContent: "center", padding: "13px 24px", fontSize: 14, borderRadius: 12 }}
                    onClick={handleBooking}
                    disabled={bookingLoading}
                  >
                    {bookingLoading ? (
                      <><Loader size={14} style={{ animation: "spin 1s linear infinite" }} /> Processing…</>
                    ) : "Pay ₹" + selectedLawyer.consultationFee.toLocaleString() + " →"}
                  </button>

                  <button
                    className="btn-outline"
                    style={{ fontSize: 13, justifyContent: "center" }}
                    onClick={() => setBookingStep(2)}
                  >
                    ← Change slot
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}