// app/terms/page.tsx
import React from "react";

export default function TermsPage() {
    return (
        <main className="bg-gradient-to-br from-gray-900 via-gray-950 to-black min-h-screen text-white px-6 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-teal-400 drop-shadow">
                    Terms & Conditions
                </h1>
                <p className="mb-8 text-gray-300 text-lg text-center">
                    Last updated: June 2025
                </p>

                <section className="space-y-6 text-gray-200 leading-relaxed">
                    <p>
                        Welcome to <span className="text-teal-300 font-semibold">NyayMitra</span>. By accessing or using our platform, you agree to be bound by the following terms and conditions.
                    </p>
                    <ul className="list-disc list-inside space-y-3">
                        <li>Users must be at least 18 years old to use this platform.</li>
                        <li>NyayMitra does not offer formal legal representation — we connect users with verified lawyers.</li>
                        <li>You are responsible for the accuracy of your profile and consultation details.</li>
                        <li>We reserve the right to block accounts for suspicious or unethical activity.</li>
                        <li>All bookings are non-transferable and subject to lawyer availability.</li>
                    </ul>
                    <p>
                        If you do not agree with any part of these terms, please refrain from using our services.
                    </p>
                    <p className="text-gray-400">
                        For any questions, reach out to us at <span className="underline">nyaymitra.ai@gmail.com</span>.
                    </p>
                </section>
            </div>
        </main>
    );
}
