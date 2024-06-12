import { useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import supabase from "../../store";
import {
  userLogin,
  userLogout,
} from "../../redux/slices/loginSlice/userLoginSlice";
import "../../style/style.css";

const LoginPage = () => {
  const [imageUrlList, setImageUrlList] = useState<string>("");
  const [userUid, setUserUid] = useState<string>("");

  const dispatch = useAppDispatch();
  const nav = useNavigate();

  async function signInWithKakao() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `https://zbjwkpzadmxggyahexgv.supabase.co/auth/v1/callback`,
        },
      });
      console.log(data);
      console.log(error);
    } catch (error) {
      console.error("카카오 로그인 중 오류 발생:", error);
    }
  }

  // async function google() {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       queryParams: {
  //         access_type: "offline",
  //         prompt: "consent",
  //       },
  //     },
  //   });
  //   console.log(error);
  // }

  const dogSelectHandle = () => {
    nav(`/dogSelect`);
  };

  const userUidFunc = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUserUid(user.id);
      dispatch(userLogin(user.id));
      console.log("사용자 정보:", user.id);
    }
  };

  const dogSelectFunc = async () => {
    const { data } = supabase.storage
      .from("img/dogSelect")
      .getPublicUrl("dog1.png");

    setImageUrlList(data.publicUrl);
  };

  const kakakoSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    dispatch(userLogout(userUid));
  };

  useEffect(() => {
    userUidFunc();
    dogSelectFunc();
  }, []);
  // useEffect(() => {
  //   kakakoSignOut();
  // }, []);
  return (
    <section className="bg-[#E9CEB9]">
      <section className="max-w-lg mx-auto bg-[#FFEAD9] h-screen">
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="flex flex-col items-center gap-y-20">
            <h3 className="text-3xl text-center py-3">
              멈멈이랑 놀아줘!
              <br />
              멈멈이를 기록 해줘!
            </h3>
            {userUid}
            <div className="max-w-40 mx-auto  ">
              <img src={imageUrlList} alt="강아지 캐릭터" />
            </div>
            {userUid ? (
              <div>
                <button
                  className="sm:bg-blue-300 md:w-32"
                  onClick={dogSelectHandle}
                >
                  강아지 선택
                </button>
                <button onClick={kakakoSignOut}>로그아웃</button>
              </div>
            ) : (
              <div className="w-72 mx-auto">
                <button
                  className="bg-white w-72 h-10 rounded-lg"
                  onClick={signInWithKakao}
                >
                  카카오 로그인
                </button>
                {/* <button onClick={google}>구글 로그인</button> */}
              </div>
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default LoginPage;
