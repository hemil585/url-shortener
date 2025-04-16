export const formatUrl = (url: string) => {
    const formattedUrl =
        url.startsWith("http://") ||
            url.startsWith("https://")
            ? url
            : `https://${url}`;

    const encodedUrl = encodeURIComponent(formattedUrl);
    return encodedUrl
}