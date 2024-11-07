import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navMenus } from "../utils/data";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";

// 구글 로그인 절차
// 1. 그글 클라이언트 ID 발급
// 2. @react-oauth/google 라이브러리 설치 및 임포트
// 3. GoogleOAuthProvider 컴포넌트 러그인 버튼 감싸기
// 4. clientId props로 구글 클라이언트 ID 전달
// 5. GoogleLogin 컴포넌트로 요청 및 응답 로직 처리
// 6. onSucess, onError 콜백 함수로 로그인 성공 및 실패 처리

const Navibar = ({ menuIdx }) => {
  const dispatch = useDispatch();
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const user = useSelector((state) => state.auth.authData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log(user);

  const handleLoginSucess = useCallback(
    (response) => {
      try {
        const decode = jwtDecode(response.credential);
        dispatch(login({ authData: decode }));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Login Handling Error:", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem("authData"));
    if (storeData) {
      dispatch(login({ authData: storeData }));
      setIsAuthenticated(true);
    }
  }, [dispatch]);

  // (response) => {
  //   console.log("sicess: ", jwtDecode(response.credential));
  // };

  const handleLoginError = (error) => {
    console.log("error: ", error);
  };

  return (
    <nav className="navi bg-[#212121] w-1/5 h-full rounded-sm border border-gray-500 py-10 px-4 flex flex-col justify-between items-center">
      <div className="logo-wrapper flex w-full items-center justify-center gap-8">
        <div className="logo"></div>
        <h2 className="font-semibold text-xl">
          <Link to="/">Rosh</Link>
        </h2>
        <p>{isAuthenticated === false ? "false" : "true"}</p>
      </div>

      <ul className="menus">
        {navMenus.map((menu, idx) => (
          <li
            key={idx}
            className={`rounded-sm mb-1 border border-gray-700 hover:bg-gray-950 transition-all duration-300 ${
              menu.idx === menuIdx ? "bg-gray-950" : ""
            }`}
          >
            <Link to={menu.to} className="flex gap-4 items-center py-2 px-10">
              {menu.icon} {menu.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="w-4/5">
        <GoogleOAuthProvider clientId={googleClientId}>
          <GoogleLogin
            onSuccess={handleLoginSucess}
            onError={handleLoginError}
          />
          <button className="flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-3 px-4 rounded-md w-full">
            <FcGoogle className="w-5 h-5" />
            <span className="text-sm">Google Login</span>
          </button>
        </GoogleOAuthProvider>
      </div>
    </nav>
  );
};

export default Navibar;
