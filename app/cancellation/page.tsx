// app/cancellation/page.tsx
import React from "react";

export default function CancellationRefundPolicy() {
    return (
        <main className="bg-gradient-to-br from-gray-900 via-black to-gray-950 min-h-screen text-white px-6 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-red-400 drop-shadow">
                    Cancellation & Refund Policy
                </h1>
                <p className="mb-8 text-gray-400 text-lg text-center">
                    Effective Date: June 2025
                </p>

                <section className="space-y-6 text-gray-200 leading-relaxed">
                    <p>
                        At <span className="text-red-300 font-semibold">NyayMitra</span>, we understand that circumstances may change. This policy outlines the terms under which users can cancel bookings and request refunds for services offered through our platform.
                    </p>

                    {/* Section 1 */}
                    <h2 className="text-xl font-semibold text-white mt-6">1. Booking Cancellation</h2>
                    <ul className="list-disc list-inside space-y-3">
                        <li>Users may cancel a legal consultation or document service up to <strong>12 hours before</strong> the scheduled time for a full refund.</li>
                        <li>Cancellations made <strong>within 12 hours</strong> of the scheduled time may not be eligible for a refund.</li>
                        <li>If a lawyer cancels due to unforeseen reasons, users will receive a full refund or may reschedule without any extra charge.</li>
                    </ul>

                    {/* Section 2 */}
                    <h2 className="text-xl font-semibold text-white mt-6">2. Refund Eligibility</h2>
                    <ul className="list-disc list-inside space-y-3">
                        <li>Refunds are applicable for eligible cancellations or failed transactions due to technical issues.</li>
                        <li>Completed consultations or services are generally not eligible for refunds unless a formal complaint is verified by our team.</li>
                        <li>Users must raise refund requests within <strong>48 hours</strong> of the originally scheduled service.</li>
                    </ul>

                    {/* Section 3 */}
                    <h2 className="text-xl font-semibold text-white mt-6">3. Refund Process</h2>
                    <ul className="list-disc list-inside space-y-3">
                        <li>All approved refunds will be credited to the original mode of payment.</li>
                        <li>Refunds typically take <strong>5–7 business days</strong> to process depending on your bank or payment gateway.</li>
                        <li>You will receive an email notification once your refund has been initiated.</li>
                    </ul>

                    {/* Section 4 */}
                    <h2 className="text-xl font-semibold text-white mt-6">4. Special Cases (Notary & Document Services)</h2>
                    <ul className="list-disc list-inside space-y-3">
                        <li>Notary services once initiated (especially physical notarization or stamp duty) may be non-refundable due to involvement of third-party processing.</li>
                        <li>In the event of courier delivery failure, NyayMitra may offer a redelivery or partial refund based on investigation.</li>
                    </ul>

                    {/* Section 5 */}
                    <h2 className="text-xl font-semibold text-white mt-6">5. Contact for Support</h2>
                    <p>
                        For any cancellations, refunds, or billing concerns, please write to us at{" "}
                        <a href="mailto:support@nyaymitra.tech" className="underline text-blue-400">
                            support@nyaymitra.tech
                        </a>{" "}
                        with your booking ID and contact details.
                    </p>

                    <p className="text-sm text-gray-500 mt-4">
                        Note: NyayMitra reserves the right to modify this policy at any time without prior notice. Please refer to this page regularly for updates.
                    </p>
                </section>
            </div>
        </main>
    );
}
