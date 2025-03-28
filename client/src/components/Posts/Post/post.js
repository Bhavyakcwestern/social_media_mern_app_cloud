// import React from 'react';
// import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
// import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
// import DeleteIcon from '@material-ui/icons/Delete';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import moment from 'moment';
// import { useDispatch, useSelector } from 'react-redux';

// import { deletePost, likePost } from '../../../actions/posts';
// import useStyles from './styles';

// const Post = ({ post, setCurrentId }) => {
//   const dispatch = useDispatch();
//   const classes = useStyles();
//   const user = useSelector((state) => state.auth.authData);

//   const Likes = () => {
//     if (post.likes.length > 0) {
//       return post.likes.find((like) => like === (user?.result?._id))
//         ? (
//           <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
//         ) : (
//           <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
//         );
//     }

//     return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
//   };

//   return (
//     <Card className={classes.card}>
//       <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
//       <div className={classes.overlay}>
//         <Typography variant="h6">{post.name}</Typography>
//         <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
//       </div>

//       {(user?.result?._id === post?.creator) && (
//         <div className={classes.overlay2}>
//           <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
//             <MoreHorizIcon fontSize="default" />
//           </Button>
//         </div>
//       )}

//       <div className={classes.details}>
//         <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
//       </div>

//       <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>

//       <CardContent>
//         <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
//       </CardContent>

//       <CardActions className={classes.cardActions}>
//         <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
//           <Likes />
//         </Button>
//         {(user?.result?._id === post?.creator) && (
//           <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
//             <DeleteIcon fontSize="small" /> Delete
//           </Button>
//         )}
//       </CardActions>
//     </Card>
//   );
// };

// export default Post;

import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import CommentModal from './CommentModal';
import CommentIcon from '@material-ui/icons/Comment';
import { deletePost, likePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.auth.authData);

  const [openComments, setOpenComments] = useState(false);

  // const handleOpenComments = () => setOpen(true);
  // const handleCloseComments = () => setOpen(false);

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>

      {(user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>

      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        <Button size="small" color="primary" onClick={() => setOpenComments(true)}>
          <CommentIcon fontSize="small" /> Comments
        </Button>
        {(user?.result?._id === post?.creator) && (
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>

      <CommentModal open={openComments} handleClose={() => setOpenComments(false)} postId={post._id} />
    </Card>
  );
};

export default Post;
