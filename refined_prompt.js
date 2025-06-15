/**
 * Converts a sentence to camelCase format.
 * @param {string} sentence - The input sentence to be converted.
 * @returns {string} The sentence in camelCase format.
 * @throws {Error} If the input is null, empty, or contains too many non-English characters.
 * @throws {Error} If there's an error during string processing.
 * @example
 * camelCase("hello world") // Returns "helloWorld"
 * camelCase("Hello World!") // Returns "helloWorld!"
 * camelCase("my name is John") // Returns "myNameIsJohn"
 * @description
 * This function converts a sentence to camelCase by:
 * 1. Making the first word lowercase
 * 2. Capitalizing the first letter of each subsequent word
 * 3. Removing spaces
 * 4. Preserving punctuation
 * 5. Handling numbers within the text
 */

/**
 * Converts a sentence to dot.case format.
 * @param {string} sentence - The input sentence to be converted.
 * @returns {string} The sentence in dot.case format.
 * @throws {Error} If the input is null, empty, or contains too many non-English characters.
 * @throws {Error} If there's an error during string processing.
 * @example
 * dotCase("hello world") // Returns "hello.world"
 * dotCase("Hello World!") // Returns "hello.world"
 * dotCase("my name is John") // Returns "my.name.is.john"
 * @description
 * This function converts a sentence to dot.case by:
 * 1. Converting all characters to lowercase
 * 2. Removing all special characters and punctuation
 * 3. Replacing spaces with dots
 * 4. Filtering out empty strings
 */
function camelCase(sentence) {
    // Check if input is null or undefined
    if (!sentence) {
        throw new Error("Input cannot be null or empty");
    }

    // Check if string contains too many special characters (possibly not English)
    const specialCharCount = (sentence.match(/[^a-zA-Z0-9\s,.!?]/g) || []).length;
    const totalChar = sentence.replace(/\s/g, '').length;
    if (specialCharCount / totalChar > 0.5) {
        throw new Error("Please try an English sentence");
    }

    try {
        // Split by spaces and filter out empty strings
        return sentence
            .split(/\s+/)
            .filter(word => word.length > 0)
            .map((word, index) => {
                // Separate words and numbers while keeping punctuation
                const parts = word.match(/[a-zA-Z]+|[0-9]+|[^a-zA-Z0-9]+/g) || [];
                
                return parts.map((part, partIndex) => {
                    // If it's punctuation, keep it as is
                    if (!/[a-zA-Z0-9]/.test(part)) {
                        return part;
                    }
                    // First word should be lowercase
                    if (index === 0 && partIndex === 0) {
                        return part.toLowerCase();
                    }
                    // Capitalize first letter for other words
                    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
                }).join('');
            })
            .join('');
    } catch (error) {
        throw new Error("Error processing the input: " + error.message);
    }
}


function dotCase(sentence) {
    if (!sentence) {
        throw new Error("Input cannot be null or empty");
    }

    const specialCharCount = (sentence.match(/[^a-zA-Z0-9\s,.!?]/g) || []).length;
    const totalChar = sentence.replace(/\s/g, '').length;
    if (specialCharCount / totalChar > 0.5) {
        throw new Error("Please try an English sentence");
    }

    try {
        return sentence
            .toLowerCase()
            .split(/\s+/)
            .filter(word => word.length > 0)
            .map(word => word.replace(/[^a-zA-Z0-9]/g, ''))
            .join('.');
    } catch (error) {
        throw new Error("Error processing the input: " + error.message);
    }
}



