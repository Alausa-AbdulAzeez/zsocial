import "./online.css";

function Online({ users }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <>
      {users.map((user) => {
        const { profilePicture, username, id } = user;
        return (
          <li className="rightbarFriend" key={id}>
            <div className="rightbarProfileImageContainer">
              <img
                src={PF + profilePicture}
                alt=""
                className="rightbarProfileImage"
              />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{username}</span>
          </li>
        );
      })}
    </>
  );
}

export default Online;
