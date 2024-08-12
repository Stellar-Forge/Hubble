interface ImageDisplayParams {
    isUrl: boolean;
    base64String?: string;
    response_format?: string;
    url?: string;
}

export function ImageDisplay({
    isUrl,
    base64String,
    response_format,
    url,
}: ImageDisplayParams) {
    console.log(
        `The ImageDisplay Component: ${JSON.stringify({ isUrl, base64String, response_format, url })}`,
    );

    if (base64String === "" && url === "") {
        return <></>;
    }
    return (
        <div>
            {isUrl ? (
                <>
                    <img src={url} alt="Generated Image" /> <br />
                    <a href={url}>{url}</a>
                </>
            ) : (
                <img
                    src={`data:image/${response_format};base64,${base64String}`}
                    alt="Generated Image"
                />
            )}
        </div>
    );
}
