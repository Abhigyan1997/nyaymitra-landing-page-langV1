// app/legal-ai/page.tsx
"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Scale, Zap, ShieldCheck, BookOpen, MessageSquare, Send, Loader2,
  History, ChevronDown, ChevronUp, User, Star, MapPin, IndianRupee,
  Briefcase, Users, X, MinusCircle, AlertCircle, MessageCircle,
  Menu, Mic, MicOff, ArrowLeft, Sparkles, CheckCircle, Clock,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

/* ─── GLOBAL STYLES ─────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Outfit:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --ink:        #0c0b09;
      --ink-2:      #1a1916;
      --ink-3:      #2e2c28;
      --ink-4:      #5c5850;
      --ink-5:      #8a8680;
      --ink-6:      #b8b4ae;
      --ink-7:      #e0ddd8;
      --ink-8:      #f2f0eb;
      --ink-9:      #faf8f4;
      --white:      #fffefb;
      --gold:       #c9a84c;
      --gold-lt:    #e2c87a;
      --gold-dk:    #8b6d22;
      --gold-pale:  #fdf6e0;
      --red:        #c0392b;
      --green:      #15803d;
      --serif:      'Cormorant Garamond', Georgia, serif;
      --sans:       'Outfit', system-ui, sans-serif;
      --mono:       'DM Mono', monospace;
      --radius:     8px;
      --radius-lg:  14px;
      --radius-xl:  20px;
    }

    body {
      background: var(--white);
      color: var(--ink);
      font-family: var(--sans);
      -webkit-font-smoothing: antialiased;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0% { background-position: -300% center; }
      100% { background-position: 300% center; }
    }
    @keyframes pulseDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.75); }
    }
    @keyframes glowPulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.9; }
    }
    @keyframes bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-4px); }
    }
    @keyframes mobileMenuFade {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .gold-text {
      background: linear-gradient(115deg, var(--gold-dk) 0%, var(--gold) 30%, var(--gold-lt) 52%, var(--gold) 70%, var(--gold-dk) 100%);
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 7s linear infinite;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      font-family: var(--mono);
      font-size: 8.5px;
      font-weight: 500;
      letter-spacing: 0.26em;
      text-transform: uppercase;
      color: var(--gold-dk);
    }
    .eyebrow::before, .eyebrow::after {
      content: '';
      width: 24px;
      height: 1px;
      background: linear-gradient(90deg, var(--gold-dk), var(--gold));
      flex-shrink: 0;
    }

    .nav-link {
      font-family: var(--sans);
      font-size: 13px;
      font-weight: 500;
      color: var(--ink-4);
      text-decoration: none;
      padding: 7px 13px;
      border-radius: 6px;
      transition: all 0.16s;
    }
    .nav-link:hover { color: var(--ink); background: var(--ink-8); }

    .desktop-nav-links {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .mobile-menu-btn {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .mobile-menu-dropdown {
      display: none;
    }

    @media (max-width: 768px) {
      .desktop-nav-links {
        display: none !important;
      }
      .mobile-menu-btn {
        display: flex !important;
      }
      .mobile-menu-dropdown.mobile-open {
        display: block;
      }
    }

    @media (min-width: 769px) {
      .mobile-menu-btn {
        display: none !important;
      }
      .mobile-menu-dropdown {
        display: none !important;
      }
    }

    .mobile-nav-link {
      font-family: var(--sans);
      font-size: 16px;
      font-weight: 500;
      color: var(--ink-3);
      text-decoration: none;
      padding: 12px 0;
      width: 100%;
      transition: all 0.16s;
      border-bottom: 1px solid var(--ink-8);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .btn-ink {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--ink); color: var(--white);
      font-family: var(--sans); font-size: 12.5px; font-weight: 600;
      padding: 9px 18px; border-radius: var(--radius); border: none;
      text-decoration: none; cursor: pointer;
      transition: all 0.22s cubic-bezier(0.16,1,0.3,1);
    }
    .btn-ink:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(12,11,9,0.25); }

    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--ink-3);
      font-family: var(--sans); font-size: 12.5px; font-weight: 500;
      padding: 9px 16px; border-radius: var(--radius);
      border: 1.5px solid var(--ink-7);
      text-decoration: none; cursor: pointer; transition: all 0.22s;
    }
    .btn-ghost:hover { background: var(--ink-9); border-color: var(--ink-5); color: var(--ink); }

    .btn-gold {
      display: inline-flex; align-items: center; gap: 8px;
      background: linear-gradient(135deg, var(--gold-dk) 0%, var(--gold) 50%, var(--gold-lt) 100%);
      color: var(--ink); font-family: var(--sans); font-size: 13px; font-weight: 700;
      padding: 11px 24px; border-radius: var(--radius); border: none;
      text-decoration: none; cursor: pointer;
      transition: all 0.22s cubic-bezier(0.16,1,0.3,1);
    }
    .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(201,168,76,0.4); }

    .chat-message-user {
      background: linear-gradient(135deg, var(--gold-dk) 0%, var(--gold) 50%, var(--gold-lt) 100%);
      color: var(--ink);
    }
    .chat-message-assistant {
      background: var(--white);
      border: 1px solid var(--ink-7);
      color: var(--ink-3);
      box-shadow: 0 2px 8px rgba(12,11,9,0.04);
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--ink-9); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }
    ::selection { background: var(--gold-pale); color: var(--gold-dk); }
  `}</style>
)

/* ─── LAWYER CARDS COMPONENT ────────────────────────────────────────────────── */
const LawyerCardsComponent = ({ lawyers, onClose }: { lawyers: Lawyer[]; onClose?: () => void }) => {
  const [expandedLawyer, setExpandedLawyer] = useState<string | null>(null)
  if (lawyers.length === 0) return null

  return (
    <div className="mt-3 space-y-2 w-full">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600 shrink-0" />
          <span>Recommended Lawyers ({lawyers.length})</span>
        </h3>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0" aria-label="Close suggestions">
            <MinusCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {lawyers.map((lawyer, index) => {
          const name = lawyer.userInfo.fullName || "Legal Professional"
          const specializations = lawyer.lawyerDetails.specialization?.slice(0, 2).join(", ") || "General Legal Practice"
          const experience = lawyer.lawyerDetails.experience || 0
          const fee = lawyer.lawyerDetails.consultationFee || 0
          const location = [lawyer.lawyerDetails.city, lawyer.lawyerDetails.state].filter(Boolean).join(", ")
          const rating = lawyer.lawyerDetails.averageRating || 0
          const isVerified = lawyer.lawyerDetails.verifiedByPlatform
          const isPremium = lawyer.lawyerDetails.isPremium
          const lawyerId = lawyer.lawyerDetails._id
          const isExpanded = expandedLawyer === lawyerId

          return (
            <div key={lawyerId || index} className="bg-amber-50/60 border border-amber-200/60 rounded-lg hover:border-amber-400/60 transition-all w-full">
              <div className="p-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                      <span className="font-semibold text-gray-900 text-xs sm:text-sm truncate max-w-[180px] sm:max-w-[200px]">{name}</span>
                      {isPremium && <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 border border-amber-300 rounded">Premium</span>}
                      {isVerified && <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-700 border border-emerald-300 rounded">Verified</span>}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-gray-500 mb-1.5 break-words line-clamp-2">{specializations}</div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-gray-400">
                      <span className="flex items-center gap-0.5 shrink-0"><Briefcase className="h-2.5 w-2.5 shrink-0" /> {experience}y</span>
                      {rating > 0 && <span className="flex items-center gap-0.5 shrink-0"><Star className="h-2.5 w-2.5 text-amber-500 shrink-0" /> {rating.toFixed(1)}</span>}
                      {fee > 0 && <span className="flex items-center gap-0.5 shrink-0"><IndianRupee className="h-2.5 w-2.5 shrink-0" /> {fee}</span>}
                      {location && <span className="flex items-center gap-0.5 min-w-0 flex-1 sm:flex-none"><MapPin className="h-2.5 w-2.5 shrink-0 mt-0.5" /><span className="truncate">{location}</span></span>}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0 self-start sm:self-center">
                    <Link href={`/lawyers/${lawyerId}`}>
                      <button className="bg-amber-600 hover:bg-amber-700 text-white text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-3 rounded-md transition-colors">
                        Book Now
                      </button>
                    </Link>
                    <button onClick={() => setExpandedLawyer(isExpanded ? null : lawyerId)} className="text-gray-400 hover:text-gray-700 h-7 sm:h-8 px-2">
                      {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-amber-200/60">
                    <div className="space-y-2 text-[10px] sm:text-xs">
                      {lawyer.lawyerDetails.bio && (
                        <div><span className="text-gray-400">Bio: </span><span className="text-gray-600">{lawyer.lawyerDetails.bio.substring(0, 100)}</span></div>
                      )}
                      {lawyer.lawyerDetails.languagesSpoken?.length > 0 && (
                        <div><span className="text-gray-400">Languages: </span><span className="text-gray-600">{lawyer.lawyerDetails.languagesSpoken.join(", ")}</span></div>
                      )}
                      {lawyer.lawyerDetails.consultationModes && (
                        <div>
                          <span className="text-gray-400">Consultation Modes: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {lawyer.lawyerDetails.consultationModes.video && <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">Video</span>}
                            {lawyer.lawyerDetails.consultationModes.call && <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded">Call</span>}
                            {lawyer.lawyerDetails.consultationModes.chat && <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded">Chat</span>}
                            {lawyer.lawyerDetails.consultationModes.inPerson && <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded">In-Person</span>}
                          </div>
                        </div>
                      )}
                      <div className="flex justify-end pt-1">
                        <Link href={`/lawyers/${lawyerId}`}>
                          <button className="bg-amber-600 hover:bg-amber-700 text-white text-[10px] sm:text-xs h-7 px-3 rounded-md">View Full Profile →</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-center pt-2">
        <Link href="/lawyers" className="text-amber-700 hover:text-amber-900 text-xs underline-offset-2 hover:underline">Browse All Lawyers →</Link>
      </div>
    </div>
  )
}

/* ─── INTERFACES ────────────────────────────────────────────────────────────── */
interface Message {
  _id?: string
  role: "user" | "assistant"
  content: string
  timestamp?: Date
}

interface ChatSession {
  sessionId: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

interface LawyerUserInfo {
  fullName: string
  email: string
  phone: string
  profileImage?: string | null
  profilePhoto?: string | null
  gender?: string
}

interface LawyerDetails {
  _id: string
  userId: string
  specialization: string[]
  experience: number
  consultationFee: number
  city: string
  state: string
  averageRating: number
  totalReviews: number
  bio?: string
  verifiedByPlatform: boolean
  isPremium: boolean
  status: string
  consultationModes: {
    video: boolean
    call: boolean
    chat: boolean
    inPerson: boolean
  }
  languagesSpoken: string[]
  barCouncilId: string
  yearsPracticing?: number
}

interface Lawyer {
  userInfo: LawyerUserInfo
  lawyerDetails: LawyerDetails
}

interface ChatResponse {
  success: boolean
  reply: string
  severity: "Low" | "Medium" | "High"
  nextSteps: string | null
  disclaimer: string
  messages: Message[]
}

interface UserType {
  id: string
  userId: string
  role: string
  name?: string
  email?: string
}

interface ISpeechRecognitionEvent {
  results: { [index: number]: { [index: number]: { transcript: string } } }
}
interface ISpeechRecognition {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((event: ISpeechRecognitionEvent) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
}
interface ISpeechRecognitionConstructor {
  new(): ISpeechRecognition
}

const CACHE_DURATION = 5 * 60 * 1000
const getCachedData = (key: string) => {
  try {
    const cached = localStorage.getItem(key)
    if (!cached) return null
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp > CACHE_DURATION) { localStorage.removeItem(key); return null }
    return data
  } catch { return null }
}
const setCachedData = (key: string, data: unknown) => {
  try { localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() })) }
  catch { console.error("Error caching data") }
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "👋 Namaste! I'm NyayMitra, your legal AI assistant.\n\nDescribe your legal issue in simple words — I'll help you understand:\n\n• How serious your case might be ⚖️\n• What steps you can take next 📌\n• And suggest the right lawyer if needed 👨‍⚖️\n\nWhat's your legal question?",
}

export default function LegalAIPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sessionId, setSessionId] = useState("")
  const [userId, setUserId] = useState<string | null>(null)
  const [user, setUser] = useState<UserType | null>(null)
  const [severity, setSeverity] = useState<"Low" | "Medium" | "High" | null>(null)
  const [suggestedLawyers, setSuggestedLawyers] = useState<Lawyer[]>([])
  const [nextSteps, setNextSteps] = useState<string | null>(null)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [allLawyers, setAllLawyers] = useState<Lawyer[]>([])
  const [showLawyerSuggestions, setShowLawyerSuggestions] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<ISpeechRecognition | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const initializedRef = useRef(false)
  const [userHasScrolled, setUserHasScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const win = window as unknown as Record<string, ISpeechRecognitionConstructor | undefined>
    const SpeechRecognition = win.SpeechRecognition ?? win.webkitSpeechRecognition
    if (SpeechRecognition) {
      const rec = new SpeechRecognition()
      rec.continuous = false
      rec.interimResults = false
      rec.lang = "en-IN"
      rec.onresult = (event) => setInputMessage(event.results[0][0].transcript)
      rec.onerror = () => setIsListening(false)
      rec.onend = () => setIsListening(false)
      setRecognition(rec)
    }
  }, [])

  const toggleListening = () => {
    if (!recognition) { alert("Speech recognition is not supported in your browser."); return }
    if (isListening) { recognition.stop(); setIsListening(false) }
    else { recognition.start(); setIsListening(true) }
  }

  const handleScroll = () => {
    if (!chatContainerRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50
    setUserHasScrolled(!isAtBottom)
  }

  useEffect(() => {
    if (!userHasScrolled && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "auto" })
    }
  }, [messages, userHasScrolled])

  const filterLawyersByIssue = useCallback((lawyers: Lawyer[], userMessage: string): Lawyer[] => {
    const keywords = userMessage.toLowerCase()
    const specializationMap: Record<string, string[]> = {
      criminal: ["Criminal Law", "Criminal"], property: ["Property Law", "Property", "Real Estate"],
      family: ["Family Law", "Matrimonial Law", "Divorce", "Child Custody"], civil: ["Civil Law", "Civil Litigation"],
      cyber: ["Cyber Law", "Cyber Crime"], corporate: ["Corporate Law", "Business Law"],
      consumer: ["Consumer Law", "Consumer Protection"], land: ["Property Law", "Land Dispute", "Real Estate"],
      divorce: ["Family Law", "Matrimonial Law"], inheritance: ["Property Law", "Inheritance", "Succession"],
      partition: ["Property Law", "Partition", "Family Law"], "cheque bounce": ["Cheque Bounce", "Negotiable Instruments", "Banking Law"],
      employment: ["Labor Law", "Employment Law"], tax: ["Tax Law", "Income Tax"],
      constitutional: ["Constitutional Law", "Writ"],
    }
    let relevantSpecializations: string[] = []
    for (const [kw, specs] of Object.entries(specializationMap)) {
      if (keywords.includes(kw)) relevantSpecializations.push(...specs)
    }
    const pool = relevantSpecializations.length === 0
      ? lawyers
      : lawyers.filter((l) =>
        (l.lawyerDetails.specialization ?? []).some((spec) =>
          relevantSpecializations.some((rs) => spec.toLowerCase().includes(rs.toLowerCase()) || rs.toLowerCase().includes(spec.toLowerCase()))
        )
      )
    return pool
      .sort((a, b) => (b.lawyerDetails.experience || 0) + (b.lawyerDetails.averageRating || 0) - ((a.lawyerDetails.experience || 0) + (a.lawyerDetails.averageRating || 0)))
      .slice(0, 5)
  }, [])

  const fetchAllLawyers = useCallback(async (token: string): Promise<Lawyer[]> => {
    const cached = getCachedData("lawyers_list")
    if (cached?.length > 0) { setAllLawyers(cached); return cached }
    try {
      const res = await fetch("https://nyaymitra-backend-production.up.railway.app/api/v1/lawyer/all", {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })
      if (!res.ok) return []
      const data = await res.json()
      const lawyers: Lawyer[] = data.lawyers ?? data.data ?? (Array.isArray(data) ? data : [])
      setCachedData("lawyers_list", lawyers)
      setAllLawyers(lawyers)
      return lawyers
    } catch { return [] }
  }, [])

  const fetchUserProfile = useCallback(async (token: string) => {
    const cached = getCachedData("user_profile")
    if (cached) return cached
    try {
      const res = await fetch("https://nyaymitra-backend-production.up.railway.app/api/v1/auth/profile", {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })
      if (!res.ok) throw new Error("Profile fetch failed")
      const data = await res.json()
      const userData = data.user ?? data.data ?? (data.id || data.userId ? data : null)
      if (userData) setCachedData("user_profile", userData)
      return userData
    } catch { return null }
  }, [])

  const fetchUserChatSessions = useCallback(async (uid: string, token: string, bypassCache = false): Promise<ChatSession[]> => {
    const cacheKey = `chat_sessions_${uid}`
    if (!bypassCache) {
      const cached = getCachedData(cacheKey)
      if (cached?.length > 0) { setChatSessions(cached); return cached }
    } else { localStorage.removeItem(cacheKey) }
    try {
      setLoadingHistory(true)
      const res = await fetch(`https://nyaymitra-backend-production.up.railway.app/api/v1/ai-agent/chat/sessions?userId=${uid}`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })
      if (!res.ok) return []
      const data = await res.json()
      const sessions: ChatSession[] = data.sessions ?? data.data ?? (Array.isArray(data) ? data : [])
      setCachedData(cacheKey, sessions)
      setChatSessions(sessions)
      return sessions
    } catch { return [] }
    finally { setLoadingHistory(false) }
  }, [])

  const loadChatSession = useCallback((session: ChatSession, uid: string) => {
    if (session.messages && session.messages.length > 0) {
      const formatted: Message[] = session.messages.map((m) => ({
        role: m.role, content: m.content,
        timestamp: m.timestamp ? new Date(m.timestamp) : undefined,
      }))
      setMessages(formatted)
    } else { setMessages([WELCOME_MESSAGE]) }
    setSessionId(session.sessionId)
    setShowLawyerSuggestions(false)
    setSeverity(null)
    setSuggestedLawyers([])
    setNextSteps(null)
    setUserHasScrolled(false)
    localStorage.setItem(`currentSessionId_${uid}`, session.sessionId)
  }, [])

  const startNewChat = useCallback((uid?: string | null) => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setSessionId(newSessionId)
    setMessages([WELCOME_MESSAGE])
    setSeverity(null)
    setSuggestedLawyers([])
    setNextSteps(null)
    setShowLawyerSuggestions(false)
    setUserHasScrolled(false)
    if (uid) {
      localStorage.setItem(`currentSessionId_${uid}`, newSessionId)
      const token = localStorage.getItem("token")
      if (token) fetchUserChatSessions(uid, token)
    }
  }, [fetchUserChatSessions])

  const formatMessageWithMarkdown = useCallback((content: string) => {
    let html = content
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    html = html.replace(/\n/g, "<br/>")
    const bulletRegex = /^- (.*?)(?=<br\/>|$)/gm
    if (bulletRegex.test(html)) {
      html = html.replace(bulletRegex, '<li class="ml-3 sm:ml-4 break-words">• $1</li>')
      html = html.replace(/(<li class="ml-3 sm:ml-4 break-words">.*?<\/li>)+/g, (match) => `<ul class="my-1 space-y-0.5 break-words">${match}</ul>`)
    }
    return <div className="break-words overflow-wrap-anywhere" dangerouslySetInnerHTML={{ __html: html }} />
  }, [])

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true
    const init = async () => {
      const token = localStorage.getItem("token")
      if (!token) { router.push("/auth/login"); return }
      try {
        const userData = await fetchUserProfile(token)
        if (!userData?.id && !userData?._id) { localStorage.removeItem("token"); router.push("/auth/login"); return }
        const mongoUserId: string = userData.id ?? userData._id
        setUser(userData)
        setUserId(mongoUserId)
        const [, sessions] = await Promise.all([fetchAllLawyers(token), fetchUserChatSessions(mongoUserId, token, true)])
        const savedSessionId = localStorage.getItem(`currentSessionId_${mongoUserId}`)
        if (savedSessionId) {
          const savedSession = sessions.find((s: ChatSession) => s.sessionId === savedSessionId)
          savedSession ? loadChatSession(savedSession, mongoUserId) : startNewChat(mongoUserId)
        } else if (sessions.length > 0) {
          const mostRecent = [...sessions].sort((a: ChatSession, b: ChatSession) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0]
          loadChatSession(mostRecent, mongoUserId)
        } else { startNewChat(mongoUserId) }
      } catch (error) {
        console.error("Init error:", error)
        localStorage.removeItem("token")
        router.push("/auth/login")
      } finally { setIsLoading(false) }
    }
    init()
  }, [fetchUserProfile, fetchAllLawyers, fetchUserChatSessions, loadChatSession, startNewChat, router])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isSending) return
    const userText = inputMessage.trim()
    setInputMessage("")
    setIsSending(true)
    setShowLawyerSuggestions(false)
    setUserHasScrolled(false)
    const userMsg: Message = { role: "user", content: userText, timestamp: new Date() }
    setMessages((prev) => [...prev, userMsg])
    const token = localStorage.getItem("token")
    if (!token) { router.push("/auth/login"); return }
    try {
      const res = await fetch("https://nyaymitra-backend-production.up.railway.app/api/v1/ai-agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ sessionId, message: userText, userId }),
      })
      if (res.status === 401) { localStorage.removeItem("token"); router.push("/auth/login"); return }
      if (!res.ok) { const errData = await res.json(); throw new Error(errData.message || "AI response failed") }
      const data: ChatResponse = await res.json()
      if (data.reply?.trim()) setMessages((prev) => [...prev, { role: "assistant", content: data.reply, timestamp: new Date() }])
      if (data.nextSteps?.trim()) {
        setMessages((prev) => [...prev, { role: "assistant", content: `📋 **Suggested Next Steps:**\n${data.nextSteps}`, timestamp: new Date() }])
      }
      if (data.severity && data.severity !== "Low") {
        const icon = data.severity === "High" ? "🔴" : "🟡"
        setMessages((prev) => [...prev, { role: "assistant", content: `${icon} **Legal Severity Assessment:** ${data.severity} — Consider consulting a lawyer for this matter.`, timestamp: new Date() }])
      }
      setSeverity(data.severity ?? null)
      setNextSteps(data.nextSteps ?? null)
      if (allLawyers.length > 0) setSuggestedLawyers(filterLawyersByIssue(allLawyers, userText))
      if (userId) fetchUserChatSessions(userId, token, true)
    } catch (error) {
      console.error("Send error:", error)
      setMessages((prev) => [...prev, { role: "assistant", content: "❌ I'm having trouble connecting right now. Please check your internet connection and try again.", timestamp: new Date() }])
    } finally { setIsSending(false) }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage() }
  }

  const handlePopularQuestion = (question: string) => {
    setInputMessage(question)
    textareaRef.current?.focus()
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`
    }
  }, [inputMessage])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading NyayMitra AI...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-white flex flex-col">

        {/* Navbar */}
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm" : "bg-white border-b border-gray-100"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <Link href="/" className="flex items-center gap-2 shrink-0 group">
                <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center shadow-sm">
                  <Scale className="w-4 h-4 text-gold" />
                </div>
                <span className="font-serif text-lg font-semibold text-gray-900">NyayMitra</span>
              </Link>

              <div className="desktop-nav-links items-center gap-2">
                <Link href="/" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <ArrowLeft className="w-3.5 h-3.5" /> Home
                </Link>
                <Link href="/lawyers" className="nav-link">Find Lawyers</Link>
                {user?.name && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                    <User className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
                  </div>
                )}
              </div>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-btn bg-transparent border-none cursor-pointer p-2 rounded-lg">
                {mobileMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
              </button>
            </div>

            <div className={`mobile-menu-dropdown ${mobileMenuOpen ? "mobile-open" : ""} absolute top-14 left-0 right-0 bg-white border-b border-gray-200 shadow-lg p-4 z-50`}>
              <div className="flex flex-col gap-2">
                <Link href="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <ArrowLeft className="w-4 h-4 text-gold-dk" /> Home
                </Link>
                <Link href="/lawyers" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <Users className="w-4 h-4 text-gold-dk" /> Find Lawyers
                </Link>
                {user?.name && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
                    <User className="w-4 h-4" /> {user.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Chat History Sidebar */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white border-b border-gray-200 overflow-hidden shadow-sm"
            >
              <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-base font-semibold text-gray-900 flex items-center gap-2">
                    <History className="w-4 h-4 text-gold-dk" /> Chat History
                  </h3>
                  <div className="flex gap-2">
                    <button onClick={() => { startNewChat(userId); setShowHistory(false) }} className="text-xs text-amber-700 hover:text-amber-900 px-2 py-1 rounded">
                      New Chat
                    </button>
                    <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {loadingHistory ? (
                  <div className="flex justify-center py-6"><Loader2 className="w-5 h-5 animate-spin text-amber-600" /></div>
                ) : chatSessions.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {chatSessions.map((session) => (
                      <div
                        key={session.sessionId}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${session.sessionId === sessionId ? "border-amber-500 bg-amber-50" : "border-gray-200 hover:border-amber-300"}`}
                        onClick={() => { loadChatSession(session, userId!); setShowHistory(false) }}
                      >
                        <p className="text-gray-700 text-xs truncate">
                          {(session.messages.find(m => m.role === "user")?.content ?? "New Conversation").substring(0, 40)}...
                        </p>
                        <p className="text-gray-400 text-[10px] mt-1">
                          {new Date(session.updatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-6 text-sm">No chat history found. Start a new conversation!</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="px-4 pt-8 pb-6 text-center">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[10px] font-mono text-amber-700 tracking-wider">AI-POWERED LEGAL ASSISTANT</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-3">
              Your 24/7{" "}
              <span className="gold-text">Legal AI Assistant</span>
            </h1>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
              Powered by AI trained on Indian laws. Get instant guidance for your legal questions anytime, anywhere.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="flex-1 pb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-6">

              {/* Left Sidebar - Features */}
              <div className="hidden lg:block space-y-5">
                <div>
                  <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-amber-600" /> Why Use NyayMitra AI?
                  </h2>
                  <div className="space-y-2">
                    {[
                      { icon: <Zap className="w-4 h-4 text-amber-600" />, title: "Instant Answers", desc: "Get immediate responses to your legal queries 24/7" },
                      { icon: <ShieldCheck className="w-4 h-4 text-amber-700" />, title: "Indian Law Focused", desc: "Specialized in IPC, CrPC, Evidence Act and other Indian statutes" },
                      { icon: <BookOpen className="w-4 h-4 text-amber-600" />, title: "Case References", desc: "Includes relevant case laws and precedents" },
                      { icon: <MessageSquare className="w-4 h-4 text-amber-700" />, title: "Conversational", desc: "Ask follow-up questions like a real conversation" },
                    ].map((feature, idx) => (
                      <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3 hover:border-amber-300 transition-all">
                        <div className="flex items-center gap-2 mb-1">
                          {feature.icon}
                          <span className="text-sm font-medium text-gray-800">{feature.title}</span>
                        </div>
                        <p className="text-xs text-gray-400">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3">
                    <MessageCircle className="w-4 h-4 text-amber-600" /> Popular Questions
                  </h2>
                  <div className="space-y-1.5">
                    {["How to file a consumer complaint in India?", "What is the procedure for mutual divorce?", "Can I get anticipatory bail for IPC 420?", "What are tenant rights regarding rent increases?", "How to recover money from a cheque bounce?"].map((q, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-2.5 hover:border-amber-300 cursor-pointer transition-all" onClick={() => handlePopularQuestion(q)}>
                        <p className="text-xs text-gray-600">{q}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                  <h3 className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Important Disclaimer
                  </h3>
                  <p className="text-[10px] text-gray-400 leading-relaxed">NyayMitra AI provides general legal information based on Indian laws. This does not constitute legal advice. For specific legal matters, please consult with a qualified advocate.</p>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[550px] sm:h-[600px]">
                  {/* Chat Header */}
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-4 py-3 border-b border-amber-200/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <h3 className="font-semibold text-gray-800 text-sm">NyayMitra AI</h3>
                      {severity && severity !== "Low" && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${severity === "High" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {severity === "High" ? "High Priority" : "Medium Priority"}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => startNewChat(userId)} className="text-xs text-amber-700 hover:text-amber-900 px-2 py-1 rounded">
                        New Chat
                      </button>
                      <button onClick={() => setShowHistory(!showHistory)} className="text-gray-400 hover:text-gray-600">
                        <History className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div ref={chatContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-200`}>
                        <div className={`max-w-[85%] rounded-2xl px-3 py-2 ${message.role === "user" ? "chat-message-user" : "chat-message-assistant"}`}>
                          <div className="text-xs sm:text-sm leading-relaxed break-words">
                            {formatMessageWithMarkdown(message.content)}
                          </div>
                        </div>
                      </div>
                    ))}

                    {isSending && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 rounded-2xl px-3 py-2 shadow-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "-0.3s" }} />
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "-0.15s" }} />
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" />
                          </div>
                        </div>
                      </div>
                    )}

                    {showLawyerSuggestions && suggestedLawyers.length > 0 && (
                      <div className="flex justify-start w-full">
                        <div className="w-full rounded-2xl bg-amber-50 border border-amber-200 p-3">
                          <LawyerCardsComponent lawyers={suggestedLawyers} onClose={() => setShowLawyerSuggestions(false)} />
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="p-3 border-t border-gray-200 bg-white">
                    {suggestedLawyers.length > 0 && !showLawyerSuggestions && (
                      <button onClick={() => setShowLawyerSuggestions(true)} className="w-full mb-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white text-xs py-1.5 rounded-lg transition-all">
                        <Users className="w-3.5 h-3.5 inline mr-1" /> View Recommended Lawyers ({suggestedLawyers.length})
                      </button>
                    )}
                    <div className="flex gap-2 items-end">
                      <textarea
                        ref={textareaRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Describe your legal issue..."
                        className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 resize-none text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-400 p-2.5 min-h-[40px]"
                        rows={1}
                      />
                      <button
                        onClick={toggleListening}
                        className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all ${isListening ? "bg-red-600 hover:bg-red-700 text-white" : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-500"}`}
                      >
                        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={isSending || !inputMessage.trim()}
                        className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 h-9 w-9 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      </button>
                    </div>
                    {isListening && <p className="text-xs text-amber-600 text-center mt-2 animate-pulse">🎤 Listening... Speak your legal question</p>}
                    <p className="text-[10px] text-gray-400 text-center mt-2">AI responses are for informational purposes only. For legal advice, consult a qualified lawyer.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-4 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-xs font-medium text-gray-600">NyayMitra</span>
              </div>
              <div className="flex gap-4">
                <Link href="/privacy-policy" className="text-gray-400 hover:text-gray-600 text-[11px] transition-colors">Privacy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-gray-600 text-[11px] transition-colors">Terms</Link>
                <Link href="/contact" className="text-gray-400 hover:text-gray-600 text-[11px] transition-colors">Contact</Link>
              </div>
              <div className="text-gray-300 text-[10px]">© {new Date().getFullYear()} NyayMitra. All rights reserved.</div>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}