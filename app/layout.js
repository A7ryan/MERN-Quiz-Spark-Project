// app/layout.js
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { GlobalContextProvider } from './context/ContextApi';
import ClientLayout from './components/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Quiz Spark',
  description: 'Unlock your potential with personalized quizzes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.variable}`}>
        <GlobalContextProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
          <Toaster />
        </GlobalContextProvider>
      </body>
    </html>
  );
}