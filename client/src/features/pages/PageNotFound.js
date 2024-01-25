import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <div className="text-6xl font-extrabold text-red-500 mb-4">404</div>
            <div className="text-xl font-semibold mb-4">Page Not Found</div>
            <p className="text-gray-300 mb-8">Sorry, the page you are looking for doesn't exist.</p>
            <a href="/dash" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-full">
                Back to Home
            </a>
        </div>
    );
}