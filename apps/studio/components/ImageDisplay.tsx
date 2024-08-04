export function ImageDisplay({base64String} : any) {

    return <div>
        <img src={`data:image/jpeg;base64,${base64String}`} alt="Generated Image" />
    </div>
}