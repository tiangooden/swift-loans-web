const formatDateString = (date?: Date | number | string | null | undefined) => {
    const locale = 'en-US';
    const config = {
        year: 'numeric' as const,
        month: 'long' as const,
        day: 'numeric' as const
    };
    if (!date) return new Date().toLocaleString(locale, config).toString();
    if (date instanceof Date) return date.toLocaleString(locale, config).toString();
    return new Date(date).toLocaleString(locale, config).toString();
}

export default formatDateString;