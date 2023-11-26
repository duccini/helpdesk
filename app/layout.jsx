/**
 * all components inside the app folder are server components by default!!!
 */

import "./globals.css";
import { Rubik } from "next/font/google";

// Components
import Navbar from "./components/Navbar";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Dojo Helpdesk",
  description: "Duccini Front-end Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
