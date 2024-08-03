import { checkAuth } from "../../../../packages/actions/checkAuth";

export default async function Home(){

  const session = await checkAuth()
  
  console.log(session?.user)
  return (
   <div>
    LANDING
   </div>
  );
}
