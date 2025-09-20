
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function PrivacyPolicyPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 py-16 lg:py-24">
                <div className="container max-w-4xl">
                    <div className="prose lg:prose-xl mx-auto">
                        <h1 className="font-headline">Privacy Policy</h1>
                        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                        <p>Nairobi Navigator ("us", "we", or "our") operates the Nairobi Navigator website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>

                        <h2>Information Collection and Use</h2>
                        <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
                        <h3>Types of Data Collected</h3>
                        <h4>Personal Data</h4>
                        <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>
                        <ul>
                            <li>Email address</li>
                            <li>First name and last name</li>
                            <li>Usage Data</li>
                        </ul>

                        <h2>Use of Data</h2>
                        <p>Nairobi Navigator uses the collected data for various purposes:</p>
                        <ul>
                            <li>To provide and maintain the Service</li>
                            <li>To notify you about changes to our Service</li>
                            <li>To provide customer care and support</li>
                            <li>To provide analysis or valuable information so that we can improve the Service</li>
                            <li>To monitor the usage of the Service</li>
                            <li>To detect, prevent and address technical issues</li>
                        </ul>

                        <h2>Security of Data</h2>
                        <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

                        <h2>Changes to This Privacy Policy</h2>
                        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                        <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

                        <h2>Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us by visiting our contact page.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
