import Link from 'next/link'
import { Twitter, Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-blue-900 bg-opacity-50 backdrop-blur-lg text-white p-4 mt-auto">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p>&copy; 2025 MintMuse. All rights reserved.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/terms" className="hover:text-blue-300">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-blue-300">Privacy Policy</Link>
          <a href="https://x.com/Sanchit62903760" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
            <Twitter size={20} />
          </a>
          <a href="https://www.linkedin.com/in/sanchit-goyal-6570a1282/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
            <Linkedin size={20} />
          </a>
          <a href="https://github.com/sanchit-4" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}

