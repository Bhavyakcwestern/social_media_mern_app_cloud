// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Button,
//     TextField,
//     List,
//     ListItem,
//     ListItemText,
//     Typography,
//     Divider
// } from '@material-ui/core';
// import moment from 'moment';
// import { getComments, addComment } from '../../../actions/posts';

// const CommentModal = ({ open, handleClose, postId }) => {
//     const dispatch = useDispatch();
//     const post = useSelector((state) => state.posts.find((p) => p._id === postId));
//     const [comment, setComment] = useState('');

//     console.log('Selected Post ID:', postId);

//     // console.log('Post:', post);
//     console.log('Comments:', post?.comments);

//     useEffect(() => {
//         if (post?.comments) {
//            console.log('Post:', post);
//            console.log('Comments:', post.comments);
//         } else {
//            console.log('Comments are still loading...');
//         }
//      }, [post]);
     

//     useEffect(() => {
//         if (postId) {
//             dispatch(getComments(postId));
//         }
//     }, [dispatch, postId]);

//     const handleAddComment = () => {
//         if (comment.trim()) {
//             dispatch(addComment(postId, comment)).then(() => {
//                 setComment('');
//             });
//         }
//     };

//     return (
//         <Dialog open={open} onClose={handleClose} fullWidth>
//             <DialogTitle>Comments</DialogTitle>
//             <DialogContent>
//                 {post?.comments?.length > 0 ? (
//                     <List>
//                         {post.comments.map((c, index) => (
//                             <React.Fragment key={c._id}>
//                                 <ListItem alignItems="flex-start">
//                                     <ListItemText
//                                         primary={
//                                             <Typography variant="subtitle1" color="primary">
//                                                 {c.creator?.name || 'Unknown'}
//                                             </Typography>
//                                         }
//                                         secondary={
//                                             <>
//                                                 <Typography variant="body2">{c.content}</Typography>
//                                                 <Typography variant="caption" color="textSecondary">
//                                                     {moment(c.createdAt).fromNow()}
//                                                 </Typography>
//                                             </>
//                                         }
//                                     />
//                                 </ListItem>
//                                 {index !== post.comments.length - 1 && <Divider />}
//                             </React.Fragment>
//                         ))}
//                     </List>
//                 ) : (
//                     <Typography variant="body2" color="textSecondary">
//                         No comments yet. Be the first to comment!
//                     </Typography>
//                 )}
//             </DialogContent>
//             <DialogContent>
//                 <TextField
//                     fullWidth
//                     label="Add a comment"
//                     variant="outlined"
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                 />
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={handleClose} color="secondary">Close</Button>
//                 <Button onClick={handleAddComment} color="primary" disabled={!comment.trim()}>
//                     Send
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default CommentModal;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    Typography,
    Divider
} from '@material-ui/core';
import moment from 'moment';
import { getComments, addComment } from '../../../actions/posts';

const CommentModal = ({ open, handleClose, postId }) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    
    // Find the specific post and its comments
    const post = useSelector((state) => 
        state.posts.find((p) => p._id === postId)
    );

    // Fetch comments when modal opens
    useEffect(() => {
        if (open && postId) {
            dispatch(getComments(postId));
        }
    }, [dispatch, postId, open]);

    const handleAddComment = () => {
        if (comment.trim()) {
            dispatch(addComment(postId, comment)).then(() => {
                setComment('');
            });
        }
    };

    // Determine comments, defaulting to empty array if not present
    const comments = post?.comments || [];

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Comments</DialogTitle>
            <DialogContent>
                {comments.length > 0 ? (
                    <List>
                        {comments.map((c, index) => (
                            <React.Fragment key={c._id || index}>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" color="primary">
                                                {c.creator?.name || 'Unknown User'}
                                            </Typography>
                                        }
                                        secondary={
                                            <>
                                                <Typography variant="body2">{c.content}</Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    {moment(c.createdAt).fromNow()}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                                {index !== comments.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        No comments yet. Be the first to comment!
                    </Typography>
                )}
            </DialogContent>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Add a comment"
                    variant="outlined"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Close</Button>
                <Button 
                    onClick={handleAddComment} 
                    color="primary" 
                    disabled={!comment.trim()}
                >
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CommentModal;
