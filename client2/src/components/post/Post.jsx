import { MoreVert } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import "./post.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../../config";

function Post({ post }) {
  const { desc, img, createdAt, comments, userId } = post;
  let [like, setLike] = useState(post.likes.length);
  let [alreadyLiked, setAlreadyLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setAlreadyLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${userId}`);
      await setUser(res.data);
      // console.log(res);
    };
    fetchUser();
  }, [userId]);

  const likeHandler = () => {
    try {
      axiosInstance.put("/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (error) {
      console.log(error);
    }

    setLike(!alreadyLiked ? like + 1 : like - 1);
    setAlreadyLiked(!alreadyLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={user.profilePicture || PF + "person/10.jpeg"}
                alt=""
                className="postProfileImage"
              />
            </Link>

            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{desc ? desc : ""}</span>
          <img src={PF + img} alt="" className="postImage" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}like.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <img
              src={`${PF}heart.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">
              {like > 1 ? `${like} likes ` : `${like} like`}
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {comments.length > 1
                ? `${comments.length} comments `
                : `${comments.length} comment`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
