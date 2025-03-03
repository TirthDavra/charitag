import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",

  theme: {
    screens: {
      xs: "450px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
      padding: "22px",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        popins: ["var(--font-popins)"],
      },
      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
      backgroundColor: {
        buttonGradient:
          "linear-gradient(100deg, #1657D9 -32.11%, #FFF 231.75%)",
      },
      colors: {
        // merchant colors
        // bg colors
        consumer_border: "#d9e2f9",
        header_bg: "#f9fafe",
        charity_message: "#EEF1F4",
        merchant_Shipping_bg: "#dfdfdf",
        merchant_header: "rgba(0, 156, 196, 0.07)",
        merchant_border: "rgba(57, 105, 224, 0.25)",
        merchant_placeholder: "#828282",
        merchant_text: "#303136",
        merchant_blue: "#1657d9",
        merchant_gray: "#858585",
        merchant_green: "#3C7533",
        merchant_sidebar_text: "#2F2F35",
        merchant_text_color_blue: "#386ADD",
        merchant_page_heading_bg: "#94BDD4",
        merchat_icon2: "#898989",
        merchant_font_second: "#1B5C71",
        merchant_primary: "#189BC4",
        merchant_patesion_line: "#DBE2D8",
        merchant_main_bg: "#F4F4F4",
        merchant_icon_and_box_bg: "#FFFFFF",
        merchant_notification: "#FD3939",
        merchant_main_font: "#767676",
        logo_color: "#009CC4",
        sidebar_color: "#ECF7FB",
        sidebar_icon_color: "#3969E0",
        sidebar_devider_color: "#BFD3F4",
        gradient_color_1: "rgba(57,105,220,0.5)",
        gradient_color_2: "#3969E0",
        unselected_star_color: "#CDD9F7",
        selected_option_color: "#EAEFFB", // used in Donations Preferences
        homepage_card_text: "#26355E",
        borders_color: "rgba(57, 105, 224, 0.5)",
        links_color: "#3969E0",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      boxShadow: {
        equally_distributed: "0 0 5px 0 gray",
        equally_distributed_bluish: "0 0 24px rgba(57,105,224,0.15)",
        new_blue_shadow:
          "0 4px 20px 1px rgba(57, 105, 224, 0.1), 0 2px 4px -2px rgba(57, 105, 224, 0.5)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }: { addComponents: any }) {
      addComponents({
        // Hide only horizontal scrollbar
        ".no-horizontal-scrollbar::-webkit-scrollbar": {
          height: "12px", // Set a height for the horizontal scrollbar track
          display: "none",
        },
        ".no-horizontal-scrollbar": {
          "overflow-x": "hidden",
        },

        // Hide only vertical scrollbar
        ".no-vertical-scrollbar::-webkit-scrollbar": {
          width: "12px", // Set a width for the vertical scrollbar track
          display: "none",
        },
        ".no-vertical-scrollbar": {
          "overflow-y": "hidden",
        },
        // Hide both scrollbar
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    }),
    require("tailwindcss-animate"),
    require("@savvywombat/tailwindcss-grid-areas"),
    require("tailwind-scrollbar"),
  ],
} satisfies Config;

export default config;
