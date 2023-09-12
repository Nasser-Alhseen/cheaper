import React, { useEffect, useRef } from "react";
import "intersection-observer";
import getUsers from "./function/getUsers";

function LoadMoreUsers(props) {
  const targetRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    function handleIntersection(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (props.usersPage.loadMore && !props.usersPage.loadingNow) {
            getUsers(props.userInformation, props.setUsers, props.users, props.toast, props.filter, props.usersPage, props.setUsersPage);
          }
        }
      });
    }

    const observer = new IntersectionObserver(handleIntersection, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [props.usersPage]);

  try {
    return (
      <>
        <div
          ref={targetRef}
          onClick={() => {
            if (props.usersPage.loadMore && !props.usersPage.loadingNow) getUsers(props.userInformation, props.setUsers, props.users, props.toast, props.filter, props.usersPage, props.setUsersPage);
          }}
        >
          {props.usersPage.loadingNow ? "loading..." : props.usersPage.loadMore ? "more users" : "no more users"}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default LoadMoreUsers;
