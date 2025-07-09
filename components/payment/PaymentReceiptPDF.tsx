import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        backgroundColor: '#FFFFFF'
    },
    container: {
        flex: 1,
        border: '1px solid #E5E7EB',
        borderRadius: 8,
        padding: 30,
        position: 'relative',
        overflow: 'hidden'
    },
    watermark: {
        position: 'absolute',
        opacity: 0.05,
        fontSize: 120,
        color: '#3B82F6',
        transform: 'rotate(-30deg)',
        left: 100,
        top: 300
    },
    header: {
        marginBottom: 30,
        borderBottom: '1px solid #E5E7EB',
        paddingBottom: 20
    },
    logo: {
        width: 120,
        marginBottom: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 5
    },
    subtitle: {
        fontSize: 12,
        color: '#6B7280'
    },
    receiptTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 5
    },
    receiptNumber: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 20
    },
    section: {
        marginBottom: 25
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 10,
        borderBottom: '1px solid #E5E7EB',
        paddingBottom: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },
    label: {
        fontSize: 12,
        color: '#6B7280',
        width: '40%'
    },
    value: {
        fontSize: 12,
        color: '#111827',
        fontWeight: 'bold',
        width: '60%',
        textAlign: 'right'
    },
    amountRow: {
        marginTop: 15,
        paddingTop: 15,
        borderTop: '1px solid #E5E7EB'
    },
    amountLabel: {
        fontSize: 14,
        color: '#111827',
        fontWeight: 'bold'
    },
    amountValue: {
        fontSize: 16,
        color: '#10B981',
        fontWeight: 'bold'
    },
    footer: {
        marginTop: 40,
        paddingTop: 20,
        borderTop: '1px solid #E5E7EB',
        fontSize: 10,
        color: '#6B7280',
        textAlign: 'center'
    },
    contactInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        gap: 15
    },
    stamp: {
        position: 'absolute',
        right: 40,
        bottom: 60,
        width: 80,
        height: 80,
        opacity: 0.7,
        border: '2px solid #3B82F6',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    stampText: {
        fontSize: 10,
        color: '#3B82F6',
        fontWeight: 'bold',
        transform: 'rotate(15deg)'
    }
});

// Replace this with your actual logo base64 string or import
const logoBase64 = 'data:image/png;base64,...';

const PaymentReceiptPDF = ({ data }: { data: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.container}>
                {/* Watermark */}
                <Text style={styles.watermark}>PAID</Text>

                {/* Header */}
                <View style={styles.header}>
                    {/* Replace with your logo */}
                    <Image src={logoBase64} style={styles.logo} />
                    <Text style={styles.title}>Nyay Mitra Legal Services</Text>
                    <Text style={styles.subtitle}>Official Payment Receipt</Text>
                </View>

                {/* Receipt Title */}
                <View>
                    <Text style={styles.receiptTitle}>Payment Receipt</Text>
                    <Text style={styles.receiptNumber}>Receipt #: {data.paymentDetails.id}</Text>
                </View>

                {/* Booking Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Booking Details</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Booking ID:</Text>
                        <Text style={styles.value}>{data.bookingDetails.id}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Service Type:</Text>
                        <Text style={styles.value}>{data.bookingDetails.serviceType || 'Priority Booking'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Client Name:</Text>
                        <Text style={styles.value}>{data.bookingDetails.clientName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Booking Date:</Text>
                        <Text style={styles.value}>
                            {new Date(data.bookingDetails.date || data.paymentDetails.date).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </Text>
                    </View>
                </View>

                {/* Payment Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Details</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Payment ID:</Text>
                        <Text style={styles.value}>{data.paymentDetails.id}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Order ID:</Text>
                        <Text style={styles.value}>{data.paymentDetails.orderId || 'N/A'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Payment Method:</Text>
                        <Text style={styles.value}>{data.paymentDetails.method || 'Online Payment'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Payment Date:</Text>
                        <Text style={styles.value}>
                            {new Date(data.paymentDetails.date).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </Text>
                    </View>
                    <View style={[styles.row, styles.amountRow]}>
                        <Text style={styles.amountLabel}>Total Amount Paid:</Text>
                        <Text style={styles.amountValue}>₹{data.paymentDetails.amount.toLocaleString('en-IN')}</Text>
                    </View>
                </View>

                {/* Stamp */}
                <View style={styles.stamp}>
                    <Text style={styles.stampText}>PAID</Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>Thank you for choosing Nyay Mitra Legal Services</Text>
                    <Text>This is an electronically generated receipt and does not require a physical signature</Text>
                    <View style={styles.contactInfo}>
                        <Text>nyaymitra.ai@gmail.com</Text>
                        <Text>|</Text>
                        <Text>+91 7970596183</Text>
                        <Text>|</Text>
                        <Text>www.nyaymitra.tech/contact</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

export default PaymentReceiptPDF;