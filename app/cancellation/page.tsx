// app/cancellation/page.tsx
import React from "react";

export default function CancellationRefundPolicy() {
    return (
        <main className="bg-gradient-to-br from-gray-900 via-black to-gray-950 min-h-screen text-white px-6 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-red-400 drop-shadow">
                    Cancellation & Refund Policy
                </h1>
                <p className="mb-8 text-gray-300 text-lg text-center">
                    Updated as of June 2025
                </p>

                <section className="space-y-6 text-gray-200 leading-relaxed">
                    <p>
                        At <span className="text-red-300 font-semibold">NyayMitra</span>, we understand that plans may change. This policy outlines the terms for cancellations and refunds related to legal consultation bookings made through our platform.
                    </p>

                    <h2 className="text-xl font-semibold text-white mt-6">1. Booking Cancellation</h2>
                    <ul className="list-disc list-inside space-y-3">
                        <li>Users can cancel a booked consultation up to <strong>12 hours before</strong> the scheduled time to receive a full refund.</li>
                        <li>Cancellations made <strong>within 12 hours</strong> of the consultation may not be eligible for a refund.</li>
                        <li>Lawyers may also cancel in case of emergency, and users will receive a full refund in such cases.</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-white mt-6">2. Refund Eligibility</h2>
                    <ul className="list-disc list-inside space-y-3">
                        <li>Refunds are processed only for eligible cancellations or booking failures due to technical errors.</li>
                        <li>Refunds are not applicable for completed or missed consultations unless a valid complaint is filed and verified.</li>
                        <li>Any refund request must be raised within <strong>48 hours</strong> of the scheduled consultation.</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-white mt-6">3. Refund Process</h2>
                    <ul className="list-disc list-inside space-y-3">
                        <li>Approved refunds will be processed back to the original payment method.</li>
                        <li>Refunds typically take <strong>5–7 business days</strong> to reflect, depending on your bank or payment provider.</li>
                        <li>You will be notified via email once the refund is initiated.</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-white mt-6">4. Contact for Support</h2>
                    <p className="text-gray-300">
                        For cancellations, refunds, or disputes, please write to us at <span className="underline">support@nyaymitra.in</span> with your booking ID and contact number.
                    </p>

                    <p className="text-gray-400 mt-4">
                        NyayMitra reserves the right to update this policy without prior notice. Please check this page regularly for changes.
                    </p>
                </section>
            </div>
        </main>
    );
}
