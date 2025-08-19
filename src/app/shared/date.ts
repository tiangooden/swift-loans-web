const formatDateString = (date: string) =>
    !date ? new Date().toString() : new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).toString();

export default formatDateString;