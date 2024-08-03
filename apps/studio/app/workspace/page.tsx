import WorkspaceLanding from "../../components/WorkspaceLanding";
import { checkAuth } from "../../../../packages/actions/checkAuth";

export default async function() {

    await checkAuth() 
  
    return <div>
        <WorkspaceLanding/>
    </div>
}