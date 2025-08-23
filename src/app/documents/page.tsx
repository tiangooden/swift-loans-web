'use client';

export default function DocumentsPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                    <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <h1 className="text-3xl font-bold text-gray-800">Upload Documents</h1>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Identification Documents</h2>
                    <p className="text-gray-600 mb-4">Please upload clear copies of your identification documents (e.g., Driver's License, Passport, National ID).</p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input type="file" id="identification-upload" className="hidden" multiple />
                        <label htmlFor="identification-upload" className="cursor-pointer text-blue-600 hover:text-blue-800">
                            Click to upload or drag and drop files here
                        </label>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bank Statements</h2>
                    <p className="text-gray-600 mb-4">Please upload your most recent bank statements (e.g., last 3 months).</p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input type="file" id="bank-statements-upload" className="hidden" multiple />
                        <label htmlFor="bank-statements-upload" className="cursor-pointer text-blue-600 hover:text-blue-800">
                            Click to upload or drag and drop files here
                        </label>
                    </div>
                </section>
            </div>
        </div>
    );
}