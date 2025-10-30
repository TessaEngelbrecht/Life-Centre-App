import sql from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

// Get or create session ID
export const getSessionId = () => {
    let sessionId = sessionStorage.getItem('lifecentre_session_id');
    if (!sessionId) {
        sessionId = uuidv4();
        sessionStorage.setItem('lifecentre_session_id', sessionId);
    }
    return sessionId;
};

// Track user activity
export const trackActivity = async (actionType, details = {}) => {
    try {
        const sessionId = getSessionId();
        await sql`
      INSERT INTO user_activity (
        session_id, 
        action_type, 
        page_viewed, 
        search_query, 
        item_viewed_type, 
        item_viewed_id
      )
      VALUES (
        ${sessionId},
        ${actionType},
        ${details.pageViewed || null},
        ${details.searchQuery || null},
        ${details.itemViewedType || null},
        ${details.itemViewedId || null}
      )
    `;
    } catch (error) {
        console.error('Error tracking activity:', error);
    }
};
