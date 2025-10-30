import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sql from '../lib/db';
import Header from '../components/Header';
import { trackActivity } from '../utils/analytics';

const Connect = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requestType: '',
    message: '',
    needPrayer: false,
    needHospitalVisit: false,
    hospitalName: '',
    visitDate: '',
    additionalDetails: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const requestTypes = [
    'General Inquiry',
    'Service Information',
    'Group Information',
    'Course Registration',
    'Prayer Request',
    'Hospital Visit',
    'Counselling Request',
    'Emergency Support',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await sql`
        INSERT INTO contact_submissions (
          name,
          email,
          phone,
          request_type,
          message,
          need_prayer,
          need_hospital_visit,
          hospital_name,
          visit_date,
          additional_details
        )
        VALUES (
          ${formData.name},
          ${formData.email},
          ${formData.phone},
          ${formData.requestType},
          ${formData.message},
          ${formData.needPrayer},
          ${formData.needHospitalVisit},
          ${formData.hospitalName || null},
          ${formData.visitDate || null},
          ${formData.additionalDetails || null}
        )
      `;

      trackActivity('form_submission', { pageViewed: 'connect' });
      setSubmitted(true);
      
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again or call our helpline.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-6">
              Your message has been received. A member of our Life Centre team will be in touch with you soon.
            </p>
            <p className="text-gray-500">
              Redirecting you to homepage...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Connect With Us</h1>
          <p className="text-xl text-center text-primary-100">
            We're here to support you. Reach out to us today.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="+27 12 345 6789"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div className="mb-6">
                <label className="label">How Can We Help? *</label>
                <select
                  name="requestType"
                  value={formData.requestType}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Select a request type</option>
                  {requestTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="label">Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="input-field"
                  placeholder="Please share details about how we can support you..."
                ></textarea>
              </div>

              <div className="border-t pt-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Support Needs</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="needPrayer"
                      id="needPrayer"
                      checked={formData.needPrayer}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor="needPrayer" className="ml-3 text-gray-700 font-medium">
                      I would like prayer support
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="needHospitalVisit"
                      id="needHospitalVisit"
                      checked={formData.needHospitalVisit}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor="needHospitalVisit" className="ml-3 text-gray-700 font-medium">
                      I need a hospital visit
                    </label>
                  </div>
                </div>
              </div>

              {formData.needHospitalVisit && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Hospital Visit Details</h4>
                  
                  <div className="mb-4">
                    <label className="label">Hospital Name</label>
                    <input
                      type="text"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="e.g., Pretoria East Hospital"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="label">Preferred Visit Date</label>
                    <input
                      type="date"
                      name="visitDate"
                      value={formData.visitDate}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="label">Additional Details</label>
                    <textarea
                      name="additionalDetails"
                      value={formData.additionalDetails}
                      onChange={handleChange}
                      rows="3"
                      className="input-field"
                      placeholder="Room number, visiting hours, special instructions..."
                    ></textarea>
                  </div>
                </div>
              )}

              <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">📞 Need Immediate Help?</h4>
                <p className="text-gray-700 mb-3">
                  If you're in crisis or need urgent support, please call our helpline:
                </p>
                <a 
                  href="tel:+27123456789" 
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  📞 +27 12 345 6789
                </a>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending...' : 'Submit Request'}
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                We typically respond within 24-48 hours during business days
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
