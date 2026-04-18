"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Scale, Zap, ShieldCheck, BookOpen, MessageSquare, Send, Loader2, History, ChevronDown, ChevronUp, User, Star, MapPin, IndianRupee, Briefcase, Users, X, MinusCircle, AlertCircle, MessageCircle, Menu, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface Message {
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

interface User {
  id: string
  userId: string
  role: string
  name?: string
  email?: string
}

// Cache utility
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

const getCachedData = (key: string) => {
  try {
    const cached = localStorage.getItem(key)
    if (!cached) return null

    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key)
      return null
    }
    return data
  } catch {
    return null
  }
}

const setCachedData = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
  } catch (error) {
    console.error("Error caching data:", error)
  }
}

// Lawyer Cards Component - Fully Responsive with better mobile handling
const LawyerCardsComponent = ({ lawyers, onClose }: { lawyers: Lawyer[], onClose?: () => void }) => {
  const [expandedLawyer, setExpandedLawyer] = useState<string | null>(null)

  if (lawyers.length === 0) return null

  return (
    <div className="mt-3 space-y-2 w-full">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <h3 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
          <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400 shrink-0" />
          <span>Recommended Lawyers ({lawyers.length})</span>
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white/80 transition-colors shrink-0"
            aria-label="Close suggestions"
          >
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
            <div
              key={lawyerId || index}
              className="bg-white/5 border border-white/10 rounded-lg hover:border-blue-400/40 transition-all w-full"
            >
              {/* Main Content - Always Visible */}
              <div className="p-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                      <span className="font-semibold text-white text-xs sm:text-sm truncate max-w-[180px] sm:max-w-[200px]">
                        {name}
                      </span>
                      {isPremium && (
                        <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[9px] sm:text-[10px] px-1.5 py-0 shrink-0">
                          Premium
                        </Badge>
                      )}
                      {isVerified && (
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[9px] sm:text-[10px] px-1.5 py-0 shrink-0">
                          Verified
                        </Badge>
                      )}
                    </div>

                    <div className="text-[10px] sm:text-[11px] text-white/60 mb-1.5 break-words line-clamp-2">
                      {specializations}
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-white/50">
                      <span className="flex items-center gap-0.5 shrink-0">
                        <Briefcase className="h-2.5 w-2.5 shrink-0" /> {experience}y
                      </span>
                      {rating > 0 && (
                        <span className="flex items-center gap-0.5 shrink-0">
                          <Star className="h-2.5 w-2.5 text-yellow-400 shrink-0" /> {rating.toFixed(1)}
                        </span>
                      )}
                      {fee > 0 && (
                        <span className="flex items-center gap-0.5 shrink-0">
                          <IndianRupee className="h-2.5 w-2.5 shrink-0" /> {fee}
                        </span>
                      )}
                      {location && (
                        <span className="flex items-center gap-0.5 min-w-0 flex-1 sm:flex-none">
                          <MapPin className="h-2.5 w-2.5 shrink-0 mt-0.5" />
                          <span className="truncate">{location}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0 self-start sm:self-center">
                    <Link href={`/lawyers/${lawyerId}`} className="shrink-0">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-3 w-full sm:w-auto">
                        Book Now
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedLawyer(isExpanded ? null : lawyerId)}
                      className="text-white/60 hover:text-white h-7 sm:h-8 px-2"
                    >
                      {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </Button>
                  </div>
                </div>

                {/* Expanded Details - Conditional */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 pt-3 border-t border-white/10"
                  >
                    <div className="space-y-2 text-[10px] sm:text-xs">
                      {lawyer.lawyerDetails.bio && (
                        <div>
                          <span className="text-white/50">Bio: </span>
                          <span className="text-white/70">{lawyer.lawyerDetails.bio.substring(0, 100)}</span>
                        </div>
                      )}
                      {lawyer.lawyerDetails.languagesSpoken && lawyer.lawyerDetails.languagesSpoken.length > 0 && (
                        <div>
                          <span className="text-white/50">Languages: </span>
                          <span className="text-white/70">{lawyer.lawyerDetails.languagesSpoken.join(", ")}</span>
                        </div>
                      )}
                      {lawyer.lawyerDetails.consultationModes && (
                        <div>
                          <span className="text-white/50">Consultation Modes: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {lawyer.lawyerDetails.consultationModes.video && (
                              <Badge className="bg-blue-500/20 text-blue-300 text-[8px] sm:text-[9px]">Video</Badge>
                            )}
                            {lawyer.lawyerDetails.consultationModes.call && (
                              <Badge className="bg-green-500/20 text-green-300 text-[8px] sm:text-[9px]">Call</Badge>
                            )}
                            {lawyer.lawyerDetails.consultationModes.chat && (
                              <Badge className="bg-purple-500/20 text-purple-300 text-[8px] sm:text-[9px]">Chat</Badge>
                            )}
                            {lawyer.lawyerDetails.consultationModes.inPerson && (
                              <Badge className="bg-yellow-500/20 text-yellow-300 text-[8px] sm:text-[9px]">In-Person</Badge>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="flex justify-end pt-1">
                        <Link href={`/lawyers/${lawyerId}`}>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs h-7">
                            View Full Profile →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-center pt-2">
        <Link href="/lawyers">
          <Button variant="link" className="text-blue-400 hover:text-blue-300 text-xs h-auto p-0">
            Browse All Lawyers →
          </Button>
        </Link>
      </div>
    </div>
  )
}

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 md:py-8">
      <div className="grid lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {/* Left Sidebar Skeleton */}
        <div className="hidden lg:block lg:col-span-1 space-y-4 sm:space-y-5">
          <div className="h-28 sm:h-32 bg-white/5 rounded-xl animate-pulse" />
          <div className="space-y-2">
            <div className="h-7 sm:h-8 bg-white/5 rounded-lg animate-pulse w-1/2" />
            <div className="space-y-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 sm:h-24 bg-white/5 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
          <div className="h-48 sm:h-64 bg-white/5 rounded-xl animate-pulse" />
          <div className="h-28 sm:h-32 bg-white/5 rounded-xl animate-pulse" />
        </div>

        {/* Chat Interface Skeleton */}
        <div className="lg:col-span-2">
          <div className="h-[500px] sm:h-[600px] bg-white/5 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  </div>
)

export default function LegalGPTPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sessionId, setSessionId] = useState("")
  const [userId, setUserId] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [severity, setSeverity] = useState<"Low" | "Medium" | "High" | null>(null)
  const [suggestedLawyers, setSuggestedLawyers] = useState<Lawyer[]>([])
  const [nextSteps, setNextSteps] = useState<string | null>(null)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [allLawyers, setAllLawyers] = useState<Lawyer[]>([])
  const [isLoadingLawyers, setIsLoadingLawyers] = useState(false)
  const [showLawyerSuggestions, setShowLawyerSuggestions] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)
  const [isMobile, setIsMobile] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [activeFeature, setActiveFeature] = useState(0)
  const initializedRef = useRef(false)

  // Track scroll state to prevent unwanted jumps
  const [userHasScrolled, setUserHasScrolled] = useState(false)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const features = [
    {
      icon: <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />,
      title: "Instant Answers",
      description: "Get immediate responses to your legal queries 24/7"
    },
    {
      icon: <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-400" />,
      title: "Indian Law Focused",
      description: "Specialized in IPC, CrPC, Evidence Act and other Indian statutes"
    },
    {
      icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />,
      title: "Case References",
      description: "Includes relevant case laws and precedents"
    },
    {
      icon: <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-400" />,
      title: "Conversational",
      description: "Ask follow-up questions like a real conversation"
    }
  ]

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = 'en-IN'

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognitionInstance.onerror = () => {
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  const toggleListening = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.")
      return
    }

    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      recognition.start()
      setIsListening(true)
    }
  }

  // Handle scroll events to detect if user manually scrolled up
  const handleScroll = () => {
    if (!chatContainerRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50

    if (isAtBottom) {
      setUserHasScrolled(false)
      setShouldAutoScroll(true)
    } else {
      setUserHasScrolled(true)
      setShouldAutoScroll(false)
    }
  }

  // Scroll to bottom of messages
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (chatContainerRef.current && shouldAutoScroll) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior
      })
    }
  }

  useEffect(() => {
    if (!userHasScrolled) {
      scrollToBottom("auto")
    }
  }, [messages, userHasScrolled])

  useEffect(() => {
    if (isSending) {
      setUserHasScrolled(false)
      setShouldAutoScroll(true)
    }
  }, [isSending])

  // Optimized function to fetch all lawyers from the API with caching
  const fetchAllLawyers = useCallback(async (token: string) => {
    // Check cache first
    const cached = getCachedData('lawyers_list')
    if (cached && cached.length > 0) {
      setAllLawyers(cached)
      return cached
    }

    try {
      setIsLoadingLawyers(true)
      const response = await fetch("https://nyaymitra-backend-production.up.railway.app/api/v1/lawyer/all", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })

      if (response.ok) {
        const data = await response.json()
        let lawyers = []
        if (data.lawyers) {
          lawyers = data.lawyers
        } else if (data.data) {
          lawyers = data.data
        } else if (Array.isArray(data)) {
          lawyers = data
        }

        // Cache the result
        setCachedData('lawyers_list', lawyers)
        setAllLawyers(lawyers)
        return lawyers
      }
      return []
    } catch (error) {
      console.error("Error fetching lawyers:", error)
      return []
    } finally {
      setIsLoadingLawyers(false)
    }
  }, [])

  // Optimized function to fetch user profile from backend
  const fetchUserProfile = useCallback(async (token: string) => {
    const cached = getCachedData('user_profile')
    if (cached) {
      return cached
    }

    try {
      const response = await fetch("https://nyaymitra-backend-production.up.railway.app/api/v1/auth/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch user profile")
      }

      const data = await response.json()
      let userData = null

      if (data.user) {
        userData = data.user
      } else if (data.data) {
        userData = data.data
      } else if (data.id || data.userId) {
        userData = data
      }

      if (userData) {
        setCachedData('user_profile', userData)
      }

      return userData
    } catch (error) {
      console.error("Error fetching user profile:", error)
      return null
    }
  }, [])

  // Optimized function to fetch all chat sessions for the user
  const fetchUserChatSessions = useCallback(async (userId: string, token: string) => {
    const cacheKey = `chat_sessions_${userId}`
    const cached = getCachedData(cacheKey)
    if (cached && cached.length > 0) {
      setChatSessions(cached)
      return cached
    }

    try {
      setLoadingHistory(true)
      const response = await fetch(`https://nyaymitra-backend-production.up.railway.app/api/v1/ai-agent/chat/sessions?userId=${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })

      if (response.ok) {
        const data = await response.json()
        let sessions = []
        if (data.sessions) {
          sessions = data.sessions
        } else if (data.data) {
          sessions = data.data
        } else if (Array.isArray(data)) {
          sessions = data
        }

        setCachedData(cacheKey, sessions)
        setChatSessions(sessions)
        return sessions
      }
      return []
    } catch (error) {
      console.error("Error fetching chat sessions:", error)
      return []
    } finally {
      setLoadingHistory(false)
    }
  }, [])

  // Function to load a specific chat session
  const loadChatSession = useCallback(async (sessionId: string, token: string) => {
    try {
      const response = await fetch(`https://nyaymitra-backend-production.up.railway.app/api/v1/ai-agent/chat/history?sessionId=${sessionId}&userId=${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.messages && data.messages.length > 0) {
          const formattedMessages = data.messages.map((msg: any) => ({
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp
          }))
          setMessages(formattedMessages)
          setSessionId(sessionId)
          setShowLawyerSuggestions(false)
          setSeverity(null)
          setSuggestedLawyers([])
          setNextSteps(null)

          if (userId) {
            localStorage.setItem(`currentSessionId_${userId}`, sessionId)
          }
        }
      }
    } catch (error) {
      console.error("Error loading chat session:", error)
    }
  }, [userId])

  // Function to start a new chat session
  const startNewChat = useCallback(() => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setSessionId(newSessionId)
    setMessages([
      {
        role: "assistant",
        content: "👋 Namaste! Main NyayMitra hoon.\n\nAap apni legal problem simple language me likhiye main aapko bataunga:\n\n• Aapka case kitna serious hai ⚖️\n• Aap kya next step le sakte hain 📌\n• Aur zarurat ho to sahi lawyer bhi suggest karunga 👨‍⚖️\n\nShuru karein aapka issue kya hai?"
      }
    ])
    setSeverity(null)
    setSuggestedLawyers([])
    setNextSteps(null)
    setShowLawyerSuggestions(false)
    setUserHasScrolled(false)
    setShouldAutoScroll(true)

    if (userId) {
      localStorage.setItem(`currentSessionId_${userId}`, newSessionId)
    }

    if (userId) {
      const token = localStorage.getItem("token")
      if (token) {
        fetchUserChatSessions(userId, token)
      }
    }
  }, [userId, fetchUserChatSessions])

  // Function to filter lawyers based on legal issue
  const filterLawyersByIssue = useCallback((lawyers: Lawyer[], userMessage: string, aiResponse?: ChatResponse): Lawyer[] => {
    const keywords = userMessage.toLowerCase()

    const specializationMap: { [key: string]: string[] } = {
      'criminal': ['Criminal Law', 'Criminal'],
      'property': ['Property Law', 'Property', 'Real Estate'],
      'family': ['Family Law', 'Matrimonial Law', 'Divorce', 'Child Custody'],
      'civil': ['Civil Law', 'Civil Litigation'],
      'cyber': ['Cyber Law', 'Cyber Crime'],
      'corporate': ['Corporate Law', 'Business Law'],
      'consumer': ['Consumer Law', 'Consumer Protection'],
      'land': ['Property Law', 'Land Dispute', 'Real Estate'],
      'divorce': ['Family Law', 'Matrimonial Law'],
      'inheritance': ['Property Law', 'Inheritance', 'Succession'],
      'partition': ['Property Law', 'Partition', 'Family Law'],
      'cheque bounce': ['Cheque Bounce', 'Negotiable Instruments', 'Banking Law'],
      'employment': ['Labor Law', 'Employment Law'],
      'tax': ['Tax Law', 'Income Tax'],
      'constitutional': ['Constitutional Law', 'Writ']
    }

    let relevantSpecializations: string[] = []
    for (const [keyword, specializations] of Object.entries(specializationMap)) {
      if (keywords.includes(keyword)) {
        relevantSpecializations.push(...specializations)
      }
    }

    if (relevantSpecializations.length === 0) {
      return lawyers
        .sort((a, b) => {
          const scoreA = (a.lawyerDetails.experience || 0) + (a.lawyerDetails.averageRating || 0)
          const scoreB = (b.lawyerDetails.experience || 0) + (b.lawyerDetails.averageRating || 0)
          return scoreB - scoreA
        })
        .slice(0, isMobile ? 3 : 5)
    }

    const filtered = lawyers.filter(lawyer => {
      const specializations = lawyer.lawyerDetails.specialization || []
      return specializations.some(spec =>
        relevantSpecializations.some(relSpec =>
          spec.toLowerCase().includes(relSpec.toLowerCase()) ||
          relSpec.toLowerCase().includes(spec.toLowerCase())
        )
      )
    })

    return filtered
      .sort((a, b) => {
        const scoreA = (a.lawyerDetails.experience || 0) + (a.lawyerDetails.averageRating || 0)
        const scoreB = (b.lawyerDetails.experience || 0) + (b.lawyerDetails.averageRating || 0)
        return scoreB - scoreA
      })
      .slice(0, isMobile ? 3 : 5)
  }, [isMobile])

  // Function to format message with proper styling
  const formatMessageWithMarkdown = (content: string) => {
    let formattedContent = content

    // Bold text: **text**
    formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')

    // Italic text: *text*
    formattedContent = formattedContent.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

    // Line breaks
    formattedContent = formattedContent.replace(/\n/g, '<br/>')

    // Bullet points
    const bulletRegex = /^- (.*?)(?=<br\/>|$)/gm
    if (bulletRegex.test(formattedContent)) {
      formattedContent = formattedContent.replace(bulletRegex, '<li class="ml-3 sm:ml-4">• $1</li>')
      formattedContent = formattedContent.replace(/(<li class="ml-3 sm:ml-4">.*?<\/li>)+/g, (match) => {
        return `<ul class="my-1 space-y-0.5">${match}</ul>`
      })
    }

    return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
  }

  // Initialize session and load user data - OPTIMIZED with parallel execution
  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    const initializeChat = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        router.push("/auth/login")
        return
      }

      try {
        // Fetch user profile first to get userId
        const userData = await fetchUserProfile(token)

        if (!userData || (!userData.id && !userData._id)) {
          localStorage.removeItem("token")
          router.push("/auth/login")
          return
        }

        const mongoUserId = userData.id || userData._id
        setUser(userData)
        setUserId(mongoUserId)

        // PARALLEL execution of remaining API calls
        const [lawyers, sessions] = await Promise.all([
          fetchAllLawyers(token),
          fetchUserChatSessions(mongoUserId, token)
        ])

        const currentSessionId = localStorage.getItem(`currentSessionId_${mongoUserId}`)

        if (currentSessionId && sessions.find((s: ChatSession) => s.sessionId === currentSessionId)) {
          await loadChatSession(currentSessionId, token)
          setSessionId(currentSessionId)
        } else if (sessions && sessions.length > 0) {
          const mostRecentSession = sessions.sort((a: ChatSession, b: ChatSession) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )[0]
          await loadChatSession(mostRecentSession.sessionId, token)
          setSessionId(mostRecentSession.sessionId)
        } else {
          startNewChat()
        }

      } catch (error) {
        console.error("Error initializing chat:", error)
        localStorage.removeItem("token")
        router.push("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }

    initializeChat()
  }, [fetchUserProfile, fetchAllLawyers, fetchUserChatSessions, loadChatSession, startNewChat, router])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [features.length])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isSending) return

    const userMessage = inputMessage.trim()
    setInputMessage("")

    // Add user message to state immediately
    const userMessageObj: Message = { role: "user", content: userMessage }
    setMessages(prev => [...prev, userMessageObj])
    setIsSending(true)
    setShowLawyerSuggestions(false)
    setUserHasScrolled(false)
    setShouldAutoScroll(true)

    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/auth/login")
      return
    }

    try {
      const requestBody = {
        sessionId,
        message: userMessage,
        userId: userId
      }

      const response = await fetch("https://nyaymitra-backend-production.up.railway.app/api/v1/ai-agent/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      })

      if (response.status === 401) {
        localStorage.removeItem("token")
        router.push("/auth/login")
        return
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to get response from AI")
      }

      const data: ChatResponse = await response.json()

      // Update messages based on API response
      if (data.messages && data.messages.length > 0) {
        // Filter out any duplicate user messages (the API might return the full conversation)
        // We only want new assistant messages
        const existingMessageIds = messages.map(m => m.content + m.role)
        const newMessages = data.messages.filter(msg =>
          !existingMessageIds.includes(msg.content + msg.role) && msg.role === "assistant"
        )

        if (newMessages.length > 0) {
          setMessages(prev => [...prev, ...newMessages])
        } else if (data.reply) {
          // Fallback: add just the reply if no new messages found
          setMessages(prev => [...prev, { role: "assistant", content: data.reply }])
        }
      } else if (data.reply) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }])
      }

      setSeverity(data.severity)
      setNextSteps(data.nextSteps)

      let relevantLawyers: Lawyer[] = []
      if (allLawyers.length > 0) {
        relevantLawyers = filterLawyersByIssue(allLawyers, userMessage, data)
        setSuggestedLawyers(relevantLawyers)
      }

      // Add next steps message if provided
      if (data.nextSteps) {
        let nextStepsMessage = `📋 **Suggested Next Steps:**\n${data.nextSteps}`
        setMessages(prev => [...prev, { role: "assistant", content: nextStepsMessage }])
      }

      // Add severity message if not low
      if (data.severity !== "Low") {
        const severityIcon = data.severity === "High" ? "🔴" : "🟡"
        const severityMessage = `${severityIcon} **Legal Severity Assessment:** ${data.severity} - Consider consulting a lawyer for this matter.`
        setMessages(prev => [...prev, { role: "assistant", content: severityMessage }])
      }

      if (userId && token) {
        // Invalidate cache for chat sessions
        const cacheKey = `chat_sessions_${userId}`
        localStorage.removeItem(cacheKey)
        await fetchUserChatSessions(userId, token)
      }

    } catch (error) {
      console.error("Error sending message:", error)
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "❌ I apologize, but I'm having trouble connecting right now. Please check your internet connection and try again."
      }])
    } finally {
      setIsSending(false)
    }
  }

  const handleShowLawyers = () => {
    if (suggestedLawyers.length > 0 && !showLawyerSuggestions) {
      setShowLawyerSuggestions(true)
    }
  }

  const handleCloseLawyerSuggestions = () => {
    setShowLawyerSuggestions(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handlePopularQuestion = (question: string) => {
    setInputMessage(question)
    textareaRef.current?.focus()
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`
    }
  }, [inputMessage])

  // Show skeleton loader while loading
  if (isLoading) {
    return <SkeletonLoader />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 sm:h-14 md:h-16">
            <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
              <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Scale className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-blue-400" />
              </motion.div>
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                NyayMitra
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              {/* <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                className="bg-white/5 border-white/20 text-white hover:bg-white/15 text-xs lg:text-sm"
              >
                <History className="h-3.5 w-3.5 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                History
              </Button> */}
              <Link href="/lawyers">
                <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white hover:bg-white/15 text-xs lg:text-sm">
                  <Users className="h-3.5 w-3.5 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                  Find Lawyers
                </Button>
              </Link>
              {user?.name && (
                <div className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm text-white/60 bg-white/5 px-2 py-1 lg:px-3 lg:py-1.5 rounded-full">
                  <User className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
                  <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden border-t border-white/10 mt-2"
              >
                <div className="py-2 sm:py-3 space-y-1.5 sm:space-y-2">
                  {/* <Button
                    variant="outline"
                    onClick={() => {
                      setShowHistory(!showHistory)
                      setMobileMenuOpen(false)
                    }}
                    className="w-full bg-white/5 border-white/20 text-white hover:bg-white/15 justify-start text-xs sm:text-sm"
                  >
                    <History className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                    History
                  </Button> */}
                  <Link href="/lawyers" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full bg-white/5 border-white/20 text-white hover:bg-white/15 justify-start text-xs sm:text-sm">
                      <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                      Find Lawyers
                    </Button>
                  </Link>
                  {user?.name && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-white/60 bg-white/5 px-3 py-1.5 sm:py-2 rounded-lg">
                      <User className="h-3.5 w-3.5" />
                      {user.name}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Chat History Sidebar */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="relative z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <h3 className="text-sm sm:text-base font-semibold text-white">Chat History</h3>
                <div className="flex gap-1 sm:gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={startNewChat}
                    className="text-white/70 hover:text-white text-[10px] sm:text-xs h-7 sm:h-8"
                  >
                    New Chat
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowHistory(false)} className="text-white/50 h-6 w-6 sm:h-7 sm:w-7 p-0">
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
              {loadingHistory ? (
                <div className="flex justify-center py-4 sm:py-6">
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-blue-400" />
                </div>
              ) : chatSessions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-2">
                  {chatSessions.map((session: ChatSession) => (
                    <Card
                      key={session.sessionId}
                      className={`bg-white/5 border border-white/10 hover:border-blue-400/40 cursor-pointer transition-all ${session.sessionId === sessionId ? 'border-blue-400 bg-blue-900/20' : ''
                        }`}
                      onClick={() => {
                        const token = localStorage.getItem("token")
                        if (token) {
                          loadChatSession(session.sessionId, token)
                          setShowHistory(false)
                        }
                      }}
                    >
                      <CardContent className="p-2 sm:p-2.5">
                        <p className="text-white/80 text-[10px] sm:text-xs truncate">
                          {session.messages[0]?.content.substring(0, 40) || "New Conversation"}...
                        </p>
                        <p className="text-white/40 text-[8px] sm:text-[10px] mt-1">
                          {new Date(session.updatedAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-white/50 text-center py-4 sm:py-6 text-xs sm:text-sm">No chat history found. Start a new conversation!</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 md:py-8">
        <div className="grid lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {/* Left Sidebar - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block lg:col-span-1 space-y-4 sm:space-y-5">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <h1 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2">
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                  Your 24/7 Legal AI Assistant
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Powered by AI trained on Indian laws. Get instant guidance for your legal questions.
              </p>
            </motion.div>

            {/* Features */}
            <div className="space-y-2">
              <h2 className="text-sm sm:text-base font-semibold text-white/90 flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
                Why Use NyayMitra AI?
              </h2>
              <div className="space-y-1.5">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Card className="bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                      <CardHeader className="p-2 sm:p-2.5">
                        <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                          {feature.icon}
                          <span>{feature.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-2 sm:p-2.5 pt-0">
                        <p className="text-white/60 text-[10px] sm:text-xs">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Popular Questions */}
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-white/90 mb-1.5 sm:mb-2 flex items-center gap-2">
                <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
                Popular Questions
              </h2>
              <div className="space-y-1.5">
                {[
                  "How to file a consumer complaint in India?",
                  "What is the procedure for mutual divorce?",
                  "Can I get anticipatory bail for IPC 420?",
                  "What are tenant rights regarding rent increases?",
                  "How to recover money from a cheque bounce?"
                ].map((question, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Card
                      className="bg-white/5 border border-white/10 hover:border-blue-400/30 cursor-pointer transition-all"
                      onClick={() => handlePopularQuestion(question)}
                    >
                      <CardContent className="p-2 sm:p-2.5">
                        <p className="text-white/80 text-[10px] sm:text-xs">{question}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-900/20 p-2.5 sm:p-3 rounded-xl border border-blue-500/20">
              <h3 className="text-[10px] sm:text-xs font-semibold text-white mb-1 flex items-center gap-1.5 sm:gap-2">
                <AlertCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400" />
                Important Disclaimer
              </h3>
              <p className="text-white/50 text-[9px] sm:text-[11px] leading-relaxed">
                NyayMitra AI provides general legal information based on Indian laws. This does not constitute legal advice. For specific legal matters, please consult with a qualified advocate.
              </p>
            </div>
          </div>

          {/* Right Side - Chat Interface (Full width on mobile) */}
          <div className="lg:col-span-2">
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-center mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Ask Your Legal Question
              </h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col h-[500px] sm:h-[550px] md:h-[600px]">
                  {/* Chat Header */}
                  <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 p-2.5 sm:p-3 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-400 rounded-full animate-pulse"></div>
                      <h3 className="font-semibold text-white text-xs sm:text-sm">
                        NyayMitra AI
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {severity && severity !== "Low" && (
                        <Badge className={`text-[8px] sm:text-[10px] ${severity === "High" ? "bg-red-500/20 text-red-300 border-red-500/30" : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"}`}>
                          {severity === "High" ? "High Priority" : "Medium Priority"}
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={startNewChat}
                        className="text-white/70 hover:text-white text-[10px] sm:text-xs h-6 sm:h-7 px-1.5 sm:px-2"
                      >
                        New Chat
                      </Button>
                    </div>
                  </div>

                  {/* Messages Container */}
                  <div
                    ref={chatContainerRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto p-2.5 sm:p-3 space-y-2.5 sm:space-y-3 scroll-smooth"
                  >
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-200`}
                      >
                        <div
                          className={`max-w-[90%] sm:max-w-[85%] rounded-2xl px-2.5 py-1.5 sm:px-3 sm:py-2 ${message.role === "user"
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                            : "bg-white/10 text-white/90"
                            }`}
                        >
                          <div className="text-[11px] sm:text-xs md:text-sm leading-relaxed break-words">
                            {formatMessageWithMarkdown(message.content)}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isSending && (
                      <div className="flex justify-start">
                        <div className="bg-white/10 rounded-2xl px-2.5 py-1.5 sm:px-3 sm:py-2">
                          <div className="flex items-center gap-1">
                            <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Lawyer Suggestions Section */}
                    {showLawyerSuggestions && suggestedLawyers.length > 0 && (
                      <div className="flex justify-start w-full">
                        <div className="w-full rounded-2xl bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 p-2.5 sm:p-3">
                          <LawyerCardsComponent
                            lawyers={suggestedLawyers}
                            onClose={handleCloseLawyerSuggestions}
                          />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="p-2.5 sm:p-3 border-t border-white/10 bg-black/30">
                    {suggestedLawyers.length > 0 && !showLawyerSuggestions && (
                      <Button
                        onClick={handleShowLawyers}
                        className="w-full mb-1.5 sm:mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[10px] sm:text-xs h-7 sm:h-8"
                      >
                        <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-1.5 shrink-0" />
                        View Recommended Lawyers ({suggestedLawyers.length})
                      </Button>
                    )}
                    <div className="flex gap-1.5 sm:gap-2 items-end">
                      <Textarea
                        ref={textareaRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Describe your legal issue..."
                        className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 resize-none text-xs sm:text-sm rounded-xl focus-visible:ring-blue-400 min-h-[36px] sm:min-h-[40px]"
                        rows={1}
                      />
                      <Button
                        onClick={toggleListening}
                        variant="outline"
                        size="icon"
                        className={`h-8 w-8 sm:h-9 sm:w-9 rounded-xl shrink-0 ${isListening ? 'bg-red-600 hover:bg-red-700 border-red-500' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
                      >
                        {isListening ? <MicOff className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-400" /> : <Mic className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />}
                      </Button>
                      <Button
                        onClick={handleSendMessage}
                        disabled={isSending || !inputMessage.trim()}
                        size="icon"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-8 w-8 sm:h-9 sm:w-9 rounded-xl shrink-0"
                      >
                        {isSending ? <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" /> : <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                      </Button>
                    </div>
                    {isListening && (
                      <p className="text-[10px] sm:text-xs text-blue-400 text-center mt-1.5 sm:mt-2 animate-pulse">
                        🎤 Listening... Speak your legal question
                      </p>
                    )}
                    <p className="text-[8px] sm:text-[10px] text-white/40 text-center mt-1.5 sm:mt-2">
                      AI responses are for informational purposes only. For legal advice, consult a qualified lawyer.
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-3 sm:py-4 mt-4 sm:mt-6 bg-black/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Scale className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
              <span className="text-[10px] sm:text-xs font-medium bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                NyayMitra
              </span>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <Link href="/privacy-policy" className="text-white/50 hover:text-white/80 transition-colors text-[9px] sm:text-[11px]">
                Privacy
              </Link>
              <Link href="/terms" className="text-white/50 hover:text-white/80 transition-colors text-[9px] sm:text-[11px]">
                Terms
              </Link>
              <Link href="/contact" className="text-white/50 hover:text-white/80 transition-colors text-[9px] sm:text-[11px]">
                Contact
              </Link>
            </div>
            <div className="text-white/30 text-[8px] sm:text-[10px]">
              © {new Date().getFullYear()} NyayMitra. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}