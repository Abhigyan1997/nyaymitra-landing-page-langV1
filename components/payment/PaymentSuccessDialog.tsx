import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CheckCircle2, Download, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a utility function for class merging
import PaymentReceiptPDF from './PaymentReceiptPDF';

interface PaymentData {
    bookingDetails: {
        clientName: string;
        id: string;
        serviceType?: string;
        date?: Date;
    };
    paymentDetails: {
        amount: number;
        id: string;
        date: string | Date;
        method?: string;
    };
}

interface PaymentSuccessDialogProps {
    isOpen: boolean;
    onClose: () => void;
    paymentData: PaymentData;
}

const PaymentSuccessDialog = ({ isOpen, onClose, paymentData }: PaymentSuccessDialogProps) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 text-left align-middle shadow-xl transition-all border border-gray-200 dark:border-gray-700">
                                <div className="absolute top-4 right-4">
                                    <button
                                        onClick={onClose}
                                        className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        aria-label="Close"
                                    >
                                        <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    </button>
                                </div>

                                <div className="p-6">
                                    <div className="flex flex-col items-center text-center mb-6">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                                        >
                                            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50 mb-4">
                                                <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                                            </div>
                                        </motion.div>
                                        <Dialog.Title className="text-2xl font-bold leading-6 text-gray-900 dark:text-white">
                                            Payment Successful!
                                        </Dialog.Title>
                                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                                            Thank you for your payment. Your booking is confirmed.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                                                Booking Details
                                            </h4>
                                            <div className="space-y-2 text-sm">
                                                <DetailItem label="Service" value="Priority Booking" />
                                                <DetailItem label="Client" value={paymentData.bookingDetails.clientName} />
                                                <DetailItem label="Booking ID" value={paymentData.bookingDetails.id} />
                                                {paymentData.bookingDetails.date && (
                                                    <DetailItem
                                                        label="Date"
                                                        value={new Date(paymentData.bookingDetails.date).toLocaleString()}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                            <h4 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                                                Payment Details
                                            </h4>
                                            <div className="space-y-2 text-sm">
                                                <DetailItem
                                                    label="Amount"
                                                    value={`₹${paymentData.paymentDetails.amount.toLocaleString()}`}
                                                />
                                                <DetailItem label="Payment ID" value={paymentData.paymentDetails.id} />
                                                <DetailItem
                                                    label="Date"
                                                    value={new Date(paymentData.paymentDetails.date).toLocaleString()}
                                                />
                                                {paymentData.paymentDetails.method && (
                                                    <DetailItem label="Method" value={paymentData.paymentDetails.method} />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-end gap-3">
                                        <PDFDownloadLink
                                            document={<PaymentReceiptPDF data={paymentData} />}
                                            fileName={`payment-receipt-${paymentData.paymentDetails.id}.pdf`}
                                            className={cn(
                                                'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
                                                'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                                                'dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-900'
                                            )}
                                        >
                                            {({ loading }) => (
                                                <>
                                                    {loading ? (
                                                        'Generating...'
                                                    ) : (
                                                        <>
                                                            <Download className="mr-2 h-4 w-4" />
                                                            Download Receipt
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </PDFDownloadLink>

                                        <button
                                            onClick={onClose}
                                            className={cn(
                                                'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
                                                'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
                                                'dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-900'
                                            )}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

const DetailItem = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between">
        <span className="text-gray-500 dark:text-gray-400">{label}</span>
        <span className="font-medium text-gray-900 dark:text-white">{value}</span>
    </div>
);

export default PaymentSuccessDialog;