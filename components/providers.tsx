'use client'

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <TooltipProvider delayDuration={300}>
                {children}
                <Toaster
                    position="top-center"
                    richColors
                    closeButton
                    expand={false}
                    duration={4000}
                />
            </TooltipProvider>
        </ThemeProvider>
    );
}
