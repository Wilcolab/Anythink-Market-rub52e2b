function toCamelCase(str) {
    return str.replace(/[-_\s](.)?/g, (match, chr) => {
        return chr ? chr.toUpperCase() : '';
    });
}