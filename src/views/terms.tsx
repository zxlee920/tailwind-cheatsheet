import React from 'react';

const Terms = () => {
    return (
        <div className="container mx-auto px-6 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Terms of Use</h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">1. Acceptance of Terms</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        By accessing and using the Tailwind Cheat Sheets website, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">2. Use License</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Permission is granted to temporarily download one copy of the materials on Tailwind Cheat Sheets for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 ml-4">
                        <li>modify or copy the materials</li>
                        <li>use the materials for any commercial purpose or for any public display</li>
                        <li>attempt to reverse engineer any software contained on the website</li>
                        <li>remove any copyright or other proprietary notations from the materials</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">3. Disclaimer</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The materials on Tailwind Cheat Sheets are provided on an 'as is' basis. Tailwind Cheat Sheets makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">4. Limitations</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        In no event shall Tailwind Cheat Sheets or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Tailwind Cheat Sheets, even if Tailwind Cheat Sheets or an authorized representative has been notified orally or in writing of the possibility of such damage.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">5. Accuracy of Materials</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The materials appearing on Tailwind Cheat Sheets could include technical, typographical, or photographic errors. Tailwind Cheat Sheets does not warrant that any of the materials on its website are accurate, complete, or current. Tailwind Cheat Sheets may make changes to the materials contained on its website at any time without notice.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">6. Links</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Tailwind Cheat Sheets has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Tailwind Cheat Sheets of the site. Use of any such linked website is at the user's own risk.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">7. Modifications</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Tailwind Cheat Sheets may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">8. Governing Law</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">9. Contact Information</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        If you have any questions about these Terms of Use, please contact us through our website.
                    </p>
                </section>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Terms;