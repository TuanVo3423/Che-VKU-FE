import {
  ClockCounterClockwise,
  FacebookLogo,
  InstagramLogo,
  ShoppingCart,
  Star,
  TwitterLogo,
} from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProduct from "../components/CardProduct";
import { AccountReducer } from "../redux/Reducers/Account";
import { AccountSelector } from "../redux/Selectors/Account";
import { DetailSelector } from "../redux/Selectors/Detail";
import { ProductSelector } from "../redux/Selectors/Product";
import { SystemReducer } from "../redux/Reducers/System";
import { CommentReducer } from "../redux/Reducers/Comment";
import Comments from "../components/Comments";
import { useRef } from "react";
import { CommentSelector } from "../redux/Selectors/Comment";
import { fetchComments } from "../api";
import { Link } from "react-router-dom";
export default function Detail() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const areaRef = useRef(null);
  const { idDetail } = useSelector(DetailSelector);
  const { socket, comments } = useSelector(CommentSelector);
  const [quantity, setQuantity] = useState(1);
  const { data } = useSelector(ProductSelector);
  const { cartlist, userID, username } = useSelector(AccountSelector);
  const dataDetail = data.filter((item, index) => {
    return item._id === idDetail;
  });

  const handleComment = () => {
    const content = areaRef.current.value;
    if (!content.trim()) {
      dispatch(
        SystemReducer.actions.setMessageAlert({
          kind: true,
          message: "Please enter a valid comment",
          type: "error",
        })
      );
    } else {
      const createdAt = new Date().toISOString();
      socket.emit("createComment", {
        content,
        createdAt,
        userID,
        userName: username,
        idDetail,
      });
      areaRef.current.value = "";
    }
  };

  // realtime joinroom
  useEffect(() => {
    if (socket) {
      console.log("joinRoom", idDetail);
      socket.emit("joinRoom", idDetail);
    }
  }, [socket]);

  console.log("comments", comments);
  useEffect(() => {
    if (socket) {
      socket.on("sendCommentToClient", (msg) => {
        dispatch(CommentReducer.actions.addCommentsState(msg));
      });
      return () => socket.off("sendCommentToClient");
    }
  }, [socket]);

  const handleAddProductToCartList = ({
    userID,
    name,
    price,
    img,
    _id,
    quantity,
  }) => {
    dispatch(
      AccountReducer.actions.requestAddProductToCartList({
        userID,
        name,
        price,
        img,
        _id,
        quantity,
      })
    );
  };
  const handleIncreaseMount = () => {
    setQuantity(quantity + 1);
  };
  useEffect(() => {
    dispatch(
      AccountReducer.actions.requestChangeCartList({
        cartlist,
        userID,
      })
    );
  }, [cartlist]);
  const handleDecreaseMount = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      dispatch(
        SystemReducer.actions.setMessageAlert({
          kind: true,
          message:
            "Cannot be further reduced because the number must be greater than or equal to 1",
          type: "info",
        })
      );
    }
  };
  // const handleRemoveItemCartList = ({ idproduct }) => {
  //   dispatch(AccountReducer.actions.removeProductItemOfCartList({ idproduct }));
  // };
  console.log("loading", loading);
  useEffect(() => {
    setLoading(true);
    fetchComments(idDetail).then((res) => {
      dispatch(CommentReducer.actions.setCommentsState(res.data.comments));
    });
    window.scrollTo(0, 0);
    setLoading(false);
  }, [idDetail]);
  const dataRelated = data.filter((item, index) => {
    return item.category === dataDetail[0].category;
  });
  if (loading) {
    return <h1>LOADING.....</h1>;
  } else {
    return (
      <div>
        <div className="container pt-4 pb-6 grid lg:grid-cols-2 gap-6">
          {/* product image */}
          <div>
            <div>
              <img
                id="main-img"
                src={dataDetail[0].attachment}
                className="w-full"
              />
            </div>
            {/* <div className="grid grid-cols-5 gap-4 mt-4">
              <div>
                <img src="./images/products/product9.jpg" className="single-img w-full cursor-pointer border border-primary" />
              </div>
              <div>
                <img src="./images/products/product1.jpg" className="single-img w-full cursor-pointer border" />
              </div>
              <div>
                <img src="./images/products/product8.jpg" className="single-img w-full cursor-pointer border" />
              </div>
              <div>
                <img src="./images/products/product12.jpg" className="single-img w-full cursor-pointer border" />
              </div>
              <div>
                <img src="./images/products/product11.jpg" className="single-img w-full cursor-pointer border" />
              </div>
            </div> */}
          </div>
          {/* product image end */}
          {/* product content */}
          <div>
            <h2 className="md:text-3xl text-2xl font-medium uppercase mb-2">
              {dataDetail[0].name}
            </h2>
            <div className="flex items-center mb-4">
              <div className="flex gap-1 text-sm text-yellow-400">
                <Star size={16} weight="fill" />
                <Star size={16} weight="fill" />
                <Star size={16} weight="fill" />
                <Star size={16} weight="bold" />
                <Star size={16} weight="bold" />
              </div>
              <div className="text-xs text-gray-500 ml-3">
                ({dataDetail[0].likeCount} Reviews)
              </div>
            </div>
            <div className="space-y-2">
              {/* <p className="text-gray-800 font-semibold space-x-2">
                <span>Availability: </span>
                <span className="text-green-600">In Stock</span>
              </p> */}
              <p className="space-x-2">
                <span className="text-gray-800 font-semibold">Category: </span>
                <span className="text-gray-600">chè truyền thống</span>
              </p>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-primary font-semibold text-xl">
                {dataDetail[0].price} đồng
              </span>
              {/* <span className="text-gray-500 text-base line-through">$500.00</span> */}
            </div>
            <p className="mt-4 text-gray-600">
              {dataDetail[0].shortDescription}
            </p>
            {/* size */}
            {/* size end */}
            {/* color */}
            {/* <div className="mt-4">
              <h3 className="text-base text-gray-800 mb-1">Color</h3>
              <div className="flex items-center gap-2">
                <div className="color-selector">
                  <input
                    type="radio"
                    name="color"
                    className="hidden"
                    id="color-red"
                    defaultChecked
                  />
                  <label
                    htmlFor="color-red"
                    style={{ backgroundColor: "#fc3d57" }}
                    className="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm"
                  ></label>
                </div>
                <div className="color-selector">
                  <input
                    type="radio"
                    name="color"
                    className="hidden"
                    id="color-white"
                  />
                  <label
                    htmlFor="color-white"
                    style={{ backgroundColor: "#fff" }}
                    className="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm"
                  ></label>
                </div>
                <div className="color-selector">
                  <input
                    type="radio"
                    name="color"
                    className="hidden"
                    id="color-black"
                  />
                  <label
                    htmlFor="color-black"
                    style={{ backgroundColor: "#000" }}
                    className="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm"
                  ></label>
                </div>
              </div>
            </div> */}
            {/* quantity */}
            {/* <div className="mt-4">
              <h3 className="text-base text-gray-800 mb-1">Quantity</h3>
              <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                <div
                  onClick={handleDecreaseMount}
                  className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                >
                  -
                </div>
                <div className="h-8 w-10 flex items-center justify-center">
                  {quantity}
                </div>
                <div
                  onClick={handleIncreaseMount}
                  className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                >
                  +
                </div>
              </div>
            </div> */}
            {/* color end */}
            {/* Thêm vào yêu thích button */}
            <div className="flex gap-3 cursor-pointer border-b border-gray-200 pb-5 mt-6">
              <a
                onClick={() =>
                  handleAddProductToCartList({
                    userID,
                    name: dataDetail[0].name,
                    price: dataDetail[0].price,
                    img: dataDetail[0].attachment,
                    _id: dataDetail[0]._id,
                    quantity,
                  })
                }
                className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase 
                      hover:bg-transparent hover:text-primary transition text-sm flex items-center"
              >
                <span className="mr-2">
                  <ShoppingCart size={20} weight="bold" />
                </span>{" "}
                Thêm vào yêu thích
              </a>
              {/* <Link
                to={"/history"}
                className="border flex border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase 
                      hover:bg-transparent hover:text-primary transition text-sm"
              >
                <span className="mr-2">
                  <ClockCounterClockwise size={20} weight="bold" />
                </span>{" "}
                History
              </Link> */}
            </div>
            {/* Thêm vào yêu thích button end */}
            {/* product share icons */}
            <div className="flex space-x-3 mt-4 cursor-pointer">
              <FacebookLogo size={32} weight="fill" className="text-primary" />
              <TwitterLogo size={32} weight="bold" className="text-primary" />
              <InstagramLogo size={32} weight="fill" className="text-primary" />
            </div>
            {/* product share icons end */}
          </div>
          {/* product content end */}
        </div>

        {/* detail review */}
        <div className="container pb-16">
          {/* detail buttons */}
          <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-bold text-2xl">
            Thông tin thêm
          </h3>
          {/* details button end */}
          {/* details content */}
          <div className="w-full pt-6">
            <div className="space-y-3 text-gray-600">
              <p className="border-b border-gray-200 font-roboto text-gray-600 pb-3 font-medium">
                {dataDetail[0].detailDescription.split("$")[0]}
              </p>

              {/* <div className="w-full h-[2px] bg-gray-600 text-gray-600"></div> */}
            </div>
          </div>

          <div className="w-full pt-6">
            <div className="space-y-3 text-gray-600">
              <p className="border-b border-gray-200 font-roboto text-gray-600 pb-3 font-bold text-2xl">
                Comment ({comments.length})
              </p>
            </div>
            {/* list comment */}
            <div>
              <div className="max-h-[700px] overflow-auto">
                {comments.map((comment, index) => {
                  return (
                    <Comments
                      key={index}
                      username={comment.userName}
                      content={comment.content}
                      time={comment.createdAt}
                    />
                  );
                })}
              </div>
              <div>
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Hãy nêu lên đánh giá của bạn
                </h2>
                <form className="mb-6">
                  <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label htmlFor="comment" className="sr-only">
                      Your comment
                    </label>
                    <textarea
                      ref={areaRef}
                      id="comment"
                      rows={6}
                      className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                      placeholder="Write a comment..."
                    />
                  </div>
                  <div
                    onClick={handleComment}
                    className="md:w-[20%] cursor-pointer w-full text-center text-white ml-auto p-5 opacity-[0.9] bg-primary rounded-xl hover:opacity-100 transition-all duration-500"
                  >
                    Bình luận
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* details content end */}
        </div>

        {/* relative product */}

        <div className="container pb-16">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800 uppercase mb-6">
            Sản phẩm liên quan
          </h2>
          {/* product wrapper */}
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6">
            {/* single product */}
            {dataRelated.map((item, index) => {
              if (index < 4 && item._id !== idDetail) {
                return (
                  <CardProduct
                    _id={item?._id}
                    key={index}
                    name={item?.name}
                    price={item?.price}
                    img={item?.attachment}
                    likecount={item?.likeCount}
                    category={item?.category}
                  />
                );
              }
            })}
          </div>
          {/* product wrapper end */}
        </div>
      </div>
    );
  }
}
