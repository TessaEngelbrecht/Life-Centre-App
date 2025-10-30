import React, { useEffect } from 'react';

const ItemModal = ({ item, type, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!item) return null;

  const getTypeLabel = () => {
    switch(type) {
      case 'service': return 'Service';
      case 'group': return 'Group';
      case 'course': return 'Course';
      default: return 'Item';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              {getTypeLabel()}
            </span>
            {item.category && (
              <span className="inline-block ml-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                {item.category}
              </span>
            )}
          </div>

          {item.specialization && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Specialization</h3>
              <p className="text-gray-700">{item.specialization}</p>
            </div>
          )}

          {item.meeting_schedule && (
            <div className="mb-6 p-4 bg-primary-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">📅 Meeting Schedule</h3>
              <p className="text-gray-700">{item.meeting_schedule}</p>
            </div>
          )}

          {item.location && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">📍 Location</h3>
              <p className="text-gray-700">{item.location}</p>
            </div>
          )}

          {item.duration && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">⏱️ Duration</h3>
              <p className="text-gray-700">{item.duration}</p>
            </div>
          )}

          {item.schedule && (
            <div className="mb-6 p-4 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">📅 Schedule</h3>
              <p className="text-gray-700">{item.schedule}</p>
            </div>
          )}

          {item.facilitator && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Facilitator</h3>
              <p className="text-gray-700">{item.facilitator}</p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{item.description}</p>
          </div>

          {item.tags && item.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="border-t pt-6">
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Interested in this {getTypeLabel().toLowerCase()}?</h3>
              <p className="text-gray-700 mb-4">
                Contact Life Centre to learn more, ask questions, or get started. Our team is here to help you find the right support.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+27123456789" className="btn-primary text-center">
                  📞 Call Helpline
                </a>
                <a href="/connect" className="btn-secondary text-center">
                Send Message
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
