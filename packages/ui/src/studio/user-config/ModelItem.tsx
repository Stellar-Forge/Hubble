export function ModelItem({ displayName }: any) {
    return (
        <a href="/user-config" className="m-7">
            <h3 className="text-lg font-bold">{displayName}</h3>
        </a>
    );
}
