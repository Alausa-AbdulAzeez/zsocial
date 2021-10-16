import "./closeFriends.css";

function CloseFriends({ users }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <>
      {users.map((user) => {
        const { profilePicture, username, id } = user;
        return (
          <li className="sidebarFriend" key={id}>
            <img src={PF + profilePicture} alt="" className="sidebarFriendImage" />
            <span className="sidebarFriendName">{username}</span>
          </li>
        );
      })}
    </>
  );
}

export default CloseFriends;
