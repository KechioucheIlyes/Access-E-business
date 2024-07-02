import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from "./Providers"
import { ResultContext } from "./Context/resultContext/Context"


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Access OptimScore',
  description: 'Created by Access-Energies',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider>
          <ResultContext>
            {children}
          </ResultContext>
        </AuthProvider>
      </body>
    </html>
  )
}
