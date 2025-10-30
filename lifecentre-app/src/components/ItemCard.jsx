

const ItemCard = ({ item, onClick }) => {

  return (
    <div 
      onClick={onClick}
      className="card"
    >
      <div className="flex items-start space-x-3">
        <div className="text-3xl sm:text-4xl flex-shrink-0"></div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
          {item.category && (
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-medium mb-3">
              {item.category}
            </span>
          )}
          {item.meeting_schedule && (
            <p className="text-xs sm:text-sm text-blue-600 font-medium mb-2 line-clamp-1">
              📅 {item.meeting_schedule}
            </p>
          )}
          {item.duration && (
            <p className="text-xs sm:text-sm text-blue-600 font-medium mb-2">
              ⏱️ {item.duration}
            </p>
          )}
          <p className="text-sm sm:text-base text-gray-600 line-clamp-3 mb-3 leading-relaxed">
            {item.description}
          </p>
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {item.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium">
                  +{item.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
