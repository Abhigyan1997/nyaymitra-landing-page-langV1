// utils/loadRazorpay.ts
export const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
        if (typeof window === "undefined") return reject("Window is undefined");

        if (window.Razorpay) {
            resolve(true); // Already loaded
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            reject("Razorpay SDK failed to load");
        };
        document.body.appendChild(script);
    });
};
