import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import { getUnseenNotififcationCount } from "../services/notification";
import tweetIcon from "../icons/feather.svg";
import Editor from "./Editor";

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [show, setShow] = useState(true);
  const [compose, setCompose] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAnonymous) return;

    getUnseenNotififcationCount(user._id)
      .then((res) => setNotificationCount(res.count))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setShow(
      !["/home", "/messages", "/notifications", "/explore"].includes(pathname)
    );
  }, [pathname]);

  return user ? (
    <header
      role="banner"
      className={`sidebar ps-sm-0 ps-lg-0 d-flex justify-content-end position-relative d-sm-block${
        user.isAnonymous ? " d-none" : show ? " d-none" : ""
      }`}
    >
      <div className="position-relative">
        <Editor show={compose} setShow={setCompose} />

        <div className="position-fixed h-100 h-sm-auto w-inherit bottom-sm-0 bg-primary">
          <div className="d-flex flex-sm-column px-xl-3 px-1 justify-content-between h-auto">
            <div className="d-flex flex-sm-column flex-grow-1 align-items-center py-sm-0 py-1">
              <div className="w-100 d-none d-sm-block">
                <div className="px-3 mx-auto mx-xl-0 py-2 nav rounded-pill py-2 align-items-center p-3 text-app">
                  <div className="m-0 nav-icon" data-title="Twitter">
                    <i className="bi bi-twitter"></i>
                  </div>
                </div>
              </div>
              {!user.isAnonymous && (
                <div className="w-100">
                  <div
                    className="nav hover border-0 rounded-pill mx-auto mx-xl-0 py-sm-2 py-0 align-items-center px-2 px-sm-3 fs-3 pe-xl-4 text-primary btn"
                    onClick={() => navigate("/home")}
                  >
                    <div className="nav-icon">
                      <i
                        className={`bi bi-house-door${
                          pathname === "/home" ? "-fill" : ""
                        }`}
                      ></i>
                    </div>
                    <span
                      className={`nav-title d-xl-block d-none${
                        pathname === "/home" ? " fw-bold" : ""
                      }`}
                    >
                      Home
                    </span>
                  </div>
                </div>
              )}
              <div className="w-100">
                <div
                  className="nav hover border-0 rounded-pill mx-auto mx-xl-0 py-sm-2 py-0 align-items-center px-2 px-sm-3 fs-3 pe-xl-4 text-primary btn"
                  onClick={() => navigate("/explore")}
                >
                  <div className="nav-icon">
                    <i
                      className={`bi bi-search${
                        pathname === "/explore" ? " fw-bold" : ""
                      }`}
                    ></i>
                  </div>
                  <span
                    className={`nav-title d-xl-block d-none${
                      pathname === "/explore" ? " fw-bold" : ""
                    }`}
                  >
                    Explore
                  </span>
                </div>
              </div>
              {user.isAnonymous && (
                <div className="w-100">
                  <div
                    className="nav hover border-0 rounded-pill mx-auto mx-xl-0 py-sm-2 py-0 align-items-center px-2 px-sm-3 fs-3 pe-xl-4 text-primary btn"
                    onClick={() => navigate("/settings/display")}
                    title="Display"
                  >
                    <div className="nav-icon">
                      <i className="bi bi-brush"></i>
                    </div>
                    <span
                      className={`nav-title d-xl-block d-none${
                        pathname === "/settings/display" ? " fw-bold" : ""
                      }`}
                    >
                      Display
                    </span>
                  </div>
                </div>
              )}
              {!user.isAnonymous && (
                <div className="w-100 d-sm-none d-block">
                  <div
                    onClick={() => {
                      document.body.style.overflowY = "hidden";
                      setCompose(true);
                    }}
                    className="nav hover border-0 rounded-pill mx-auto mx-xl-0 py-sm-2 py-0 align-items-center px-sm-3 fs-3 pe-xl-4 px-2 text-primary bg-app btn"
                  >
                    <div className="nav-icon">
                      <i className="bi bi-plus-circle"></i>
                    </div>
                  </div>
                </div>
              )}
              {!user.isAnonymous && (
                <div className="w-100">
                  <div
                    onClick={() => {
                      setNotificationCount(0);
                      navigate("/notifications");
                    }}
                    className="nav hover border-0 rounded-pill mx-auto mx-xl-0 py-sm-2 py-0 align-items-center px-sm-3 fs-3 pe-xl-4 px-2 text-primary btn"
                  >
                    <div className="nav-icon">
                      <i
                        className={`bi bi-bell${
                          pathname === "/notifications" ? "-fill" : ""
                        }`}
                      ></i>
                      {notificationCount > 0 && (
                        <span className="unread-tag position-absolute px-2 fs-7 py-1 start-50 badge rounded-pill bg-app">
                          {notificationCount > 9 ? "9+" : notificationCount}
                          <span className="visually-hidden">
                            unread messages
                          </span>
                        </span>
                      )}
                    </div>
                    <span
                      className={`nav-title d-xl-block d-none${
                        pathname === "/notifications" ? " fw-bold" : ""
                      }`}
                    >
                      Notifications
                    </span>
                  </div>
                </div>
              )}
              {!user.isAnonymous && (
                <div className="w-100">
                  <div
                    onClick={() => navigate("/messages")}
                    className="nav hover border-0 rounded-pill mx-auto mx-xl-0 py-sm-2 py-0 align-items-center px-sm-3 fs-3 pe-xl-4 px-2 text-primary btn"
                  >
                    <div className="nav-icon">
                      <i
                        className={`bi bi-envelope${
                          pathname.startsWith("/messages") ? "-fill" : ""
                        }`}
                      ></i>
                    </div>
                    <span
                      className={`nav-title d-xl-block d-none${
                        pathname.startsWith("/messages") ? " fw-bold" : ""
                      }`}
                    >
                      Messages
                    </span>
                  </div>
                </div>
              )}
              {!user.isAnonymous && (
                <div className="w-100 d-none d-sm-block">
                  <div
                    onClick={() => navigate("/bookmarks")}
                    className="nav hover border-0 rounded-pill mx-auto mx-xl-0 py-sm-2 align-items-center px-sm-3 fs-3 pe-xl-4 text-primary btn"
                  >
                    <div className="nav-icon">
                      <i
                        className={`bi bi-bookmark${
                          pathname === "/bookmarks" ? "-fill" : ""
                        }`}
                      ></i>
                    </div>
                    <span
                      className={`nav-title d-xl-block d-none${
                        pathname === "/bookmarks" ? " fw-bold" : ""
                      }`}
                    >
                      Bookmarks
                    </span>
                  </div>
                </div>
              )}
              {!user.isAnonymous && (
                <div className="w-100 d-none d-sm-block">
                  <div
                    onClick={() => navigate("/" + user.account_name)}
                    className="nav hover border-0 rounded-pill mx-auto mx-xl-0 py-sm-2 align-items-center px-sm-3 fs-3 pe-xl-4 text-primary btn"
                  >
                    <div className="nav-icon">
                      <i
                        className={`bi bi-person${
                          pathname.startsWith("/" + user.account_name) &&
                          !pathname.startsWith(
                            "/" + user.account_name + "/status/"
                          )
                            ? "-fill"
                            : ""
                        }`}
                      ></i>
                    </div>
                    <span
                      className={`nav-title d-xl-block d-none${
                        pathname.startsWith("/" + user.account_name) &&
                        !pathname.startsWith(
                          "/" + user.account_name + "/status/"
                        )
                          ? " fw-bold"
                          : ""
                      }`}
                    >
                      Profile
                    </span>
                  </div>
                </div>
              )}
              {!user.isAnonymous && (
                <div className="w-100 d-none d-sm-block">
                  <div
                    onClick={() => navigate("/settings")}
                    className="nav hover border-0 rounded-pill mx-auto mx-xl-0 py-sm-2 align-items-center px-sm-3 fs-3 pe-xl-4 text-primary btn"
                  >
                    <div className="nav-icon">
                      <i
                        className={`bi bi-gear${
                          pathname.startsWith("/settings") ? "-fill" : ""
                        }`}
                      ></i>
                    </div>
                    <span
                      className={`nav-title d-xl-block d-none${
                        pathname.startsWith("/settings") ? " fw-bold" : ""
                      }`}
                    >
                      Settings
                    </span>
                  </div>
                </div>
              )}
              {!user.isAnonymous && (
                <div className="w-100 mt-2 d-none d-sm-block">
                  <div
                    to="/"
                    onClick={() => {
                      document.body.style.overflowY = "hidden";
                      setCompose(true);
                    }}
                    data-title="Tweet"
                    className="nav filter compose-btn rounded-pill mx-auto bg-app py-2 text-white btn"
                  >
                    <div className="nav-icon d-xl-none mx-auto">
                      {/* <i className="bi bi-plus-circle"></i> */}
                      <img
                        style={{ height: "27px" }}
                        src={tweetIcon}
                        alt="tweet"
                        className="mb-2"
                      />
                    </div>
                    <span className="nav-title fw-bold d-xl-block mx-auto d-none">
                      Tweet
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div
              onClick={() => navigate("/logout")}
              className="hover rounded-pill flex-shrink-0 btn mb-3 mt-5 px-2 py-1 d-none d-sm-block"
            >
              {user.isAnonymous ? (
                <div className="d-flex align-items-center justify-content-center">
                  <div className="flex-shrink-0 me-xl-3 ms-xl-2">
                    <i className="bi bi-box-arrow-right fs-3"></i>
                  </div>
                  <div className="d-xl-flex d-none align-items-center justify-content-between details">
                    <div className="fw-bold oneline">Logout</div>
                    <div className="py-1 ps-2">
                      <i className="bi bi-three-dots fs-3"></i>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <div className="profile-image mx-auto flex-shrink-0 me-xl-2">
                    <img
                      src={user.profile_image_url}
                      className="w-100 rounded-circle square"
                      alt="profile"
                    />
                  </div>
                  <div className="d-xl-flex d-none align-items-center justify-content-between details">
                    <div className="text-start overflow-hidden">
                      <div className="fw-bold oneline">{user.name}</div>
                      <div className="text-muted oneline">
                        @{user.account_name}
                      </div>
                    </div>
                    <div className="py-1 ps-2">
                      <i className="bi bi-three-dots fs-3"></i>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  ) : null;
}
