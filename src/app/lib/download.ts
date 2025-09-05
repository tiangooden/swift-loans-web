const downloadFileInBrowser = (name: string, data: any) => {
    const fileURL = window.URL.createObjectURL(new Blob([data]));
    const fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.setAttribute('download', `${name}`);
    document.body.appendChild(fileLink);
    fileLink.click();
    fileLink.remove();
}

export default downloadFileInBrowser;