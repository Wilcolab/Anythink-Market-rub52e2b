function toKebabCase(sentence) {
    // STEP 1: Input Validation
    if (!sentence || typeof sentence !== 'string') {
        return "Invalid input: Try using English sentence that begains with english word and doesnot contain proper puncuation and wont proceed further.";
    }

    // Check if string starts with a number or punctuation
    if (/^[^a-zA-Z]/.test(sentence)) {
        return "Invalid input: Try using English sentence that begains with english word and doesnot contain proper puncuation and wont proceed further.";
    }

    // Check for non-English characters (excluding allowed punctuation)
    if (/[^\x00-\x7F]/.test(sentence)) {
        return "Invalid input: Try using English sentence that begains with english word and doesnot contain proper puncuation and wont proceed further.";
    }

    // STEP 2: Helper function tosmall()
    function tosmall(c) {
        if (c >= 'A' && c <= 'Z') {
            return c.toLowerCase();
        }
        return c;
    }

    // STEP 3: Apply tosmall() to all characters
    let transformed = '';
    for (let i = 0; i < sentence.length; i++) {
        transformed += tosmall(sentence[i]);
    }

    // STEP 4: Transform the sentence
    let result = '';
    for (let i = 0; i < transformed.length; i++) {
        const current = transformed[i];
        
        // Handle periods and exclamation marks
        if (current === '.' || current === '!') {
            result = result.trim() + '--';
            continue;
        }
        
        // Handle spaces and commas
        if (current === ' ' || current === ',') {
            if (result[result.length - 1] !== '-') {
                result += '-';
            }
            continue;
        }
        
        // Handle semicolons
        if (current === ';') {
            if (result[result.length - 1] !== '-') {
                result += '-';
            }
            continue;
        }
        
        // Add other characters
        result += current;
    }

    // Clean up multiple consecutive hyphens and trim
    return result.replace(/-+/g, '-').replace(/^-|-$/g, '');
}