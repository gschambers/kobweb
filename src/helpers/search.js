function isMatch(query, value) {
    return value.toLowerCase()
        .includes(query.toLowerCase());
}

export function findMatches(query, items, count=5) {
    query = query.trim();

    return items
        .filter((item) => isMatch(query, item.title))
        .slice(0, count);
}
