import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadAllUsers } from "../Users/userSlice";
import { followUser } from "../Users/userSlice";
import { updateUser } from "../Users/userSlice";
import "./users.css";
export default function Users() {
  const { status, error, users } = useSelector((state) => {
    return state.allUsers;
  });
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => {
    console.log("currentuser" + state.auth.user);
    return state.auth.user;
  });

  useEffect(() => {
    if (status === "idle") {
      console.log("checking status", status);
      dispatch(loadAllUsers());
    }
  }, [dispatch, status]);

  function followHandler(userToBeFollowed, CurrentuserId) {
   
    dispatch(followUser({ userToBeFollowed, CurrentuserId }));
    updateUser();
  }

  return (
    <div>
      {status === "loading" && <h2>loading</h2>}
      {status === "error" && <h2>Error Occured{error}</h2>}

      {status === "fulfilled" &&  
      <>
      <h3>All users</h3>
      {users.map((user) => (
            <div className="users-container">
            <li key={user._id}>
            <div className="profileimg-container"><img className="profile-img" src={user.profilePhotoUrl} alt="not available"/></div>
              <span className="username">{user.username}</span>
              <button className="follow-btn"
                disabled={user._id === currentUser._id}
                onClick={() => {
                  followHandler(user._id, currentUser._id);
                }}
              >
                Follow
              </button>
              {/* <button onClick={}>Unfollow</button> */}
            </li>
            </div>
          ))}
        </>
      }
    </div>
  );
}
