export const searchItems = (items, query, fields = ['name', 'description', 'tags']) => {
    if (!query || query.trim() === '') return items;

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);

    return items.filter(item => {
        return searchTerms.every(term => {
            return fields.some(field => {
                if (field === 'tags' && Array.isArray(item.tags)) {
                    return item.tags.some(tag => tag.toLowerCase().includes(term));
                }
                const value = item[field];
                return value && value.toString().toLowerCase().includes(term);
            });
        });
    });
};
