export default function PrivacyPolicy() {
  return (
    <div className="bg-blue-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-200">Privacy Policy</h1>
      <div className="bg-blue-800 rounded-lg p-6 shadow-lg">
        <p className="mb-4">
          At MintMuse, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our decentralized content creation and monetization platform.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-blue-200">Information We Collect</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Wallet addresses</li>
          <li>Content metadata</li>
          <li>Transaction history related to content creation and purchases</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4 text-blue-200">How We Use Your Information</h2>
        <ul className="list-disc list-inside mb-4">
          <li>To facilitate content creation, distribution, and monetization</li>
          <li>To process transactions and distribute royalties</li>
          <li>To improve our platform and user experience</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4 text-blue-200">Data Security</h2>
        <p className="mb-4">
          We implement industry-standard security measures to protect your information. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-blue-200">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
      </div>
    </div>
  )
}

