// app/privacy/page.tsx
import React from "react";

export default function PrivacyPage() {
    return (
        <main className="bg-gradient-to-br from-black via-gray-900 to-gray-950 min-h-screen text-white px-6 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-purple-400 drop-shadow">
                    Privacy Policy
                </h1>
                <p className="mb-8 text-gray-300 text-lg text-center">
                    Effective from: June 2025
                </p>

                <section className="space-y-6 text-gray-200 leading-relaxed">
                    <p>
                        At <span className="text-purple-300 font-semibold">NyayMitra</span>, we value your privacy and are committed to protecting your personal data.
                    </p>
                    <ul className="list-disc list-inside space-y-3">
                        <li>We collect essential data like your name, contact details, and Aadhaar for identity verification.</li>
                        <li>Your payment details are handled securely through Razorpay and never stored on our servers.</li>
                        <li>Chat and consultation data may be used to improve service quality, never for third-party use.</li>
                        <li>You may request data deletion by contacting <span className="underline">privacy@nyaymitra.in</span>.</li>
                        <li>We follow industry-standard security protocols to keep your data safe.</li>
                    </ul>
                    <p>
                        By using our services, you consent to this privacy policy.
                    </p>
                    <p className="text-gray-400">
                        For questions, feel free to email us at <span className="underline">privacy@nyaymitra.in</span>.
                    </p>
                </section>
            </div>
        </main>
    );
}
