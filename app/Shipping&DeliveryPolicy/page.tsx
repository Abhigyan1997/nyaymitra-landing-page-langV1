import { Metadata } from "next";
import Head from "next/head";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";

export const metadata: Metadata = {
    title: "Shipping & Delivery Policy | NyayMitra",
    description: "Learn about our digital service delivery and physical courier policies for legal documents.",
};

export default function ShippingPolicyPage() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <Head>
                <title>Shipping & Delivery Policy | NyayMitra</title>
            </Head>

            <h1 className="text-3xl font-bold text-center mb-6">Shipping & Delivery Policy</h1>

            <p className="text-lg text-center text-gray-600 mb-8">
                At NyayMitra, we provide digital legal services with secure and timely delivery.
            </p>

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Digital Service Delivery</h2>
                    <p className="mb-4">
                        Since NyayMitra primarily offers digital legal services, most deliverables are provided electronically without any physical shipping.
                    </p>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="digital-delivery">
                            <AccordionTrigger className="flex justify-between w-full py-4 font-medium text-left">
                                Delivery Methods & Timelines
                                <span className="ml-2">+</span>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-4">
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>
                                        <strong>Legal Documents (e.g., Contracts, Agreements, Notices):</strong>
                                        <ul className="list-[circle] pl-6 mt-1">
                                            <li>Instant generation for standard templates</li>
                                            <li>Delivery via email, your NyayMitra dashboard, or WhatsApp within minutes of completion</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>Legal Reviews & Consultations:</strong>
                                        <ul className="list-[circle] pl-6 mt-1">
                                            <li>Lawyer-reviewed documents delivered within <strong>24 hours</strong> of submission</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>Remote Notarization:</strong>
                                        <ul className="list-[circle] pl-6 mt-1">
                                            <li>Digitally notarized documents shared via email or dashboard immediately</li>
                                            <li>Physical courier option available (1-4 business days delivery)</li>
                                        </ul>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                        2. Physical Courier (Notarized Documents Only)
                    </h2>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                        If you opt for a printed & notarized copy, we ship via trusted courier partners.
                    </p>

                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-xl font-medium mb-3 text-gray-900 dark:text-white">
                            Delivery Timeline & Tracking
                        </h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li><strong className="text-gray-900 dark:text-white">Processing Time:</strong> 1-2 business days after notarization</li>
                            <li><strong className="text-gray-900 dark:text-white">Shipping Time:</strong> 2-3 business days (varies by location)</li>
                            <li><strong className="text-gray-900 dark:text-white">Tracking:</strong> You'll receive a tracking link via email/SMS once dispatched</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. Need Help?</h2>
                    <p className="mb-2">
                        For any delivery-related concerns, contact us at:
                    </p>
                    <div className="flex items-center gap-2">
                        <span>📧</span>
                        <a
                            href="mailto:support@nyaymitra.tech"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            nyaymitra.ai@gmail.com
                        </a>
                    </div>
                </section>
            </div>

            <div className="mt-12 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                    <em>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    Note: This policy applies only to services provided by NyayMitra and does not cover third-party delays beyond our control.
                </p>
            </div>
        </div>
    );
}