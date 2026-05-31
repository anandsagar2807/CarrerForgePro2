# Chatbot Fixes

This document tracks the fixes applied to the chatbot experience and how to verify them.

## 1) Auto-Redirect / Page Jump to Header ✅

**Problem**
When opening the chatbot page, the view automatically scrolled to the top/header instead of staying on the chat interface.

**Root cause (behavior)**
The existing scroll logic was affecting the entire page (window/document) rather than only the chat messages area.

**Solution**
Updated the scroll behavior in the `useEffect` hook to scroll **only inside the messages container**, not the whole page.

- Scrolling is now scoped to the chat messages container.
- Using `block: 'nearest'` ensures the scroll stays within the container and does not force the page to jump.

## 2) Conversational Responses (No Asterisks / No Markdown Formatting) ✅

**Problem**
Chatbot responses included asterisks (`*`) and other markdown formatting, making replies look robotic instead of conversational.

**Solution**
1. Updated the system prompt to explicitly instruct the model to reply like a human (plain text, no formatting).
2. Added post-processing to strip asterisks and common markdown artifacts from the final response.

**Examples of formatting removed**
- `**bold text**` → `bold text`
- `*italic text*` → `italic text`
- `# Header` → `Header`

**Fallback message updated**
Removed asterisks/markdown from the fallback message shown when the API key is not configured.

---

## Testing

1. **Navigate to Chat Page**
   - Click the floating AI assistant button, **or**
   - Go directly to the `/chat` route.

   **Expected:** The page should remain on the chat interface and not jump/scroll to the top.

2. **Test Conversational Responses**
   - Ask any question.

   **Expected:** Responses should read like a human advisor speaking and should not contain asterisks or markdown formatting.

## Files Modified

- `frontend/src/pages/ChatPage.jsx`

## Result

- ✅ Chat page stays in place when opened
- ✅ Chatbot responses are natural and conversational
- ✅ No asterisks or markdown formatting in responses
- ✅ Improved overall user experience
