// app/terms/page.tsx
import React from "react";

export default function TermsPage() {
    return (
        <main className="bg-gradient-to-br from-gray-900 via-gray-950 to-black min-h-screen text-white px-6 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-teal-400 drop-shadow">
                    Terms & Conditions
                </h1>
                <p className="mb-8 text-gray-400 text-lg text-center">
                    Last updated: July 2025
                </p>

                <section className="space-y-6 text-gray-200 leading-relaxed">
                    <p>
                        Welcome to <span className="text-teal-300 font-semibold">NyayMitra</span>. By accessing or using our platform, you agree to comply with the following terms and conditions.
                    </p>

                    <ul className="list-disc list-inside space-y-3">
                        <li>You must be at least 18 years old to use this platform.</li>
                        <li>
                            <span className="text-teal-300 font-medium">NyayMitra</span> is a technology platform that connects users with verified lawyers. We do <span className="italic">not</span> provide direct legal advice or representation.
                        </li>
                        <li>You are responsible for the accuracy of your personal information, documents, and consultation details.</li>
                        <li>We reserve the right to suspend or block accounts involved in suspicious or unethical activity.</li>
                        <li>All bookings are non-transferable and subject to lawyer availability.</li>
                        <li>NyayMitra may update these terms at any time. Continued use of the platform indicates your acceptance of the revised terms.</li>
                    </ul>

                    <p>If you do not agree with any part of these terms, please discontinue using our services.</p>

                    <p className="text-gray-400">
                        For any questions or support, contact us at{" "}
                        <a href="mailto:nyaymitra.ai@gmail.com" className="underline hover:text-teal-300">
                            nyaymitra.ai@gmail.com
                        </a>.
                    </p>
                </section>
            </div>
        </main>
    );
}
