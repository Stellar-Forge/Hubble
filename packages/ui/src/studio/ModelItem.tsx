export function ModelItem({ displayName, description }: any) {
    return <div className="m-7">
        <h3 className="text-lg font-bold">{displayName}</h3>
        <h6>{description}</h6>
    </div>
}