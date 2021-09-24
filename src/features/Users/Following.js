import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadFollowers } from "../Auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
// import { unfollowUser } from "./userSlice";
// import { updateUser } from "./userSlice";
export default function Following() {
  const [status, setStatus] = useState("idle");
  const currentUser = useSelector((state) => {
    return state.auth.user;
  });

  const { following } = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        setStatus("loading");
        const result = await dispatch(loadFollowers(currentUser._id));
        unwrapResult(result);
        setStatus("success");
      } catch (error) {
        console.log(error);
        setStatus("idle");
      }
    })();
  }, [dispatch, currentUser._id]);

  // function unfollowHandler(userToBeUnfollowed, CurrentuserId) {
  //   dispatch(unfollowUser({ userToBeUnfollowed, CurrentuserId }));
  //   updateUser();
  // }

  return (
    <div>
      {status === "loading" && <h4>Loading...</h4>}
      {status === "success" && (
        <>
          {following.map((user) => (
            <div className="users-container">
              <li key={user._id}>
                <div className="profileimg-container">
                  <img
                    className="profile-img"
                    src={user.profilePhotoUrl}
                    alt="not available"
                  />
                </div>
                <span className="username">{user.username}</span>
                {/* <button
                  onClick={() => unfollowHandler(user._id, currentUser._id)}
                >
                  Unfollow
                </button> */}
              </li>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
