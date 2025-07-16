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
                        At <span className="text-purple-300 font-semibold">NyayMitra</span>, your privacy is a top priority. This policy explains how we collect, use, and safeguard your personal data when you use our platform.
                    </p>

                    <h2 className="text-xl font-semibold text-purple-300 mt-6">1. What We Collect</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Your name, phone number, and email address</li>
                        <li>Government ID details (e.g., Aadhaar) for identity verification (when required)</li>
                        <li>Uploaded documents for legal processing or notary services</li>
                        <li>Lawyer booking and consultation history</li>
                        <li>Chat history (used to improve service, not for marketing)</li>
                        <li>Technical data such as IP address and device/browser info</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-purple-300 mt-6">2. How We Use Your Data</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>To process bookings and connect you with verified lawyers</li>
                        <li>To provide notary, affidavit, or document-related services</li>
                        <li>To send status updates, invoices, or confirmation emails</li>
                        <li>To improve service quality through usage feedback</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-purple-300 mt-6">3. Payment Security</h2>
                    <p>
                        All payments are handled securely through <span className="font-medium">Razorpay</span>. We do not store card details or sensitive financial data on our servers.
                    </p>

                    <h2 className="text-xl font-semibold text-purple-300 mt-6">4. Data Sharing</h2>
                    <p>
                        We do <span className="italic">not</span> sell or rent your personal data to third parties. Your information is only shared:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>With the lawyer you’ve booked, for consultation purposes</li>
                        <li>With government agencies (only if required by law)</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-purple-300 mt-6">5. Your Rights</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>You can access, update, or correct your information at any time</li>
                        <li>You may request data deletion by contacting us</li>
                        <li>You can opt out of non-essential communications</li>
                    </ul>

                    <p className="text-sm text-gray-400">
                        For all requests, please email us at:{" "}
                        <a href="mailto:support@nyaymitra.tech" className="underline text-blue-400">
                            support@nyaymitra.tech
                        </a>
                    </p>

                    <h2 className="text-xl font-semibold text-purple-300 mt-6">6. Data Security</h2>
                    <p>
                        We follow industry-standard practices including HTTPS, JWT-based authentication, and secure storage practices to protect your data.
                    </p>

                    <h2 className="text-xl font-semibold text-purple-300 mt-6">7. Updates to this Policy</h2>
                    <p>
                        We may occasionally update this Privacy Policy. We recommend reviewing this page periodically to stay informed.
                    </p>

                    <p className="mt-6">
                        By using <span className="text-purple-300 font-semibold">NyayMitra</span>, you consent to the terms of this Privacy Policy.
                    </p>
                </section>
            </div>
        </main>
    );
}
