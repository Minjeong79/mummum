import { useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import supabase from "../../store";
import {
  userLogin,
  userLogout,
} from "../../redux/slices/loginSlice/userLoginSlice";

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

  async function google() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    console.log(error);
  }

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
    <>
      {userUid}
      <div>
        <img src={imageUrlList} alt="강아지 캐릭터" />
      </div>
      {userUid ? (
        <div>
          <button onClick={dogSelectHandle}>강아지 선택</button>
          <button onClick={kakakoSignOut}>로그아웃</button>
        </div>
      ) : (
        <div>
          <button onClick={signInWithKakao}>카카오 로그인</button>
          <button onClick={google}>구글 로그인</button>
        </div>
      )}
    </>
  );
};

export default LoginPage;
