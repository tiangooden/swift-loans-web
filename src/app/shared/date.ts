const formatDateString = (date: Date | string | null | undefined) => {
    const locale = 'en-US';
    const config = {
        year: 'numeric' as const,
        month: 'short' as const,
        day: 'numeric' as const,
        hour: '2-digit' as const,
        minute: '2-digit' as const,
        hour12: true
    };
    if (!date) return new Date().toLocaleString(locale, config).toString();
    if (date instanceof Date) return date.toLocaleString(locale, config).toString();
    return new Date(date).toLocaleString(locale, config).toString();
}

export default formatDateString;