function SavedAPIKeyItem({ platformName }: any) {
    return <div>{platformName}</div>;
}

export function SavedAPICard({ userAPIPlatform }: any) {
    console.log(userAPIPlatform);
    return (
        <div>
            {userAPIPlatform.map((e: any) => (
                <SavedAPIKeyItem platformName={e.platform} />
            ))}
        </div>
    );
}
