import { useAppDispatch, useAppSelector } from "../../redux/reduxStore";
import { userLogout } from "../../redux/slices/loginSlice/userLoginSlice";
import supabase from "../../store";
const Logout = ()=>{

    const handleLogout = async () => {
        const userUid = useAppSelector((state) => state.userLogin.userId);

        const dispatch = useAppDispatch();

        const { error } = await supabase.auth.signOut();
        console.log(error);
        dispatch(userLogout(userUid));
        
      };
return(<button onClick={handleLogout}>로그아웃</button>);
}

export default Logout;