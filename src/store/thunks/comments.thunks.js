import axios from "axios";
import { API } from "../../app/constants";
import { 
    downloadAllCommentsRequested, 
    downloadAllCommentsSuccess, 
    downloadAllCommentsError, 
    addCommentRequested,
    addCommentSuccess,
    addCommentError,
    downloadProductCommentsRequested,
    downloadProductCommentsSuccess,
    downloadProductCommentsError,
    editProductCommentsRequested,
    editProductCommentsSuccess,
    editProductCommentsError
} from "../actions/comments.actions";

const fetchAllComments =
  (uri = `${API}comments`) =>
  (dispatch) => {
    dispatch(downloadAllCommentsRequested());
    axios
      .get(uri)
      .then((comments) => {
        dispatch(downloadAllCommentsSuccess(comments.data));
        return comments;
      })
      .catch(() => {
        dispatch(downloadAllCommentsError());
      });
};

const addComment = (comment) => (dispatch) => {
  dispatch(addCommentRequested());
  const token = localStorage.getItem("jwt");
  axios
    .post(`${API}comments`, comment, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((addedComment) => {
      dispatch(addCommentSuccess(addedComment));
      return addedComment;
    })
    .catch(() => {
      dispatch(addCommentError());
    });
};

const fetchProductComments = (productId) => (dispatch) => {
  dispatch(downloadProductCommentsRequested());
  axios
    .get(`${API}comments/product/${productId}`)
    .then((comments) => {
      dispatch(downloadProductCommentsSuccess(comments.data));
      return comments;
    })
    .catch(() => {
      dispatch(downloadProductCommentsError());
    });
};

const editComment = (id, comment) => (dispatch) => {
  dispatch(editProductCommentsRequested());
  const token = localStorage.getItem("jwt");
  axios
    .put(`${API}comments/${id}`, comment, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((addedComment) => {
      dispatch(editProductCommentsSuccess(addedComment));
      return addedComment;
    })
    .catch(() => {
      dispatch(editProductCommentsError());
    });
};

export { fetchAllComments, addComment, fetchProductComments, editComment };
