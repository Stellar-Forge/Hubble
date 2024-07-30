export default function ({params} : any) {

    const workspaceId = params.workspaceId[0]

    console.log(workspaceId)
    return <>
        This is workspace {workspaceId}
    </>
}   




